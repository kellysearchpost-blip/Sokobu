import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { useState } from "react";
import { Star, Minus, Plus, ShoppingCart, Zap, MessageCircle, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { formatPrice, addToCart, t, language } = useApp();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-4xl">😕</p>
          <h2 className="mt-2 text-lg font-bold">{t("Product not found", "Produit introuvable")}</h2>
          <Link to="/products" className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground">
            {t("Browse Products", "Parcourir les Produits")}
          </Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-4">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("Back to Products", "Retour aux Produits")}
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-xl bg-muted">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover aspect-square" />
          </div>

          {/* Details */}
          <div>
            {product.badge && (
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold mb-2 ${
                product.badge === "sale" ? "bg-secondary text-secondary-foreground" :
                product.badge === "hot" ? "bg-destructive text-destructive-foreground" :
                "bg-primary text-primary-foreground"
              }`}>
                {product.badge === "sale" ? t("Best Seller", "Meilleur Vendeur") : product.badge === "hot" ? t("Trending", "Tendance") : t("New Arrival", "Nouveauté")}
              </span>
            )}
            <h1 className="text-2xl font-bold text-foreground">{language === "fr" ? product.nameFr : product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} {t("reviews", "avis")})</span>
              <span className="text-sm text-muted-foreground">· {product.seller}</span>
            </div>

            <div className="mt-4">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="ml-2 text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="ml-2 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-bold text-destructive">-{discount}%</span>
                </>
              )}
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {language === "fr" ? product.descriptionFr : product.description}
            </p>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">{t("Quantity", "Quantité")}</span>
              <div className="flex items-center rounded-full border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2"><Plus className="h-4 w-4" /></button>
              </div>
              <span className="text-xs text-muted-foreground">{product.stock} {t("in stock", "en stock")}</span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => { addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }); toast.success(t("Added to cart!", "Ajouté au panier !")); }}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-bold text-secondary-foreground hover:bg-secondary/90 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" /> {t("Add to Cart", "Ajouter au Panier")}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
                <Zap className="h-4 w-4" /> {t("Buy Now", "Acheter")}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex gap-4 border-b">
            {(["desc", "specs", "reviews"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {tab === "desc" ? t("Description", "Description") : tab === "specs" ? t("Specifications", "Spécifications") : t("Reviews", "Avis")}
              </button>
            ))}
          </div>
          <div className="py-6">
            {activeTab === "desc" && <p className="text-sm text-muted-foreground leading-relaxed">{language === "fr" ? product.descriptionFr : product.description}</p>}
            {activeTab === "specs" && (
              <div className="space-y-2">
                {[["Category", product.category], ["Country", product.country], ["Seller", product.seller], ["Stock", `${product.stock}`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm border-b pb-2">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-foreground capitalize">{v}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {[
                  { name: "Jean P.", rating: 5, comment: "Excellent product, fast delivery!", date: "2 days ago" },
                  { name: "Alice M.", rating: 4, comment: "Good quality, would recommend.", date: "1 week ago" },
                ].map((r, i) => (
                  <div key={i} className="rounded-xl border p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{r.name[0]}</div>
                      <div>
                        <span className="text-sm font-medium">{r.name}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`h-3 w-3 ${j < r.rating ? "fill-secondary text-secondary" : "text-muted"}`} />
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">{t("Related Products", "Produits Similaires")}</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} on SokoBu`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-[hsl(142,71%,37%)] px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 sm:bottom-6"
      >
        <MessageCircle className="h-5 w-5" /> {t("Chat with Seller", "Contacter le Vendeur")}
      </a>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default ProductDetailPage;
