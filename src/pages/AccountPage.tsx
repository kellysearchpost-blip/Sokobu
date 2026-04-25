import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/contexts/AppContext";
import { User, Package, Settings, LogOut, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const { t, language, setLanguage, currency, setCurrency } = useApp();

  const menuItems = [
    { icon: Package, label: t("My Orders", "Mes Commandes"), path: "/orders" },
    { icon: Settings, label: t("Settings", "Paramètres"), path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6 max-w-md">
        {/* Profile header */}
        <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">{t("Welcome!", "Bienvenue !")}</h2>
            <p className="text-sm text-muted-foreground">{t("Sign in to manage your account", "Connectez-vous pour gérer votre compte")}</p>
          </div>
        </div>

        {/* Login CTA */}
        <div className="mt-4 rounded-xl border bg-card p-4 text-center">
          <p className="text-sm text-muted-foreground mb-3">{t("Sign in with your phone number", "Connectez-vous avec votre numéro")}</p>
          <input placeholder={t("Phone number", "Numéro de téléphone")} className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2 mb-2" />
          <button className="w-full rounded-full bg-primary py-2.5 text-sm font-bold text-primary-foreground">{t("Send OTP", "Envoyer OTP")}</button>
        </div>

        {/* Menu */}
        <div className="mt-4 space-y-1">
          {menuItems.map(item => (
            <Link key={item.path} to={item.path} className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:bg-muted transition-colors">
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Preferences */}
        <div className="mt-4 rounded-xl border bg-card p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{t("Preferences", "Préférences")}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t("Language", "Langue")}</span>
            <button onClick={() => setLanguage(language === "en" ? "fr" : "en")} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
              {language === "en" ? "English" : "Français"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t("Currency", "Devise")}</span>
            <button onClick={() => setCurrency(currency === "BIF" ? "KES" : "BIF")} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
              {currency}
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default AccountPage;
