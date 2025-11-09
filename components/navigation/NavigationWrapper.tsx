"use client";

import { usePathname } from "next/navigation";
import CompactFloatingNav from "./CompactFloatingNav";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/auth"];

export default function NavigationWrapper() {
  const pathname = usePathname();

  // Check if current route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + "/")
  );

  // Don't show navigation on public routes
  if (isPublicRoute) return null;

  return <CompactFloatingNav />;
}
