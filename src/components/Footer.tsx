import { useApp } from "@/contexts/AppContext";

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="border-t border-border bg-foreground text-background pb-20 sm:pb-0">
      <div className="container py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold">
              Soko<span className="text-primary">Bu</span>
            </h3>
            <p className="mt-2 text-sm text-background/70">
              {t("Shop Smart. Shop African.", "Achetez malin. Achetez africain.")}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">{t("Shop", "Boutique")}</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-background/70">
              <li>{t("All Products", "Tous les Produits")}</li>
              <li>{t("Flash Deals", "Ventes Flash")}</li>
              <li>{t("New Arrivals", "Nouveautés")}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">{t("Support", "Assistance")}</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-background/70">
              <li>{t("Help Center", "Centre d'aide")}</li>
              <li>{t("Returns", "Retours")}</li>
              <li>{t("Contact Us", "Nous Contacter")}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">{t("Payment Methods", "Modes de Paiement")}</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {["M-Pesa", "Lumicash", "Visa", "MC"].map(m => (
                <span key={m} className="rounded-md bg-background/10 px-2 py-1 text-xs">{m}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-background/20 pt-4 text-center text-xs text-background/50">
          © 2026 SokoBu. {t("All rights reserved.", "Tous droits réservés.")}
        </div>
      </div>
    </footer>
  );
}
