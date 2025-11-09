"use client";

import { motion } from "framer-motion";
import { Home, FileText, Users, Activity, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  isPrimary?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: FileText, label: "Bills", href: "/bills" },
  { icon: Plus, label: "Add", href: "/bills/new", isPrimary: true }, // IN THE MIDDLE!
  { icon: Users, label: "Friends", href: "/friends" },
  { icon: Activity, label: "Activity", href: "/activity" },
];

export default function CompactFloatingNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (href: string) => {
    // Optional: Add haptic feedback for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    router.push(href);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-black/10 dark:shadow-black/40"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const isPrimary = item.isPrimary;

          return (
            <motion.button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`relative rounded-full transition-colors ${
                isPrimary ? "p-3" : "p-2.5"
              }`}
              whileHover={{ scale: isPrimary ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active pill background for regular items */}
              {isActive && !isPrimary && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-emerald-500 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              {/* Primary button background (Plus button) */}
              {isPrimary && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-full shadow-lg shadow-emerald-500/40" />
                  {/* Pulse animation ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-emerald-500"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </>
              )}

              <Icon
                className={`relative z-10 w-5 h-5 transition-colors ${
                  isPrimary
                    ? "text-white"
                    : isActive
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
                strokeWidth={isPrimary ? 2.5 : 2}
              />
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
