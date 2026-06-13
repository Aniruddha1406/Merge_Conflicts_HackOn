import os
import json
import re
from typing import List, Dict, Any, Optional

# Lazy load products to avoid circular dependency
def get_products_data() -> List[Dict]:
    from .product_service import load_products
    return load_products()

# Check if chromadb is available, otherwise use fallback search
try:
    import chromadb
    from chromadb.utils import embedding_functions
    CHROMA_AVAILABLE = True
except ImportError:
    CHROMA_AVAILABLE = False

_client: Optional[Any] = None
_collection: Optional[Any] = None

def get_rag_collection() -> Any:
    global _client, _collection
    if not CHROMA_AVAILABLE:
        return None
        
    if _collection is None:
        try:
            db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "chroma_db")
            _client = chromadb.PersistentClient(path=db_path)
            
            emb_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
                model_name="all-MiniLM-L6-v2"
            )
            
            _collection = _client.get_or_create_collection(
                name="quickcommerce_products",
                embedding_function=emb_fn
            )
            
            if _collection.count() == 0:
                seed_collection(_collection)
        except Exception as e:
            print(f"Failed to initialize ChromaDB, falling back to Python search: {str(e)}")
            return None
            
    return _collection

def seed_collection(col: Any):
    print("Seeding ChromaDB product embeddings...")
    products = get_products_data()
    
    ids = []
    documents = []
    metadatas = []
    
    for p in products:
        ids.append(p["id"])
        
        veg_str = "vegetarian veg" if p.get("is_vegetarian") else "non-vegetarian"
        vegan_str = "vegan" if p.get("is_vegan") else ""
        protein_str = "high protein gym fitness" if p.get("is_high_protein") else ""
        tags_str = ", ".join(p.get("tags", []))
        
        doc = (
            f"Product Name: {p['name']}. "
            f"Brand: {p['brand']}. "
            f"Category: {p['category']}. "
            f"Subcategory: {p.get('subcategory', '')}. "
            f"Price: {p['price']} INR. "
            f"MRP: {p['mrp']} INR. "
            f"Unit: {p['unit']}. "
            f"Description: {p.get('description', '')}. "
            f"Tags: {tags_str}. "
            f"Diet: {veg_str} {vegan_str} {protein_str}."
        )
        
        documents.append(doc)
        metadatas.append({
            "id": p["id"],
            "category": p["category"],
            "price": float(p["price"]),
            "is_vegetarian": bool(p.get("is_vegetarian", False)),
            "is_vegan": bool(p.get("is_vegan", False)),
            "is_high_protein": bool(p.get("is_high_protein", False)),
            "in_stock": bool(p.get("in_stock", True))
        })
        
    col.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas
    )
    print(f"ChromaDB seeded successfully with {len(products)} products!")


def python_fallback_search(
    query: str, 
    limit: int = 15,
    filters: Optional[Dict[str, Any]] = None
) -> List[Dict]:
    """
    Pure Python fallback search combining keyword scoring, overlap, and metadata constraints.
    Extremely reliable, does not require PyTorch or external DBs.
    """
    products = get_products_data()
    scored_products = []
    
    # Process query into tokens
    query = query.lower()
    query_tokens = set(re.findall(r'\w+', query))
    
    # Stop words to filter out
    stop_words = {"need", "for", "a", "under", "rupees", "rs", "in", "the", "and", "or", "of", "to", "i", "want", "snacks"}
    keywords = query_tokens - stop_words
    if not keywords:
        keywords = query_tokens
        
    for p in products:
        # Check stock filter
        if not p.get("in_stock", True):
            continue
            
        # Apply dietary filters
        if filters:
            if filters.get("is_vegetarian") and not p.get("is_vegetarian", False):
                continue
            if filters.get("is_vegan") and not p.get("is_vegan", False):
                continue
            if filters.get("is_high_protein") and not p.get("is_high_protein", False):
                continue
                
        # Compute scoring
        score = 0.0
        
        name = p["name"].lower()
        brand = p["brand"].lower()
        category = p["category"].lower()
        description = p.get("description", "").lower()
        tags = [t.lower() for t in p.get("tags", [])]
        
        # 1. Exact matches in name or tags (high weight)
        for kw in keywords:
            if kw in name:
                # Direct match in name gets higher score if it's a full word
                if re.search(r'\b' + re.escape(kw) + r'\b', name):
                    score += 10.0
                else:
                    score += 5.0
            if kw in brand:
                score += 4.0
            if kw in category:
                score += 6.0
            if kw in description:
                score += 2.0
            if kw in tags:
                score += 5.0
                
        # 2. Category bias matching
        # If user asks for "snacks", boost snacks category
        if "snack" in query or "snacks" in query:
            if category == "snacks":
                score += 15.0
        if "beverage" in query or "beverages" in query or "drink" in query or "drinks" in query:
            if category == "beverages":
                score += 15.0
        if "milk" in query or "dairy" in query or "cheese" in query:
            if category == "dairy":
                score += 10.0
        if "breakfast" in query or "oats" in query or "egg" in query or "eggs" in query or "bread" in query:
            if category == "breakfast" or category == "bakery":
                score += 10.0
        if "fruit" in query or "fruits" in query:
            if category == "fruits":
                score += 15.0
        if "vegetable" in query or "vegetables" in query or "veggie" in query or "veggies" in query:
            if category == "vegetables":
                score += 15.0
        if "gym" in query or "protein" in query or "fitness" in query or "healthy" in query:
            if p.get("is_high_protein"):
                score += 15.0
            if category == "healthy":
                score += 10.0
                
        # Add small boost for higher rated products
        score += float(p.get("rating", 4.0)) * 0.5
        
        if score > 0:
            scored_products.append((p, score))
            
    # Sort by score descending
    scored_products.sort(key=lambda x: x[1], reverse=True)
    
    return [item[0] for item in scored_products[:limit]]


def query_relevant_products(
    query: str, 
    limit: int = 15,
    filters: Optional[Dict[str, Any]] = None
) -> List[Dict]:
    """
    Retrieve products using ChromaDB if available, otherwise fallback to Python search.
    """
    col = get_rag_collection()
    if col is not None:
        try:
            # Map filters to ChromaDB metadata
            where = {}
            if filters:
                if filters.get("is_vegetarian"):
                    where["is_vegetarian"] = True
                if filters.get("is_vegan"):
                    where["is_vegan"] = True
                if filters.get("is_high_protein"):
                    where["is_high_protein"] = True
                    
            results = col.query(
                query_texts=[query],
                n_results=limit,
                where=where if where else None
            )
            
            from .product_service import get_product_by_id
            matched_products = []
            if results and results["ids"] and len(results["ids"][0]) > 0:
                for p_id in results["ids"][0]:
                    p = get_product_by_id(p_id)
                    if p:
                        matched_products.append(p)
                return matched_products
        except Exception as e:
            print(f"ChromaDB query failed, falling back to Python search: {str(e)}")
            
    # Fallback to pure Python search
    return python_fallback_search(query, limit, filters)
