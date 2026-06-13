import httpx
import sys

BASE_URL = "http://127.0.0.1:8000/api"

def run_tests():
    print("Starting End-to-End API Integration Tests...")
    
    # 1. Register a new user
    user_data = {
        "username": "testuser_e2e",
        "email": "testuser_e2e@example.com",
        "password": "securepassword123"
    }
    
    print("\n1. Testing Auth - Registering user...")
    try:
        res = httpx.post(f"{BASE_URL}/auth/register", json=user_data)
        if res.status_code == 400 and "already registered" in res.text:
            print("User already registered, attempting login...")
        else:
            res.raise_for_status()
            print("Registration success!")
    except Exception as e:
        print("Registration failed:", str(e))
        sys.exit(1)

    # 2. Login
    print("\n2. Testing Auth - Logging in...")
    try:
        login_data = {
            "email": "testuser_e2e@example.com",
            "password": "securepassword123"
        }
        res = httpx.post(f"{BASE_URL}/auth/login", json=login_data)
        res.raise_for_status()
        token_data = res.json()
        token = token_data["access_token"]
        print("Login success! Token acquired.")
    except Exception as e:
        print("Login failed:", str(e))
        sys.exit(1)

    headers = {"Authorization": f"Bearer {token}"}

    # 3. Get Me
    print("\n3. Testing Auth - Fetching user profile info (GET /auth/me)...")
    try:
        res = httpx.get(f"{BASE_URL}/auth/me", headers=headers)
        res.raise_for_status()
        print("Get Me success:", res.json())
    except Exception as e:
        print("Get Me failed:", str(e))
        sys.exit(1)

    # 4. Get Categories
    print("\n4. Testing Products - Listing categories...")
    try:
        res = httpx.get(f"{BASE_URL}/products/categories", headers=headers)
        res.raise_for_status()
        categories = res.json()["categories"]
        print("Categories success:", categories)
    except Exception as e:
        print("Get categories failed:", str(e))
        sys.exit(1)

    # 5. List Products
    print("\n5. Testing Products - Querying product list...")
    try:
        res = httpx.get(f"{BASE_URL}/products", params={"limit": 5}, headers=headers)
        res.raise_for_status()
        products_data = res.json()
        print(f"Products success! Loaded {len(products_data['products'])} products (Total: {products_data['total']})")
        first_product_id = products_data["products"][0]["id"]
        first_product_name = products_data["products"][0]["name"]
    except Exception as e:
        print("List products failed:", str(e))
        sys.exit(1)

    # 6. Chat endpoint
    print("\n6. Testing AI Chat - Sending shopping request (under Rs.300)...")
    try:
        chat_req = {
            "message": "Need snacks for a movie night under 300 rupees",
            "history": []
        }
        res = httpx.post(f"{BASE_URL}/chat", json=chat_req, headers=headers, timeout=20.0)
        res.raise_for_status()
        chat_res = res.json()
        print("Chat success!")
        print("Bot Message:", chat_res["message"].replace("₹", "Rs. "))
        print(f"Bot recommended {len(chat_res['recommendations'])} products.")
        print("Reasoning:", chat_res["reasoning"].replace("₹", "Rs. "))
        print("Total price:", chat_res["total"])
        assert chat_res["total"] <= 300, "Should be under Rs. 300!"
    except Exception as e:
        print("Chat failed:", str(e))
        sys.exit(1)

    # 7. Add to Cart
    print(f"\n7. Testing Cart - Adding '{first_product_name}' to cart...")
    try:
        cart_add = {"product_id": first_product_id, "quantity": 2}
        res = httpx.post(f"{BASE_URL}/cart/add", json=cart_add, headers=headers)
        res.raise_for_status()
        print("Add to cart success:", res.json()["message"])
    except Exception as e:
        print("Add to cart failed:", str(e))
        sys.exit(1)

    # 8. View Cart
    print("\n8. Testing Cart - Fetching current cart...")
    try:
        res = httpx.get(f"{BASE_URL}/cart", headers=headers)
        res.raise_for_status()
        cart_data = res.json()
        print("Cart data:", cart_data)
        assert len(cart_data["items"]) > 0, "Cart should contain items!"
    except Exception as e:
        print("Fetch cart failed:", str(e))
        sys.exit(1)

    # 9. Update profile preferences
    print("\n9. Testing Profile - Updating preferences...")
    try:
        profile_update = {
            "is_vegetarian": True,
            "is_vegan": False,
            "is_high_protein": True,
            "budget_preference": 600,
            "favorite_categories": ["snacks", "dairy"]
        }
        res = httpx.put(f"{BASE_URL}/profile", json=profile_update, headers=headers)
        res.raise_for_status()
        print("Profile update success:", res.json())
    except Exception as e:
        print("Profile update failed:", str(e))
        sys.exit(1)

    # 10. Check profile GET
    print("\n10. Testing Profile - Retrieving updated profile...")
    try:
        res = httpx.get(f"{BASE_URL}/profile", headers=headers)
        res.raise_for_status()
        profile_data = res.json()
        print("Profile data:", profile_data)
        assert profile_data["is_vegetarian"] == True, "Vegetarian setting should be True!"
        assert profile_data["is_high_protein"] == True, "High protein setting should be True!"
    except Exception as e:
        print("Profile fetch failed:", str(e))
        sys.exit(1)

    print("\nAll E2E Integration tests passed successfully!")

if __name__ == "__main__":
    run_tests()
