import { useApp } from "@/contexts/AppContext";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryPill } from "@/components/CategoryPill";
import { categories, flashDeals, trendingBurundi, popularKenya } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Shield, Truck, RotateCcw, Headphones, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const { t } = useApp();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground text-primary-foreground">
        <div className="container relative z-10 py-12 md:py-20">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
              {t("Shop Smart.", "Achetez Malin.")}<br />
              <span className="text-secondary">{t("Shop African.", "Achetez Africain.")}</span>
            </h1>
            <p className="mt-4 text-sm text-primary-foreground/80 md:text-base">
              {t(
                "Discover thousands of products from Burundi, Kenya, and across East Africa. Best prices, secure payments, fast delivery.",
                "Découvrez des milliers de produits du Burundi, Kenya et d'Afrique de l'Est. Meilleurs prix, paiements sécurisés, livraison rapide."
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/90">
                {t("Shop Now", "Acheter")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/sell" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-6 py-3 text-sm font-bold transition-colors hover:bg-primary-foreground/10">
                {t("Sell on SokoBu", "Vendre sur SokoBu")}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200')] bg-cover bg-center opacity-10" />
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {categories.map(cat => <CategoryPill key={cat.id} category={cat} />)}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">🔥 {t("Flash Deals", "Ventes Flash")}</h2>
            <p className="text-sm text-muted-foreground">{t("Ends in 02:45:30", "Se termine dans 02:45:30")}</p>
          </div>
          <Link to="/products?deals=true" className="text-sm font-medium text-primary hover:underline">
            {t("View All", "Voir Tout")}
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {flashDeals.map(p => (
            <div key={p.id} className="w-44 flex-shrink-0 md:w-52">
              <ProductCard product={p} showCountdown />
            </div>
          ))}
        </div>
      </section>

      {/* Trending Burundi */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">{t("Trending in Burundi 🇧🇮", "Tendances au Burundi 🇧🇮")}</h2>
          <Link to="/products?country=burundi" className="text-sm font-medium text-primary hover:underline">{t("View All", "Voir Tout")}</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trendingBurundi.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Popular Kenya */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">{t("Popular in Kenya 🇰🇪", "Populaire au Kenya 🇰🇪")}</h2>
          <Link to="/products?country=kenya" className="text-sm font-medium text-primary hover:underline">{t("View All", "Voir Tout")}</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {popularKenya.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border bg-muted">
        <div className="container py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Shield, title: t("Secure Payments", "Paiements Sécurisés"), desc: t("256-bit SSL encryption", "Chiffrement SSL 256 bits") },
              { icon: Truck, title: t("Fast Delivery", "Livraison Rapide"), desc: t("Across East Africa", "Partout en Afrique de l'Est") },
              { icon: RotateCcw, title: t("Easy Returns", "Retours Faciles"), desc: t("7-day return policy", "Politique de retour 7 jours") },
              { icon: Headphones, title: t("24/7 Support", "Support 24/7"), desc: t("We're always here", "Toujours disponible") },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2.5">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-secondary">
        <div className="container py-10 text-center">
          <Mail className="mx-auto h-8 w-8 text-secondary-foreground/80" />
          <h2 className="mt-3 text-xl font-bold text-secondary-foreground">
            {t("Get the Best Deals in Your Inbox", "Recevez les Meilleures Offres")}
          </h2>
          <p className="mt-1 text-sm text-secondary-foreground/80">
            {t("Subscribe and save up to 50% on your first order!", "Abonnez-vous et économisez jusqu'à 50% !")}
          </p>
          <form
            onSubmit={e => { e.preventDefault(); toast.success(t("Subscribed!", "Abonné !")); setEmail(""); }}
            className="mx-auto mt-4 flex max-w-md gap-2"
          >
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t("Enter your email", "Votre email")}
              className="flex-1 rounded-full bg-secondary-foreground/10 px-4 py-2.5 text-sm text-secondary-foreground placeholder:text-secondary-foreground/50 outline-none ring-secondary-foreground/30 focus:ring-2"
            />
            <button type="submit" className="rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background hover:bg-foreground/90 transition-colors">
              {t("Subscribe", "S'abonner")}
            </button>
          </form>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
