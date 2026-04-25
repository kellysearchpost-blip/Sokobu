

# SokoBu — Premium African E-Commerce Marketplace

## Overview
A mobile-first, multi-category e-commerce marketplace for Burundi and East Africa, built with React + Tailwind CSS. Brand: Emerald green (#16a34a) + warm orange (#f97316), modern sans-serif typography (Inter), vibrant African market aesthetic.

## Phase 1: Foundation & Design System
- Set up brand colors, typography (Inter via Google Fonts), CSS variables, and Tailwind config
- Create reusable UI primitives: ProductCard, CategoryPill, Badge (Sale/Hot/New), PriceDisplay (BIF/KES toggle), StarRating, SkeletonLoader
- Global state for currency (BIF ↔ KES) and language (FR ↔ EN) with localStorage persistence
- Mobile bottom navigation bar (Home, Categories, Cart, Wishlist, Account)
- Sticky top navbar with logo, search bar, cart icon, user avatar, language toggle

## Phase 2: Homepage
- Hero section with green-to-dark gradient, headline, "Shop Now" / "Sell on SokoBu" CTAs
- Scrolling category pill bar (Electronics, Fashion, Food, Home, Beauty, Agriculture, Services)
- Flash Deals horizontal scroll with countdown timers and discount badges
- "Trending in Burundi 🇧🇮" and "Popular in Kenya 🇰🇪" product grids (4-col desktop, 2-col mobile)
- Trust bar (Secure Payments, Fast Delivery, Easy Returns, 24/7 Support)
- Newsletter signup banner (orange background)
- Footer with logo, links, social icons, payment method logos, language selector

## Phase 3: Product Pages
- **Product Listing Page**: Left sidebar filters (category, price slider, rating, location, availability), sort dropdown, 3-col/2-col responsive grid, wishlist hearts, infinite scroll
- **Product Detail Page**: Image gallery with thumbnails, price with currency toggle, quantity selector, Add to Cart + Buy Now buttons, WhatsApp "Chat with Seller" floating button, tabs (Description/Specs/Reviews), review breakdown chart, related products

## Phase 4: Cart & Checkout
- Slide-in cart drawer with item list, quantities, subtotal
- 3-step checkout with progress bar:
  1. Delivery info (name, phone, address, city, country)
  2. Payment method tiles (Mobile Money auto-detected by country, Card, Cash on Delivery, Bank Transfer)
  3. Order summary + place order
- Order confirmation page with confetti animation

## Phase 5: User Account
- Login/Register with phone number + OTP field (centered card layout)
- My Orders with status badges (Pending/Confirmed/Shipped/Delivered)
- Order detail with 4-step timeline tracker
- Wishlist page (saved product grid)
- Profile settings (name, phone, addresses, language, currency preferences)

## Phase 6: Admin/Seller Dashboard
- Sidebar navigation (Dashboard, Products, Orders, Customers, Promotions, Settings)
- Dashboard: stat cards (Revenue, Orders Today, Products, Customers), revenue line chart, recent orders table
- Products table with image, name, price, stock, status, edit/delete; Add Product button
- Add/Edit Product form: drag-and-drop image upload (up to 5), rich text description, category, pricing, stock, country availability
- Orders page with filterable table and status management

## Technical Details
- All pages use skeleton loaders, lazy-loaded images, empty states with illustrations
- Toast notifications (bottom-right) for cart actions and feedback
- Mobile-first responsive design throughout
- Mock data for all products, categories, and orders (Supabase integration deferred to a follow-up phase)
- Currency formatting with thousand separators (e.g. 45,000 BIF)

