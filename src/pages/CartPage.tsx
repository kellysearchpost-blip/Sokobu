import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, formatPrice, cartTotal, t } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=cart, 1=delivery, 2=payment, 3=summary, 4=confirmation

  const [delivery, setDelivery] = useState({ name: "", phone: "", address: "", city: "", country: "burundi" });
  const [payment, setPayment] = useState("");

  if (step === 4) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-foreground">{t("Order Confirmed!", "Commande Confirmée !")}</h1>
          <p className="mt-2 text-muted-foreground">{t("Order #SB-2026-0042", "Commande #SB-2026-0042")}</p>
          <p className="text-sm text-muted-foreground mt-1">{t("Estimated delivery: 3-5 business days", "Livraison estimée : 3-5 jours ouvrés")}</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
            {t("Continue Shopping", "Continuer vos Achats")}
          </Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (cart.length === 0 && step === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <h2 className="mt-4 text-lg font-bold text-foreground">{t("Your cart is empty", "Votre panier est vide")}</h2>
          <p className="text-sm text-muted-foreground">{t("Start shopping to add items", "Commencez à faire vos achats")}</p>
          <Link to="/products" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground">
            {t("Browse Products", "Parcourir")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  const steps = [t("Cart", "Panier"), t("Delivery", "Livraison"), t("Payment", "Paiement"), t("Summary", "Résumé")];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6 max-w-2xl">
        {/* Progress */}
        {step > 0 && (
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.slice(1).map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step > i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {i + 1}
                </div>
                <span className="text-xs font-medium hidden sm:inline">{s}</span>
                {i < 2 && <div className={`h-0.5 w-8 ${step > i + 1 ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
        )}

        {step === 0 && (
          <>
            <h1 className="text-xl font-bold text-foreground mb-4">{t("Shopping Cart", "Panier")}</h1>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-card-foreground truncate">{item.name}</h3>
                    <p className="text-sm font-bold text-primary">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full border p-1"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full border p-1"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-destructive p-1"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border bg-card p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("Subtotal", "Sous-total")}</span>
                <span className="font-bold text-foreground">{formatPrice(cartTotal)}</span>
              </div>
              <button onClick={() => setStep(1)} className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
                {t("Proceed to Checkout", "Passer à la Caisse")}
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">{t("Delivery Information", "Informations de Livraison")}</h2>
            {(["name", "phone", "address", "city"] as const).map(field => (
              <div key={field}>
                <label className="text-sm font-medium text-foreground capitalize">{t(field, field)}</label>
                <input
                  value={delivery[field]}
                  onChange={e => setDelivery({ ...delivery, [field]: e.target.value })}
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
            ))}
            <div>
              <label className="text-sm font-medium text-foreground">{t("Country", "Pays")}</label>
              <select
                value={delivery.country}
                onChange={e => setDelivery({ ...delivery, country: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none"
              >
                <option value="burundi">🇧🇮 Burundi</option>
                <option value="kenya">🇰🇪 Kenya</option>
              </select>
            </div>
            <button onClick={() => setStep(2)} className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground">
              {t("Continue to Payment", "Continuer vers le Paiement")}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">{t("Payment Method", "Mode de Paiement")}</h2>
            {[
              { id: "mobile", icon: "📱", title: delivery.country === "kenya" ? "M-Pesa" : "Lumicash", desc: t("Mobile Money", "Argent Mobile") },
              { id: "card", icon: "💳", title: "Visa / Mastercard", desc: t("Credit or Debit Card", "Carte de Crédit ou Débit") },
              { id: "cod", icon: "🚪", title: t("Cash on Delivery", "Paiement à la Livraison"), desc: t("Pay when you receive", "Payez à la réception") },
              { id: "bank", icon: "🏦", title: t("Bank Transfer", "Virement Bancaire"), desc: t("Direct bank transfer", "Virement bancaire direct") },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setPayment(m.id)}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${payment === m.id ? "border-primary bg-accent" : "bg-card hover:bg-muted"}`}
              >
                <span className="text-2xl">{m.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </button>
            ))}
            <button onClick={() => { if (payment) setStep(3); else toast.error(t("Select a payment method", "Choisissez un mode de paiement")); }} className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground">
              {t("Review Order", "Vérifier la Commande")}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">{t("Order Summary", "Résumé de la Commande")}</h2>
            <div className="rounded-xl border bg-card p-4 space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>{t("Total", "Total")}</span>
                <span className="text-primary">{formatPrice(cartTotal)}</span>
              </div>
            </div>
            <button
              onClick={() => { clearCart(); setStep(4); }}
              className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t("Place Order", "Passer la Commande")} 🎉
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default CartPage;
