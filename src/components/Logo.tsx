import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface LogoProps {
  size?: "sm" | "md";
  asLink?: boolean;
}

/** Logo brand Zixpedia: kotak gradasi biru dengan huruf Z + wordmark */
export default function Logo({ size = "md", asLink = true }: LogoProps) {
  const box = cn(
    "grid place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 font-display font-bold text-white shadow-lg shadow-blue-600/25",
    size === "md" ? "size-9 text-lg" : "size-8 text-base"
  );

  const content = (
    <span className="inline-flex items-center gap-2.5">
      <span className={box}>Z</span>
      <span
        className={cn(
          "font-display font-bold tracking-tight text-slate-900 dark:text-white",
          size === "md" ? "text-xl" : "text-lg"
        )}
      >
        Zix<span className="text-blue-600 dark:text-sky-400">pedia</span>
      </span>
    </span>
  );

  if (!asLink) return content;
  return (
    <Link to="/" aria-label="Zixpedia - Beranda" className="shrink-0">
      {content}
    </Link>
  );
}
