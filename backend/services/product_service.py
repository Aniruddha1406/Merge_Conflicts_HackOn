import json
import os
from typing import List, Optional, Dict, Any

_products_cache: Optional[List[Dict]] = None


def load_products() -> List[Dict]:
    global _products_cache
    if _products_cache is None:
        data_path = os.path.join(os.path.dirname(__file__), "..", "data", "products.json")
        with open(data_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        _products_cache = data["products"]
    return _products_cache


def get_all_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 20,
) -> Dict:
    products = list(load_products())

    if category and category.lower() != "all":
        products = [p for p in products if p["category"].lower() == category.lower()]

    if search:
        s = search.lower()
        products = [
            p for p in products
            if s in p["name"].lower()
            or s in p["brand"].lower()
            or s in p["description"].lower()
            or any(s in t.lower() for t in p["tags"])
        ]

    total = len(products)
    start = (page - 1) * limit
    return {"products": products[start: start + limit], "total": total}


def get_product_by_id(product_id: str) -> Optional[Dict]:
    return next((p for p in load_products() if p["id"] == product_id), None)


def get_categories() -> List[str]:
    return sorted(set(p["category"] for p in load_products()))


def get_products_by_ids(product_ids: List[str]) -> List[Dict]:
    return [p for p in load_products() if p["id"] in product_ids]


def get_catalog_summary() -> str:
    """Compact catalog summary for LLM context (grouped by category)."""
    products = load_products()
    by_category: Dict[str, List] = {}
    for p in products:
        cat = p["category"]
        if cat not in by_category:
            by_category[cat] = []
        by_category[cat].append({
            "id": p["id"],
            "name": p["name"],
            "price": p["price"],
            "brand": p["brand"],
            "unit": p["unit"],
            "in_stock": p["in_stock"],
            "image_url": p["image_url"],
            "tags": p["tags"],
            "is_vegetarian": p["is_vegetarian"],
            "is_vegan": p["is_vegan"],
            "is_high_protein": p["is_high_protein"],
        })
    return json.dumps(by_category, ensure_ascii=False)
