import { Search, ShoppingCart, User, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useState } from "react";

export function Navbar() {
  const { currency, setCurrency, language, setLanguage, cartCount, t } = useApp();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-14 items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">S</div>
          <span className="hidden sm:inline text-lg font-bold text-foreground">
            Soko<span className="text-primary">Bu</span>
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t("Search products...", "Rechercher des produits...")}
              className="w-full rounded-full border border-input bg-background py-2 pl-9 pr-4 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Language */}
          <button
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className="hidden sm:flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            {language === "en" ? "FR" : "EN"}
          </button>

          {/* Currency */}
          <button
            onClick={() => setCurrency(currency === "BIF" ? "KES" : "BIF")}
            className="hidden sm:flex rounded-full px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {currency === "BIF" ? "KES" : "BIF"}
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative rounded-full p-2 hover:bg-muted transition-colors">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link to="/account" className="rounded-full p-2 hover:bg-muted transition-colors">
            <User className="h-5 w-5 text-foreground" />
          </Link>
        </div>
      </div>
    </header>
  );
}
