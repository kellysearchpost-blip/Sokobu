import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Star, SlidersHorizontal, X } from "lucide-react";

const ProductsPage = () => {
  const { t } = useApp();
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [minRating, setMinRating] = useState(0);
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [sort, setSort] = useState("newest");

  const query = searchParams.get("q")?.toLowerCase() || "";

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      if (query && !p.name.toLowerCase().includes(query) && !p.nameFr.toLowerCase().includes(query)) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (p.rating < minRating) return false;
      if (country && p.country !== country) return false;
      return true;
    });
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "popular") result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [query, selectedCategory, priceRange, minRating, country, sort]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">{t("Category", "Catégorie")}</h3>
        <div className="space-y-1">
          <button onClick={() => setSelectedCategory("")} className={`block w-full text-left text-sm px-2 py-1.5 rounded-md ${!selectedCategory ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
            {t("All", "Tout")}
          </button>
          {categories.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`block w-full text-left text-sm px-2 py-1.5 rounded-md ${selectedCategory === c.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              {c.icon} {t(c.name, c.nameFr)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">{t("Price Range", "Fourchette de Prix")}</h3>
        <Slider value={priceRange} onValueChange={setPriceRange} max={5000000} step={10000} className="mt-4" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{priceRange[0].toLocaleString()}</span>
          <span>{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">{t("Minimum Rating", "Note Minimum")}</h3>
        <div className="flex gap-1">
          {[0, 3, 4, 4.5].map(r => (
            <button key={r} onClick={() => setMinRating(r)} className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${minRating === r ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}>
              {r === 0 ? t("All", "Tout") : <><Star className="h-3 w-3 fill-current" />{r}+</>}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">{t("Country", "Pays")}</h3>
        <div className="flex gap-1">
          {[
            { value: "", label: t("All", "Tout") },
            { value: "burundi", label: "🇧🇮 Burundi" },
            { value: "kenya", label: "🇰🇪 Kenya" },
          ].map(c => (
            <button key={c.value} onClick={() => setCountry(c.value)} className={`rounded-full px-3 py-1 text-xs ${country === c.value ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">{t("Products", "Produits")}</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} {t("results", "résultats")}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium sm:hidden">
              <SlidersHorizontal className="h-3.5 w-3.5" /> {t("Filters", "Filtres")}
            </button>
            <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-full border bg-background px-3 py-1.5 text-xs outline-none">
              <option value="newest">{t("Newest", "Plus Récent")}</option>
              <option value="price-asc">{t("Price: Low to High", "Prix: Croissant")}</option>
              <option value="price-desc">{t("Price: High to Low", "Prix: Décroissant")}</option>
              <option value="popular">{t("Most Popular", "Plus Populaire")}</option>
            </select>
          </div>
        </div>

        {/* Mobile filter overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-background p-4 overflow-y-auto sm:hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{t("Filters", "Filtres")}</h2>
              <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
            </div>
            <FilterPanel />
            <button onClick={() => setShowFilters(false)} className="mt-6 w-full rounded-full bg-primary py-2.5 text-sm font-bold text-primary-foreground">
              {t("Apply Filters", "Appliquer")}
            </button>
          </div>
        )}

        <div className="flex gap-8">
          <aside className="hidden sm:block w-56 flex-shrink-0">
            <FilterPanel />
          </aside>
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-4xl">🛒</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{t("No products found", "Aucun produit trouvé")}</h3>
                <p className="text-sm text-muted-foreground">{t("Try adjusting your filters", "Essayez de modifier vos filtres")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default ProductsPage;
