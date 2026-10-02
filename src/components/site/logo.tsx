import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex min-h-11 items-center", className)}>
      <img
        src={logo}
        alt="Mr. Bubbles Laundry & Linen Specialist"
        width={556}
        height={360}
        className="h-16 w-auto md:h-20"
      />
    </Link>
  );
}
