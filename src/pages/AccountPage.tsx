import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/contexts/AppContext";
import { User, Package, Settings, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AccountPage = () => {
  const { t, language, setLanguage, currency, setCurrency } = useApp();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleAuth = async (type: 'login' | 'signup') => {
    setLoading(true);
    const { error } = type === 'login' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ 
        title: type === 'login' ? t("Welcome back!", "Bon retour !") : t("Check your email", "Vérifiez vos emails"),
        description: type === 'signup' ? t("We sent a verification link.", "Lien de vérification envoyé.") : "" 
      });
    }
    setLoading(false);
  };

  const menuItems = [
    { icon: Package, label: t("My Orders", "Mes Commandes"), path: "/orders" },
    { icon: Settings, label: t("Settings", "Paramètres"), path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container py-6 max-w-md">
        {/* Profile header */}
        <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">{t("SokoBu Account", "Compte SokoBu")}</h2>
            <p className="text-sm text-muted-foreground">{t("Sign in to manage your account", "Connectez-vous pour gérer votre compte")}</p>
          </div>
        </div>

        {/* New Email/Password Login Section */}
        <div className="mt-4 rounded-xl border bg-card p-4 shadow-sm">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">{t("Login", "Connexion")}</TabsTrigger>
              <TabsTrigger value="signup">{t("Register", "S'inscrire")}</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-3">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" placeholder={t("Password", "Mot de passe")} value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button onClick={() => handleAuth('login')} className="w-full rounded-full bg-primary" disabled={loading}>
                {loading ? "..." : t("Login", "Se connecter")}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-3">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" placeholder={t("Create Password", "Créer un mot de passe")} value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button onClick={() => handleAuth('signup')} className="w-full rounded-full bg-primary" disabled={loading}>
                {loading ? "..." : t("Create Account", "Créer un compte")}
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Menu Items */}
        <div className="mt-4 space-y-2">
          {menuItems.map(item => (
            <Link key={item.path} to={item.path} className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:bg-muted transition-colors">
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Preferences */}
        <div className="mt-4 rounded-xl border bg-card p-4 space-y-3 shadow-sm">
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