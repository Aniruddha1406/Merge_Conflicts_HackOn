<div align="center">

# 🛒 Amazon Now

### AI-Powered Conversational Commerce — Shopping Reimagined with Aria

[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Groq LLM](https://img.shields.io/badge/Groq-Llama_3.1-F55036?style=for-the-badge&logo=meta&logoColor=white)](https://console.groq.com/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-RAG-4A154B?style=for-the-badge&logo=vector&logoColor=white)](https://www.trychroma.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![AWS](https://img.shields.io/badge/AWS-Elastic_Beanstalk-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-RDS-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

**Team Merge_Conflicts · HackOn Amazon Season 6, 2026**

*Shopping becomes a conversation. Built for the next generation of commerce.*

[Live Demo](https://merge-conflicts-hack-on.vercel.app) · [Architecture](#-system-architecture) · [AI Engine](#-ai-engine-deep-dive) · [Setup Guide](#-getting-started)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
- [AI Engine Deep Dive](#-ai-engine-deep-dive)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Pages & Routes](#-pages--routes)
- [How to Use (Step-by-Step)](#-how-to-use-step-by-step)
- [Signal Control Logic](#-ai-signal-control-logic)
- [Cloud Deployment](#-cloud-deployment)
- [Database Schema](#-database-schema)
- [Innovation Highlights](#-innovation-highlights)
- [Why Amazon Now?](#-why-amazon-now)
- [Team](#-team)
- [License](#-license)

---

## 🌐 Overview

**Amazon Now** is a full-stack AI-powered conversational commerce platform where every shopping journey is driven by **Aria** — an intelligent AI shopping companion. Combining **natural language understanding**, **real-time contextual intelligence**, **game-theory price negotiation**, and **collaborative group shopping**, Amazon Now transforms everyday e-commerce into a seamless, intuitive, and deeply personalized experience.

Built by **Team Merge_Conflicts** for the **HackOn Amazon Season 6, 2026**, Amazon Now demonstrates how conversational AI, semantic search, and contextual awareness can redefine how users discover, evaluate, and purchase products.

> **💡 Key Insight:** Users spend **60% of their shopping time** scrolling through search results. Amazon Now replaces keyword searches with natural conversations — *"I'm hosting a party tonight, what should I get?"* — and delivers curated, budget-aware, contextually relevant product bundles instantly.

---

## 🚨 The Problem

<div align="center">

| Problem | Impact |
|---------|--------|
| 🔍 **Keyword-based search** | Users type generic queries, scroll endlessly through irrelevant results |
| 💰 **No price negotiation** | Fixed prices with no room for dynamic, personalized deals |
| 🛒 **Shopping in isolation** | Families and roommates can't plan and shop together in real-time |
| 🌧️ **No real-world context** | Recommendations ignore weather, time, mood, events, and festivals |
| 🤒 **No situational awareness** | Stores don't detect when a user is sick, celebrating, or stressed |
| 🍽️ **Recipe friction** | Users manually search for each ingredient when cooking a recipe |
| 📋 **No meal planning** | No way to generate a weekly meal plan and auto-create a grocery list |

</div>

---

## 💡 Our Solution

Amazon Now operates on **three integrated pillars**:

```
┌──────────────────────────────────────────────────────────────────┐
│                         AMAZON NOW                               │
├──────────────────┬──────────────────┬────────────────────────────┤
│  🧠 ARIA AI      │  🤝 SOCIAL      │    🛍️ FULL COMMERCE       │
│                  │  COMMERCE        │                            │
│  Conversational  │  Group carts     │  Complete end-to-end       │
│  shopping with   │  with voting,    │  shopping: browse,         │
│  voice, NLU,     │  consensus       │  cart, checkout, orders,   │
│  RAG, context,   │  building, and   │  payments, addresses,      │
│  and emotion     │  shared dietary  │  and profile management    │
│  intelligence    │  preferences     │                            │
├──────────────────┼──────────────────┼────────────────────────────┤
│  RAG pipeline    │  Shareable codes │  JWT authentication        │
│  Game theory     │  Upvote/downvote │  194+ real products        │
│  Care Kits       │  Diet consensus  │  Voice checkout flow       │
│  Meal planning   │  Owner checkout  │  Order history             │
└──────────────────┴──────────────────┴────────────────────────────┘
```

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Frontend["🖥️ Frontend Layer (Vercel)"]
        REACT[React 18 + Vite + Tailwind]
        CHAT[ChatPage — Aria AI]
        PRODUCTS[ProductsPage — Catalog]
        MEAL[MealPlannerPage]
        GROUP[GroupCartPage]
        VOICE[Web Speech API]
        GSAP_ANI[GSAP Animations]
    end

    subgraph Proxy["🔀 Vercel Serverless Proxy"]
        PROXY["api/proxy.js<br/>HTTPS → HTTP bridge"]
    end

    subgraph Backend["⚙️ Backend Layer (AWS EB)"]
        FASTAPI[FastAPI + Uvicorn]
        AUTH_R[Auth Router]
        CHAT_R[Chat Router]
        CART_R[Cart Router]
        ORDER_R[Order Router]
        AGENT[Agent Service]
        LLM[LLM Service]
        RAG[RAG Service]
        BARGAIN[Bargain Service]
        EMOTION[Emotion Service]
        CONTEXT[Context Service]
        PAIRING[Pairing Service]
        TAXONOMY[Taxonomy Service]
        MEALPLAN[Meal Planner Service]
    end

    subgraph AI["🤖 AI Layer"]
        GROQ[Groq API<br/>Llama 3.1 8B]
        FALLBACK[Gemma2 9B IT<br/>Auto-fallback]
        CHROMA[(ChromaDB<br/>Vector Search)]
        WEATHER[WeatherAPI.com<br/>Live Weather]
    end

    subgraph Database["🗄️ Database Layer"]
        RDS[(AWS RDS<br/>PostgreSQL)]
        SQLITE[(SQLite<br/>Local Dev)]
    end

    REACT --> PROXY
    VOICE --> CHAT
    PROXY --> FASTAPI
    FASTAPI --> AGENT
    AGENT --> LLM
    AGENT --> BARGAIN
    AGENT --> EMOTION
    LLM --> RAG
    LLM --> CONTEXT
    LLM --> TAXONOMY
    RAG --> CHROMA
    LLM --> GROQ
    GROQ -.->|rate limit| FALLBACK
    CONTEXT --> WEATHER
    FASTAPI --> RDS
    FASTAPI -.->|local dev| SQLITE
```

**Data Flow:**
1. **User speaks or types** a natural language request to Aria
2. **Agent Service** classifies intent → purchase, bargain, recipe, emotion, or browse
3. **RAG Service** retrieves semantically relevant products from ChromaDB / fallback search
4. **Context Service** injects live weather, time-of-day, and event signals (IPL, festivals, weekends)
5. **LLM Service** generates structured JSON with curated recommendations (anti-hallucination via RAG context)
6. **Taxonomy Service** organizes results into Amazon-style departments for display
7. **Frontend** renders interactive product cards with voice response via Web Speech API

---

## ✨ Key Features

### 🤖 Aria AI Shopping Assistant (`/chat`)
- **Natural language shopping** — talk to Aria like a personal shopper instead of typing keywords
- Powered by Groq's **Llama 3.1 8B Instant** LLM with automatic fallback to **Gemma2 9B IT** on rate limits
- **RAG pipeline** with ChromaDB vector search + Python fuzzy fallback for anti-hallucination
- Amazon-style **department taxonomy** grouping (8 departments, 22+ sub-categories)
- **Budget-aware** recommendations with real-time slider ceiling enforcement
- **Follow-up conversation detection** — short clarifying questions won't trigger redundant product searches
- **Quick reply buttons** for voice-optimized interactions

### 🎙️ Voice Commerce
- **Hands-free shopping** using browser-native Web Speech API (`SpeechRecognition` + `speechSynthesis`)
- Speak requests, hear responses — fully conversational loop
- Interim transcript display while speaking
- Graceful degradation on unsupported browsers (mic button hidden)

> **Note:** Voice features require HTTPS. The live deployment on Vercel provides this automatically.

### 🤒 Emotional & Situational Intelligence
Amazon Now detects **8 distinct emotional or situational contexts** from messages and assembles a complete, scenario-aware **Care Kit** of products:

| Situation | Trigger Examples | Kit Name |
|-----------|-----------------|----------|
| 🤒 Sick | "I have a fever", "sore throat" | Recovery Care Kit |
| 🎉 Celebrating | "It's my birthday", "got the job" | Celebration Bundle |
| 🫶 Stressed | "bad day", "burnt out" | Comfort & Unwind Kit |
| 🥗 Dieting | "craving something healthy" | Guilt-Free Craving Kit |
| 💪 Workout | "post-workout", "gym day" | Fuel & Recover Kit |
| 📚 Studying | "pulling an all-nighter" | Study Fuel Kit |
| 🥴 Hungover | "drank too much last night" | Morning-After Kit |
| 😴 Lazy | "can't cook tonight" | Zero-Effort Meal Kit |

Each Care Kit respects the user's dietary preferences (vegetarian, vegan, high-protein, weight-loss) and budget constraints.

### 💬 AI-Powered Smart Bargaining
A first-of-its-kind **Stackelberg game theory negotiation engine** that lets users haggle with Aria for better prices:

| Offer Range | Outcome |
|------------|---------|
| ≥ 95% of list price | ✅ Accepted with round-off discount |
| 90–95% of list | Counter at 8% discount |
| Above cost + margin floor | Counter with product swap or bundle add-on |
| Below cost floor | Politely decline, offer cheapest alternative |

Loyal customers get up to **12% additional flexibility** based on their purchase history.

### 🤝 Collaborative Group Carts (`/group`)
Shop together with family, roommates, or friends through synchronized group carts:

```
① Create a Group → generates a unique shareable code
② Share the Code → anyone with the code can join the session
③ Add Items → each member can propose products to the shared cart
④ Vote → members upvote or downvote proposed items
⑤ Checkout → the group owner pushes all approved items into their personal cart
```

Dietary preferences of all members (vegetarian, vegan) are tracked for consensus-aware recommendations.

### 🍽️ AI Meal Planner (`/meal-plan`)
Generate a personalized **multi-day meal plan** (1–7 days) with automatic grocery list generation:

```
User specifies goal → LLM generates structured meal plan → 
  Every ingredient mapped to real products → 
    Quantities deduplicated & scaled → 
      Single optimized shopping list → 
        One-click "Add All to Cart"
```

- Respects dietary constraints: vegetarian, vegan, high-protein, weight-loss modes
- Pantry staples (salt, oil, spices) are not over-counted
- Stable IDs per meal for client-side toggle/removal

### 🧾 Recipe-to-Cart Conversion
Paste any recipe text, and Aria instantly:
1. Parses it into a structured ingredient list using the LLM
2. Matches each ingredient to a real product in the catalog
3. Skips items the user recently purchased (deduplication via order history)
4. Presents the matched products with one-click "Add All to Cart"

### 🔍 Semantic Product Discovery
ChromaDB-powered vector search with Sentence Transformers (`all-MiniLM-L6-v2`) understands meaning and intent, delivering highly relevant recommendations beyond traditional keyword matching. Falls back to a lightweight **Python-based fuzzy search** with intent-to-category mapping on resource-constrained environments.

### 🔄 Intelligent Product Substitution
When a product is out of stock, the system:
1. Searches for in-stock alternatives using semantic similarity
2. Matches by tag overlap, price proximity, rating, and category
3. **Weight-loss mode** shifts substitutions toward healthier alternatives (e.g., full-cream milk → toned milk, fried → air-fried)
4. Clearly labels substitutions with the original product name and the reason for the swap

### 🌤️ Context-Aware Recommendations
The **Context Service** injects three layers of real-world intelligence into every recommendation:

**1. Live Weather** (via WeatherAPI.com)
| Condition | Recommendations |
|-----------|----------------|
| 🌧️ Rain | Hot snacks, chai, maggi noodles, soup |
| 🥵 Hot (35°C+) | Cold drinks, ice cream, watermelon, buttermilk |
| 🥶 Cold (≤15°C) | Coffee, tea, hot chocolate, soups |
| ☀️ Warm | Refreshing beverages, fruits, salads |

**2. Time of Day**
| Time Window | Product Focus |
|-------------|--------------|
| Morning (7–10) | Eggs, milk, bread, coffee, cereal |
| Afternoon (1–4) | Snacks, cold drinks, fruits |
| Evening (4–7) | Tea-time items, cookies, pakoda |
| Night (9+) | Comfort food, ice cream, instant noodles |

**3. Event Detection**
| Event | Trigger |
|-------|---------|
| 🏏 IPL Season | March–May evenings → party snacks, chips, cold drinks |
| 🎉 Weekend | Saturday/Sunday → family groceries, party supplies |
| 🎊 Friday Evening | Party food and celebration snacks |
| 🪔 Festival Season | Oct–Nov → sweets, dry fruits, gift packs |

### 💰 Cart Optimization Engine
Proactively monitors the user's cart value against business thresholds:

| Threshold | Amount | Benefit |
|-----------|--------|---------|
| Free Delivery | ₹399 | Save ₹49 delivery charge |
| Coupon Discount | ₹499 | Get ₹75 off |

When the cart is within ₹150 of a threshold, Aria suggests specific products from the user's **frequently purchased items** to cross it — maximizing savings automatically.

### 🍷 Smart Pairing Engine (Graph-Traversal BFS)
A **directed weighted graph** models "frequently bought together" relationships across the entire catalog:

- **Nodes** = product IDs
- **Edges** = complementary purchase probability (weight 0–1)
- **Algorithm** = Priority-queue Best-First Search (BFS) up to depth 2

Examples of built-in pairing edges:
| Source | Target | Weight |
|--------|--------|--------|
| Nachos | Condiments | 0.95 |
| Coffee | Dairy | 0.93 |
| Smartphones | Mobile Accessories | 0.95 |
| Mascara | Eyeliner | 0.90 |
| Women's Dresses | Heels | 0.85 |

Results are grouped into visual clusters like **"Snack Party Bundle 🍿"**, **"Tech Ecosystem Bundle 📱"**, or **"Beauty Routine Bundle 💄"**.

### 📊 Amazon-Style Department Taxonomy
All **194+ products** are organized into **8 top-level Amazon India departments** with tier-2 sub-categories:

| Department | Sub-categories |
|-----------|---------------|
| 📦 Grocery & Gourmet Foods | Grocery & Gourmet |
| 📦 Home & Kitchen | Furniture, Home Décor, Kitchen Tools |
| 📦 Electronics & Accessories | Smartphones, Laptops, Tablets, Mobile Accessories |
| 📦 Clothing, Shoes & Jewelry | Men's Shirts, Men's Shoes, Women's Dresses, Bags, Jewellery, Tops, Sunglasses |
| 📦 Beauty & Personal Care | Makeup & Beauty, Skin Care, Fragrances |
| 📦 Watches & Accessories | Men's Watches, Women's Watches |
| 📦 Sports, Fitness & Outdoors | Sports & Fitness Accessories |

### 🛍️ Full E-Commerce Flow
Amazon Now includes a complete end-to-end shopping infrastructure:

- **User Authentication** — JWT-based registration and login with bcrypt password hashing
- **Product Catalog** — Browsable product grid with category filters, search, and sorting
- **Shopping Cart** — Add, remove, update quantities, clear cart
- **Saved Addresses** — CRUD with default address selection (full Indian address format: line1, line2, city, state, pincode)
- **Payment Methods** — Card, UPI, Cash on Delivery, Net Banking, Wallet (demo/mock — no real card data stored)
- **Order Management** — Place orders, view order history, track payment status (pending → paid → completed)
- **User Profiles** — Dietary preferences (vegetarian, vegan, high-protein, weight-loss mode), budget preference, favorite categories
- **Conversational Checkout** — Say "buy this" to Aria and she'll collect address + payment via chat, then redirect to payment portal

---

## 🤖 AI Engine Deep Dive

### Agent Service — The Brain

The `agent_service.py` is the **single entry point** for all chat interactions. It acts as an orchestrator that classifies user intent and routes to the appropriate sub-system:

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Message                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  Intent     │
                    │  Classifier │
                    └──────┬──────┘
                           │
         ┌─────────┬───────┼───────┬──────────┬────────────┐
         ▼         ▼       ▼       ▼          ▼            ▼
    ┌─────────┐┌───────┐┌──────┐┌───────┐┌─────────┐┌──────────┐
    │Purchase ││Bargain││Recipe││Emotion││ Cancel  ││  Browse  │
    │ Intent  ││ Intent││Intent││ State ││ Intent  ││ (Default)│
    └────┬────┘└───┬───┘└──┬───┘└───┬───┘└────┬────┘└────┬─────┘
         │         │       │        │         │          │
    ┌────▼────┐┌───▼───┐┌──▼───┐┌───▼───┐┌────▼────┐┌────▼─────┐
    │Checkout ││Stackel││Recipe││Care   ││  Abort  ││LLM + RAG │
    │  Flow   ││-berg  ││Parser││  Kit  ││Checkout ││ Pipeline │
    └─────────┘└───────┘└──────┘└───────┘└─────────┘└──────────┘
```

### Priority Hierarchy
```
Mid-Checkout (address/payment) > Cancel > Purchase > Bargain > Emotion/Care Kit > Default Recommendation
```

### RAG Anti-Hallucination Pipeline

```
┌──────────────┐     ┌────────────────────┐        ┌──────────────────┐
│  User Query  │────▶│  Intent-to-Category │────▶│  Semantic Search  │
│              │     │  Mapping (30+ maps) │      │  (ChromaDB /      │
│              │     │                    │       │   Python Fuzzy)   │
└──────────────┘     └────────────────────┘        └────────┬─────────┘
                                                            │
                    ┌────────────────────┐                  │
                    │  Budget Filtering  │ ◀────────────── ┘
                    │  (per-item + total)│
                    └────────┬───────────┘
                             │
                    ┌────────▼───────────┐     ┌─────────────────┐
                    │  <RAG_CONTEXT>     │────▶│  Groq LLM       │
                    │  Anti-hallucination│     │  (structured    │
                    │  block injected    │     │   JSON output)  │
                    └────────────────────┘     └────────┬────────┘
                                                        │
                    ┌────────────────────┐              │
                    │  Post-LLM          │◀─────────────┘
                    │  Enrichment:       │
                    │  • Real product    │
                    │    data merge      │
                    │  • Budget defense  │
                    │  • Backfill grid   │
                    │  • Dept taxonomy   │
                    └────────────────────┘
```

### LLM Model Fallback Chain

```
Primary: llama-3.1-8b-instant ──[429 / rate limit]──▶ Fallback: gemma2-9b-it
```

Both models use the same `_chat_complete` wrapper that catches `RateLimitError` and transparently retries with the fallback model. Users never see an error.

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | Component-based UI library |
| **Vite 5** | High-performance build tool and dev server |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **React Router v6** | Client-side routing with protected routes |
| **Axios** | Promise-based HTTP client with JWT interceptors |
| **GSAP** | Micro-animations and page transitions |
| **Lucide React** | Modern SVG icon library |
| **Web Speech API** | Browser-native voice recognition and text-to-speech |

### Backend
| Technology | Purpose |
|-----------|---------|
| **FastAPI** | Async Python web framework with auto-generated OpenAPI docs |
| **SQLAlchemy** | ORM for database models and queries |
| **PostgreSQL** | Production relational database (SQLite for local dev) |
| **Pydantic v2** | Request/response validation with `model_validate` |
| **python-jose** | JWT token creation and verification |
| **bcrypt (passlib)** | Secure password hashing |
| **Docker + Compose** | Containerization for consistent deployments |

### Artificial Intelligence
| Technology | Purpose |
|-----------|---------|
| **Groq API** | Ultra-fast LLM inference (free tier) |
| **Llama 3.1 8B Instant** | Primary language model for recommendations |
| **Gemma2 9B IT** | Automatic fallback model when rate-limited |
| **ChromaDB** | Vector database for semantic product search |
| **Sentence Transformers** | `all-MiniLM-L6-v2` embedding model |
| **WeatherAPI.com** | Live weather data for contextual recommendations |

### Cloud Infrastructure
| Technology | Purpose |
|-----------|---------|
| **AWS Elastic Beanstalk** | Managed Docker deployment with health monitoring |
| **AWS RDS** | Managed PostgreSQL database |
| **Vercel** | Frontend hosting with Edge CDN and automatic HTTPS |
| **Vercel Serverless Functions** | Custom API proxy to bridge HTTPS ↔ HTTP |

</div>

---

## 📁 Project Structure

```
Merge_Conflicts_HackOn/
│
├── README.md                          ← You are here
├── docker-compose.yml                 ← One-click full-stack launcher
├── .gitignore                         ← Comprehensive ignore rules
│
├── backend/                           ← ⚙️ FastAPI Backend Application
│   ├── main.py                        # FastAPI app entry — router registration, CORS, migrations
│   ├── config.py                      # Pydantic settings — LLM keys, JWT, DB, business rules
│   ├── database.py                    # SQLAlchemy engine, sessions, lightweight migrations
│   ├── models.py                      # 10 ORM models: User, Cart, Profile, Orders, Groups, etc.
│   ├── schemas.py                     # 25+ Pydantic request/response schemas
│   ├── generate_catalog.py            # DummyJSON → products.json converter (194+ products)
│   ├── Dockerfile                     # Python 3.10-slim + CPU-only PyTorch
│   ├── requirements.txt               # Python dependencies
│   ├── .env.example                   # 🔑 Environment variable template
│   │
│   ├── routers/                       # 📡 API route handlers (13 modules)
│   │   ├── auth.py                    # Register, Login, JWT token management
│   │   ├── chat.py                    # Aria AI chat endpoint
│   │   ├── products.py                # Catalog browsing & search
│   │   ├── cart.py                    # Cart CRUD operations
│   │   ├── orders.py                  # Order creation & history
│   │   ├── profile.py                 # User dietary preferences
│   │   ├── recipe.py                  # Recipe-to-cart parsing
│   │   ├── meal_plan.py               # AI meal plan generation
│   │   ├── bargain.py                 # Game-theory price negotiation
│   │   ├── pairing.py                 # Graph-BFS product pairing
│   │   ├── group.py                   # Group cart sessions
│   │   ├── addresses.py               # Saved delivery addresses
│   │   └── payments.py                # Saved payment methods
│   │
│   ├── services/                      # 🧠 AI & business logic (12 modules)
│   │   ├── agent_service.py           # Intent classifier + checkout flow orchestrator
│   │   ├── llm_service.py             # Groq API wrapper + RAG + follow-up detection
│   │   ├── rag_service.py             # ChromaDB vector search + Python fallback
│   │   ├── bargain_service.py         # Stackelberg negotiation engine
│   │   ├── emotion_service.py         # Situational Care Kit assembly
│   │   ├── context_service.py         # Weather + Time + Event triggers
│   │   ├── pairing_service.py         # Graph-traversal BFS product pairing
│   │   ├── meal_planner_service.py    # Multi-day meal plan + shopping list
│   │   ├── order_service.py           # Order lifecycle + cart optimization
│   │   ├── product_service.py         # Product data loading & lookup
│   │   ├── taxonomy_service.py        # Amazon department tree mapping
│   │   └── group_service.py           # Group session management
│   │
│   └── data/
│       ├── products.json              # 194+ product catalog (DummyJSON sourced)
│       └── chroma_db/                 # ChromaDB persistent vector store
│
└── frontend/                          ← 🖥️ React + Vite Frontend Application
    ├── index.html                     # SPA entry point
    ├── vite.config.js                 # Vite config with API proxy
    ├── tailwind.config.js             # Tailwind theme customization
    ├── postcss.config.js
    ├── package.json                   # Node.js dependencies
    ├── vercel.json                    # Vercel rewrite rules for SPA + proxy
    ├── Dockerfile                     # Nginx Alpine — serves pre-built SPA
    ├── nginx.conf                     # Nginx config for React Router + API proxy
    ├── .env.example                   # 🔑 Frontend env template
    │
    ├── api/
    │   └── proxy.js                   # Vercel serverless — HTTPS→HTTP bridge to AWS
    │
    └── src/
        ├── App.jsx                    # Root app — BrowserRouter, auth guards, routes
        ├── main.jsx                   # React DOM entry point
        ├── index.css                  # Global styles + Tailwind directives
        │
        ├── pages/                     # 📄 Page-level components (9 pages)
        │   ├── ChatPage.jsx           # Aria AI conversation interface
        │   ├── ProductsPage.jsx       # Browsable product catalog grid
        │   ├── MealPlannerPage.jsx    # Weekly meal plan generator
        │   ├── GroupCartPage.jsx      # Collaborative group shopping
        │   ├── PaymentPage.jsx        # Order payment portal
        │   ├── OrdersPage.jsx         # Order history
        │   ├── AccountPage.jsx        # Profile & preferences
        │   ├── LoginPage.jsx          # Sign-in page
        │   └── RegisterPage.jsx       # Registration page
        │
        ├── components/                # 🧩 Reusable UI components
        │   ├── Cart/
        │   │   └── CartSidebar.jsx    # Slide-out shopping cart
        │   ├── Chat/
        │   │   ├── MessageBubble.jsx  # Chat message display
        │   │   ├── ProductRecommendation.jsx  # Product cards in chat
        │   │   ├── BargainModal.jsx   # Price negotiation UI
        │   │   └── PairingCluster.jsx # Bundled product suggestions
        │   ├── Layout/
        │   │   ├── Header.jsx         # Navigation header
        │   │   └── FloatingChat.jsx   # Persistent chat bubble
        │   └── effects/
        │       ├── PageTransition.jsx # GSAP page transitions
        │       ├── PremiumCursor.jsx  # Custom cursor effect
        │       └── Reveal.jsx         # Scroll reveal animations
        │
        ├── context/                   # 🔄 React context providers
        │   ├── AuthContext.jsx        # Authentication state management
        │   └── CartContext.jsx        # Shopping cart state management
        │
        ├── hooks/
        │   └── useSpeech.js           # 🎙️ Web Speech API hook (STT + TTS)
        │
        └── services/
            └── api.js                 # 🌐 Axios client — 12 API modules with JWT interceptors
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Installation |
|-------------|---------|-------------|
| **Node.js** | ≥ 18 LTS | [nodejs.org](https://nodejs.org) |
| **Python** | ≥ 3.10 | [python.org](https://python.org) |
| **pip** | Latest | Comes with Python |
| **Docker** | Latest | [docker.com](https://www.docker.com/) *(optional — for containerized setup)* |
| **Groq API Key** | — | Free at [console.groq.com](https://console.groq.com) |

---

### Option A: Docker Compose (Recommended)

The fastest way to get everything running:

```bash
# 1. Clone the repository
git clone https://github.com/Anwesha28S/Merge_Conflicts_HackOn.git
cd Merge_Conflicts_HackOn

# 2. Configure environment variables
cp backend/.env.example backend/.env
# Edit backend/.env and add your GROQ_API_KEY

# 3. Build the frontend (required for Docker)
cd frontend
npm install
npm run build
cd ..

# 4. Launch everything
docker-compose up --build
```

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | [http://localhost](http://localhost) | Amazon Now web application |
| **Backend API** | [http://localhost:8080](http://localhost:8000) | FastAPI backend |
| **API Docs** | [http://localhost:8080/docs](http://localhost:8000/docs) | Interactive Swagger UI |

---

### Option B: Manual Setup (Development)

#### Step 1 — Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env → add GROQ_API_KEY

# Start the backend server
uvicorn main:app --port 8000 --reload
```

Backend runs on: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

#### Step 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

> ⚠️ If `npm install` fails with peer dependency errors, use `npm install --force`

---

### Step 3 — Generate Product Catalog (Optional)

The repo ships with a pre-built `products.json`. To regenerate from DummyJSON:

```bash
cd backend
python generate_catalog.py
```

This fetches 194+ real products with images from DummyJSON, converts USD prices to INR, and writes `data/products.json`.

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GROQ_API_KEY` | ✅ | — | Groq API key ([console.groq.com](https://console.groq.com)) |
| `GROQ_MODEL` | ❌ | `llama-3.1-8b-instant` | Primary LLM model |
| `GROQ_FALLBACK_MODEL` | ❌ | `gemma2-9b-it` | Fallback when rate-limited |
| `DATABASE_URL` | ❌ | `sqlite:///./quickcommerce.db` | Database connection string |
| `SECRET_KEY` | ⚠️ | *change in prod* | JWT signing secret |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | ❌ | `1440` | JWT token TTL (24 hours) |
| `ENVIRONMENT` | ❌ | `development` | `development` or `production` |
| `WEATHER_API_KEY` | ❌ | — | WeatherAPI.com key (contextual triggers) |
| `WEATHER_API_CITY` | ❌ | `Mumbai` | City for weather context |
| `FREE_DELIVERY_THRESHOLD` | ❌ | `399.0` | Cart value for free delivery |
| `DELIVERY_CHARGE` | ❌ | `49.0` | Delivery charge below threshold |
| `COUPON_THRESHOLD` | ❌ | `499.0` | Cart value for coupon unlock |
| `COUPON_DISCOUNT` | ❌ | `75.0` | Coupon discount amount |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ❌ | Backend API URL (default: `/api` via Vite proxy) |

> 🔐 All `.env` files are gitignored. Never commit credentials.

---

## 📡 API Reference

### Authentication

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | ❌ | Create new account |
| `/api/auth/login` | POST | ❌ | Login → JWT token |
| `/api/auth/me` | GET | ✅ | Get current user |

### Chat & AI

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/chat` | POST | ✅ | Aria AI chat — recommendations, checkout, bargain, care kit |
| `/api/bargain` | POST | ✅ | Direct bargain negotiation |
| `/api/pairing` | POST | ✅ | Graph-BFS product pairing |
| `/api/meal-plan` | POST | ✅ | Generate AI meal plan |
| `/api/meal-plan/consolidate` | POST | ✅ | Rebuild shopping list from ingredients |
| `/api/recipe/parse` | POST | ✅ | Recipe-to-cart conversion |

### Products

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/products` | GET | ✅ | List products (pagination, filters, search) |
| `/api/products/categories` | GET | ✅ | List all categories |
| `/api/products/departments` | GET | ✅ | Amazon-style department tree |
| `/api/products/{id}` | GET | ✅ | Get single product |

### Cart & Orders

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/cart` | GET | ✅ | Get user's cart |
| `/api/cart/add` | POST | ✅ | Add item to cart |
| `/api/cart/update/{id}` | PUT | ✅ | Update item quantity |
| `/api/cart/remove/{id}` | DELETE | ✅ | Remove item from cart |
| `/api/cart/clear` | DELETE | ✅ | Clear entire cart |
| `/api/orders` | GET | ✅ | List order history |
| `/api/orders` | POST | ✅ | Create order from product IDs |
| `/api/orders/{id}/pay` | POST | ✅ | Mark order as paid |

### Group Cart

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/group/create` | POST | ✅ | Create group session |
| `/api/group/{code}/join` | POST | ✅ | Join session by code |
| `/api/group/{code}` | GET | ✅ | Get session details |
| `/api/group/{code}/items` | POST | ✅ | Add item to group cart |
| `/api/group/{code}/items/{id}/vote` | POST | ✅ | Vote on an item |
| `/api/group/{code}/checkout-to-cart` | POST | ✅ | Move approved items to personal cart |

### Profile & Settings

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/profile` | GET/PUT | ✅ | Get/update dietary preferences |
| `/api/addresses` | GET/POST | ✅ | List/create delivery addresses |
| `/api/addresses/{id}/default` | PUT | ✅ | Set default address |
| `/api/payment-methods` | GET/POST | ✅ | List/create payment methods |
| `/api/payment-methods/{id}/default` | PUT | ✅ | Set default payment method |

---

## 📄 Pages & Routes

| Route | Page | Auth | Description |
|-------|------|------|-------------|
| `/chat` | Aria AI Chat | ✅ | Conversational shopping with voice, recommendations, and checkout |
| `/products` | Product Catalog | ✅ | Browsable product grid with category filters and search |
| `/meal-plan` | AI Meal Planner | ✅ | Multi-day meal plan generation with auto shopping list |
| `/group` | Group Cart | ✅ | Collaborative group shopping with shareable codes |
| `/group/:code` | Join Group | ✅ | Join an existing group session by code |
| `/payment/:orderId` | Payment Portal | ✅ | Order payment with multiple payment methods |
| `/orders` | Order History | ✅ | View past orders with itemized breakdowns |
| `/account` | User Profile | ✅ | Dietary preferences, budget, favorite categories |
| `/login` | Sign In | ❌ | Email/password authentication |
| `/register` | Create Account | ❌ | New account creation |

---

## 🧠 AI Signal Control Logic

### Recommendation Pipeline

The LLM service runs a multi-stage pipeline for every new product search:

```
1. Follow-up Detection
   ├── Pure acknowledgement ("thanks", "ok") → No products
   ├── Short question about previous product → Conversational reply
   └── Any search signal detected → Full recommendation pipeline ↓

2. RAG Retrieval
   ├── Resolve vague "more" queries → Extract topic from history
   ├── Blend favorite categories for generic requests
   ├── ChromaDB semantic search (or Python fuzzy fallback)
   └── Intelligent product substitution for out-of-stock items

3. Budget Enforcement
   ├── Adaptive budget: lifts ceiling if browsing expensive categories
   ├── Per-item budget filter (defense-in-depth)
   └── Cumulative budget cap in LLM system prompt

4. LLM Generation
   ├── Injected <RETRIEVED_CATALOG_CONTEXT> for anti-hallucination
   ├── Structured JSON output (message + departments + recommendations)
   └── Auto-fallback to gemma2-9b-it on rate limit

5. Post-LLM Enrichment
   ├── Verify every ID against real product catalog
   ├── Backfill grid if LLM returned fewer items than target
   ├── Server-side Amazon department taxonomy grouping
   └── Cart optimization suggestions attached
```

### Bargaining Decision Tree

```
Buyer Offer
    │
    ├── ≥ List Price ──────────────────▶ ✅ ACCEPT (full price)
    │
    ├── ≥ 95% of List ─────────────────▶ ✅ ACCEPT (round-off discount)
    │
    ├── ≥ 90% of List ─────────────────▶ 🔄 COUNTER (8% discount)
    │
    ├── ≥ Effective Floor ─────────────▶ 🔄 COUNTER (swap / add-on / floor)
    │   ├── Cheaper swap available? ────▶ Swap product + bundle deal
    │   ├── High-margin add-on found? ──▶ Bundle add-on to recover margin
    │   └── No swap/addon ─────────────▶ Counter at effective floor
    │
    └── < Cost Floor ──────────────────▶ ❌ DECLINE (show floor + alternatives)
```

---

## ☁️ Cloud Deployment

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Browser                          │
│                 (HTTPS via Vercel CDN)                       │
└───────────────────────┬─────────────────────────────────────┘
                        │
              ┌─────────▼─────────┐
              │    Vercel          │
              │  ┌──────────────┐ │
              │  │ Static SPA   │ │   React build (dist/)
              │  │ (Edge CDN)   │ │
              │  └──────┬───────┘ │
              │         │         │
              │  ┌──────▼───────┐ │
              │  │ api/proxy.js │ │   Serverless Function
              │  │ HTTPS→HTTP   │ │   (bridges to AWS)
              │  └──────┬───────┘ │
              └─────────┼─────────┘
                        │ HTTP
              ┌─────────▼─────────┐
              │  AWS Elastic      │
              │  Beanstalk        │
              │  ┌──────────────┐ │
              │  │ Docker       │ │   FastAPI + Uvicorn
              │  │ Container    │ │   (port 8080)
              │  └──────┬───────┘ │
              └─────────┼─────────┘
                        │ TCP (5432)
              ┌─────────▼─────────┐
              │  AWS RDS          │
              │  PostgreSQL       │
              └───────────────────┘
```

### Deploying the Backend (AWS)

```bash
# Package for deployment
git archive -o amazon-now.zip HEAD backend docker-compose.yml

# Upload to AWS Elastic Beanstalk Docker Environment
# Configure environment variables:
GROQ_API_KEY=your_key
DATABASE_URL=postgresql://user:pass@host:5432/dbname
SECRET_KEY=your-production-secret
ENVIRONMENT=production
```

### Deploying the Frontend (Vercel)

Deploy the `frontend` folder directly through Vercel:
1. Set root directory to `frontend`
2. The serverless proxy at `api/proxy.js` automatically bridges HTTPS → HTTP
3. Vercel provides automatic HTTPS, global CDN, and zero-downtime deployments

---

## 🗄️ Database Schema

```mermaid
erDiagram
    users ||--o{ cart_items : has
    users ||--o| user_profiles : has
    users ||--o{ orders : places
    users ||--o{ addresses : has
    users ||--o{ payment_methods : has
    users ||--o{ group_sessions : owns
    orders ||--o{ order_items : contains
    group_sessions ||--o{ group_members : has
    group_sessions ||--o{ group_items : contains

    users {
        string id PK
        string username UK
        string email UK
        string hashed_password
        boolean is_active
        datetime created_at
    }

    user_profiles {
        string id PK
        string user_id FK
        boolean is_vegetarian
        boolean is_vegan
        boolean is_high_protein
        boolean weight_loss_mode
        integer budget_preference
        text favorite_categories
    }

    cart_items {
        string id PK
        string user_id FK
        string product_id
        integer quantity
        datetime added_at
    }

    orders {
        string id PK
        string user_id FK
        float total_amount
        float delivery_charge
        string status
        text delivery_address
        string payment_method
        string payment_status
        datetime created_at
    }

    order_items {
        string id PK
        string order_id FK
        string product_id
        string product_name
        integer quantity
        float price_at_purchase
    }

    addresses {
        string id PK
        string user_id FK
        string full_name
        string phone
        string line1
        string line2
        string city
        string state
        string pincode
        boolean is_default
    }

    payment_methods {
        string id PK
        string user_id FK
        string type
        string label
        string details
        boolean is_default
    }

    group_sessions {
        string id PK
        string code UK
        string name
        string owner_id FK
        datetime created_at
    }

    group_members {
        string id PK
        string session_id FK
        string user_id FK
        string display_name
        boolean is_vegetarian
        boolean is_vegan
    }

    group_items {
        string id PK
        string session_id FK
        string product_id
        string product_name
        string added_by
        text votes
    }
```

---

## 👤 How to Use Amazon Now (Step-by-Step)

### 1. Create Your Account
Open the app and click **Create Account**. Enter your username, email, and password. You are automatically logged in and redirected to Aria.

### 2. Set Your Preferences
Click on the **Account** tab. Set your dietary preferences (Vegetarian, Vegan, High-Protein, or Weight-Loss mode), budget preference, and favorite product categories.

### 3. Start Shopping with Aria
Type or speak to Aria naturally:
- *"Show me snacks under ₹100"*
- *"I need ingredients for butter chicken"*
- *"What should I buy for a rainy evening?"*

Click the **+** button on any product card to add it to your cart.

### 4. Try Voice Shopping
Click the **microphone icon** in the chat, speak your request naturally, and Aria responds with product suggestions. The response is also spoken back to you.

### 5. Negotiate a Better Price
Try saying *"Can you do this for ₹400?"* or *"Any discount on this?"* — Aria will accept, counter-offer, or politely decline based on fair pricing logic.

### 6. Plan Your Meals
Go to the **Meal Planner** tab. Choose your goal, select the number of days (1–7) and servings. Click **Add All to Cart** to instantly add all the required groceries.

### 7. Shop with Friends (Group Cart)
Go to the **Group Cart** tab, create a group, and share the code. Everyone can add products and vote on items. The group owner checks out the agreed items.

### 8. Checkout & Pay
Say *"buy this"* or *"checkout"* to Aria — she will guide you through address and payment selection. Choose Card, UPI, COD, Net Banking, or Wallet and complete your order.

### 9. Track Your Orders
Go to the **Orders** tab to view your complete order history with itemized breakdowns, delivery charges, and payment status.

---

## 📈 Innovation Highlights

### 🎯 Conversational Commerce
Move beyond keyword search into fully natural shopping conversations. Aria understands *"I'm hosting a dinner party for 6"* and recommends a complete set of ingredients, snacks, and beverages — something a search bar could never do.

### 🧠 Contextual Intelligence
Recommendations adapt dynamically based on weather, time, festivals, IPL cricket season, weekends, and the user's emotional state. No two sessions produce the same results.

### 🎲 Game-Theory Bargaining
The Stackelberg negotiation model considers category margins, cost floors, buyer loyalty, and product alternatives to create a fair and engaging haggling experience that feels genuinely human.

### 👥 Collaborative Commerce
Group Carts enable families and roommates to plan and shop together with voting, consensus building, and shared dietary preference tracking — a feature absent from every major e-commerce platform.

### 🔬 Graph-Based Product Discovery
The BFS pairing engine discovers non-obvious product relationships (Nachos → Salsa, Yoga Mat → Protein Shake) that traditional collaborative filtering or vector similarity would miss entirely.

### 🤒 Emotional Intelligence
The Care Kit system detects 8 distinct emotional/situational states from natural language and assembles personalized product bundles — bringing genuine empathy to e-commerce.

### 🍽️ AI-Powered Meal Planning
Full meal plan generation with cross-meal ingredient deduplication and automatic scaling — converting a week's worth of recipes into a single optimized shopping list with one click.

---

## 💡 Why Amazon Now?

<div align="center">

| Traditional E-Commerce | Amazon Now |
|----------------------|-----------:|
| Type keywords, scroll through pages | Talk to Aria naturally, get instant results |
| Same recommendations for everyone | Personalized by weather, time, mood, and diet |
| No price negotiation | Bargain with AI using game theory |
| Shop alone | Group carts for families and roommates |
| Manually search for recipe ingredients | Paste a recipe, get the grocery list instantly |
| Discover products by browsing | AI suggests based on your situation (sick, studying, celebrating) |
| Static product suggestions | Dynamic recommendations that change with real-world context |
| Manual meal planning | AI generates weekly plans with auto-shopping lists |
| No voice interaction | Full voice-in, voice-out conversational shopping |

</div>

---

## 🤝 Team

<div align="center">

**Team Merge_Conflicts**

*Hack On Amazon Season 6, 2026*

| Area | Contribution |
|------|-------------|
| 🖥️ Full-Stack Development | React 18 SPA, FastAPI backend, Docker deployment |
| 🤖 AI/ML Engineering | LLM pipeline, RAG search, game-theory bargain engine |
| 🎨 UI/UX Design | Premium dark-mode design, GSAP animations, responsive layout |
| 🧠 Algorithm Design | Graph-BFS pairing, emotion detection, context service, meal planner |
| ☁️ Cloud Architecture | AWS Elastic Beanstalk, RDS PostgreSQL, Vercel CDN, Serverless proxy |

</div>

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**🛒 Amazon Now** · *Shopping becomes a conversation*

Built with ❤️ by team Merge_Conflicts

*Conversational e-commerce, powered by AI.*

</div>
