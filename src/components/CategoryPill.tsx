import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Category } from "@/data/mockData";

export function CategoryPill({ category }: { category: Category }) {
  const { language } = useApp();
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="flex flex-shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
    >
      <span>{category.icon}</span>
      <span>{language === "fr" ? category.nameFr : category.name}</span>
    </Link>
  );
}
