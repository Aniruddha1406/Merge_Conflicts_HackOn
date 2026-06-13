from groq import Groq
from typing import List, Dict, Optional
import json

from ..config import settings
from .product_service import get_catalog_summary
from .rag_service import query_relevant_products

client = Groq(api_key=settings.groq_api_key)

SYSTEM_PROMPT = """You are QuickBot, an AI shopping assistant for a quick commerce platform like Blinkit, Zepto, and Instamart in India.

Your job: help users find products using natural language. Understand Indian grocery and shopping needs.

You will receive the user's request and the available product catalog. Respond ONLY with valid JSON in exactly this format:
{
  "message": "friendly conversational response in 1-2 sentences",
  "recommendations": [
    {
      "id": "product_id from catalog",
      "name": "exact product name from catalog",
      "price": 99,
      "category": "category name",
      "brand": "brand name",
      "unit": "quantity/unit",
      "image_url": "/images/categories/category.jpg",
      "reason": "why this product fits the request"
    }
  ],
  "total": 999,
  "reasoning": "brief explanation of your overall selection logic"
}

Rules:
- ONLY recommend products with in_stock: true from the catalog
- Respect budget constraints (e.g. 'under ₹300' means total <= 300)
- For vegetarian requests: only is_vegetarian: true products
- For vegan requests: only is_vegan: true products
- For high-protein/gym requests: prefer is_high_protein: true products
- Recommend 3-8 products typically, more for meal planning
- total = sum of all recommended product prices
- NEVER invent products not in the catalog
- Keep message friendly and conversational in Indian context (use ₹ for currency)
- Respond ONLY with JSON, no markdown code blocks, no extra text"""


def get_chat_response(
    message: str,
    history: List[Dict],
    user_profile: Optional[Dict] = None,
) -> Dict:
    # Get active dietary filters from user profile
    filters = {}
    if user_profile:
        filters = {
            "is_vegetarian": user_profile.get("is_vegetarian"),
            "is_vegan": user_profile.get("is_vegan"),
            "is_high_protein": user_profile.get("is_high_protein")
        }
        
    # Retrieve top 15 semantically relevant products matching the query and filters
    relevant_products = query_relevant_products(query=message, limit=15, filters=filters)
    
    # Group results by category to present a clean structure to the LLM
    by_category = {}
    for p in relevant_products:
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
    catalog = json.dumps(by_category, ensure_ascii=False)

    profile_context = ""
    if user_profile:
        prefs = []
        if user_profile.get("is_vegetarian"):
            prefs.append("vegetarian")
        if user_profile.get("is_vegan"):
            prefs.append("vegan")
        if user_profile.get("is_high_protein"):
            prefs.append("high-protein diet")
        budget = user_profile.get("budget_preference", 500)
        if prefs:
            profile_context = (
                f"\n\nUser dietary preferences: {', '.join(prefs)}. "
                f"Default budget preference: ₹{budget}."
            )

    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT + profile_context + f"\n\nPRODUCT CATALOG (JSON):\n{catalog}",
        }
    ]

    # Include last 6 history messages (3 exchanges)
    for h in history[-6:]:
        messages.append({"role": h["role"], "content": h["content"]})

    messages.append({"role": "user", "content": message})

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=0.3,
        max_tokens=2048,
        response_format={"type": "json_object"},
    )

    content = response.choices[0].message.content
    result = json.loads(content)

    # Ensure required fields exist
    result.setdefault("message", "Here are my recommendations for you!")
    result.setdefault("recommendations", [])
    if "total" not in result:
        result["total"] = sum(r.get("price", 0) for r in result["recommendations"])
    result.setdefault("reasoning", "Based on your request")

    return result
