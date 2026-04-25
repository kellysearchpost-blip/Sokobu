export interface Product {
  id: string;
  name: string;
  nameFr: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: "sale" | "hot" | "new";
  country: "burundi" | "kenya";
  description: string;
  descriptionFr: string;
  stock: number;
  seller: string;
}

export interface Category {
  id: string;
  name: string;
  nameFr: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", nameFr: "Électronique", icon: "📱" },
  { id: "fashion", name: "Fashion", nameFr: "Mode", icon: "👗" },
  { id: "food", name: "Food", nameFr: "Alimentation", icon: "🍎" },
  { id: "home", name: "Home", nameFr: "Maison", icon: "🏠" },
  { id: "beauty", name: "Beauty", nameFr: "Beauté", icon: "💄" },
  { id: "agriculture", name: "Agriculture", nameFr: "Agriculture", icon: "🌾" },
  { id: "services", name: "Services", nameFr: "Services", icon: "🔧" },
];

export const products: Product[] = [
  {
    id: "1", name: "Samsung Galaxy A54", nameFr: "Samsung Galaxy A54",
    price: 850000, originalPrice: 950000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "electronics", rating: 4.5, reviews: 128, badge: "sale", country: "burundi",
    description: "Latest Samsung Galaxy A54 with 128GB storage and 6GB RAM. Perfect for everyday use.",
    descriptionFr: "Dernier Samsung Galaxy A54 avec 128Go de stockage et 6Go de RAM.", stock: 45, seller: "TechBuja"
  },
  {
    id: "2", name: "African Print Dress", nameFr: "Robe Imprimé Africain",
    price: 35000, image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400",
    category: "fashion", rating: 4.8, reviews: 89, badge: "hot", country: "burundi",
    description: "Beautiful handmade African print dress, available in multiple sizes.",
    descriptionFr: "Belle robe imprimée africaine faite à la main.", stock: 20, seller: "AfriStyle"
  },
  {
    id: "3", name: "Organic Coffee Beans 1kg", nameFr: "Café Bio en Grains 1kg",
    price: 25000, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
    category: "food", rating: 4.9, reviews: 256, badge: "new", country: "burundi",
    description: "Premium Burundian organic coffee beans, single origin from Kayanza.",
    descriptionFr: "Grains de café bio premium du Burundi, origine unique de Kayanza.", stock: 100, seller: "BurundiCoffee"
  },
  {
    id: "4", name: "Solar Panel 100W", nameFr: "Panneau Solaire 100W",
    price: 180000, originalPrice: 220000, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
    category: "electronics", rating: 4.3, reviews: 67, badge: "sale", country: "burundi",
    description: "High-efficiency 100W solar panel, perfect for home use in rural areas.",
    descriptionFr: "Panneau solaire 100W haute efficacité pour usage domestique.", stock: 30, seller: "SolarBuja"
  },
  {
    id: "5", name: "Leather Sandals", nameFr: "Sandales en Cuir",
    price: 15000, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400",
    category: "fashion", rating: 4.6, reviews: 42, country: "burundi",
    description: "Handcrafted genuine leather sandals, comfortable and durable.",
    descriptionFr: "Sandales en cuir véritable faites à la main.", stock: 50, seller: "CraftShoes"
  },
  {
    id: "6", name: "iPhone 15 Pro", nameFr: "iPhone 15 Pro",
    price: 3200000, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    category: "electronics", rating: 4.7, reviews: 203, badge: "hot", country: "kenya",
    description: "Apple iPhone 15 Pro with A17 chip, titanium design.",
    descriptionFr: "Apple iPhone 15 Pro avec puce A17, design en titane.", stock: 15, seller: "iStore Nairobi"
  },
  {
    id: "7", name: "Maasai Beaded Necklace", nameFr: "Collier en Perles Maasaï",
    price: 8000, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400",
    category: "fashion", rating: 4.9, reviews: 178, badge: "new", country: "kenya",
    description: "Authentic Maasai beaded necklace, handmade by Maasai women.",
    descriptionFr: "Collier en perles Maasaï authentique, fait à la main.", stock: 35, seller: "MaasaiCrafts"
  },
  {
    id: "8", name: "Kenyan Tea Collection", nameFr: "Collection de Thé Kenyan",
    price: 12000, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    category: "food", rating: 4.4, reviews: 95, country: "kenya",
    description: "Premium Kenyan tea collection, 5 varieties from the highlands.",
    descriptionFr: "Collection de thé kenyan premium, 5 variétés des hauts plateaux.", stock: 80, seller: "KenyaTea"
  },
  {
    id: "9", name: "Home Decor Basket Set", nameFr: "Ensemble Paniers Décoratifs",
    price: 28000, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400",
    category: "home", rating: 4.7, reviews: 56, badge: "new", country: "kenya",
    description: "Set of 3 handwoven decorative baskets, perfect for home styling.",
    descriptionFr: "Ensemble de 3 paniers décoratifs tissés à la main.", stock: 25, seller: "HomeKenya"
  },
  {
    id: "10", name: "Shea Butter Natural 500g", nameFr: "Beurre de Karité Naturel 500g",
    price: 18000, originalPrice: 22000, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400",
    category: "beauty", rating: 4.8, reviews: 134, badge: "sale", country: "burundi",
    description: "100% pure natural shea butter, unrefined and organic.",
    descriptionFr: "Beurre de karité 100% pur naturel, non raffiné et bio.", stock: 60, seller: "NaturalBI"
  },
  {
    id: "11", name: "Fertilizer NPK 50kg", nameFr: "Engrais NPK 50kg",
    price: 65000, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    category: "agriculture", rating: 4.2, reviews: 38, country: "burundi",
    description: "High quality NPK fertilizer for improved crop yields.",
    descriptionFr: "Engrais NPK de haute qualité pour de meilleurs rendements.", stock: 200, seller: "AgroBuja"
  },
  {
    id: "12", name: "Bluetooth Speaker", nameFr: "Haut-parleur Bluetooth",
    price: 45000, originalPrice: 55000, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    category: "electronics", rating: 4.4, reviews: 72, badge: "sale", country: "kenya",
    description: "Portable Bluetooth speaker with 12-hour battery life, waterproof.",
    descriptionFr: "Haut-parleur Bluetooth portable, 12h d'autonomie, étanche.", stock: 40, seller: "SoundKenya"
  },
];

export const flashDeals = products.filter(p => p.badge === "sale");
export const trendingBurundi = products.filter(p => p.country === "burundi").slice(0, 4);
export const popularKenya = products.filter(p => p.country === "kenya").slice(0, 4);
