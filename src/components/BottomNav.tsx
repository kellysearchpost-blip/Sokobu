import { Home, Grid3X3, ShoppingCart, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

const items = [
  { icon: Home, path: "/", label: "Home", labelFr: "Accueil" },
  { icon: Grid3X3, path: "/products", label: "Categories", labelFr: "Catégories" },
  { icon: ShoppingCart, path: "/cart", label: "Cart", labelFr: "Panier" },
  { icon: Heart, path: "/wishlist", label: "Wishlist", labelFr: "Favoris" },
  { icon: User, path: "/account", label: "Account", labelFr: "Compte" },
];

export function BottomNav() {
  const location = useLocation();
  const { cartCount, t } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur sm:hidden">
      <div className="flex items-center justify-around py-1.5">
        {items.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.path === "/cart" && cartCount > 0 && (
                <span className="absolute -right-0.5 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-secondary text-[8px] font-bold text-secondary-foreground">
                  {cartCount}
                </span>
              )}
              <span>{t(item.label, item.labelFr)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
