import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, t } = useApp();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6">
        <h1 className="text-xl font-bold text-foreground mb-4">{t("My Wishlist", "Mes Favoris")}</h1>
        {wishlistProducts.length === 0 ? (
          <div className="py-20 text-center">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground/30" />
            <h2 className="mt-4 text-lg font-bold text-foreground">{t("Your wishlist is empty", "Vos favoris sont vides")}</h2>
            <Link to="/products" className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground">
              {t("Discover Products", "Découvrir les Produits")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {wishlistProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default WishlistPage;
