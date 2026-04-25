import { Heart, ShoppingCart, Star } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Product } from "@/data/mockData";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  product: Product;
  showCountdown?: boolean;
}

export function ProductCard({ product, showCountdown }: Props) {
  const { formatPrice, addToCart, toggleWishlist, isInWishlist, t, language } = useApp();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    toast.success(t("Added to cart!", "Ajouté au panier !"));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast(wishlisted ? t("Removed from wishlist", "Retiré des favoris") : t("Added to wishlist", "Ajouté aux favoris"));
  };

  const badgeColors = {
    sale: "bg-secondary text-secondary-foreground",
    hot: "bg-destructive text-destructive-foreground",
    new: "bg-primary text-primary-foreground",
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-card shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          {product.badge && (
            <span className={`absolute left-2 top-2 rounded-full px-2.5 py-0.5 text-xs font-bold ${badgeColors[product.badge]}`}>
              {product.badge === "sale" ? t("Sale", "Promo") : product.badge === "hot" ? t("Hot", "Tendance") : t("New", "Nouveau")}
            </span>
          )}
          <button
            onClick={handleWishlist}
            className="absolute right-2 top-2 rounded-full bg-card/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-card"
          >
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
          </button>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-card-foreground line-clamp-2 min-h-[2.5rem]">
            {language === "fr" ? product.nameFr : product.name}
          </h3>
          <div className="mt-1 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
            <span className="text-xs font-medium text-card-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="ml-1.5 text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-primary p-1.5 text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
