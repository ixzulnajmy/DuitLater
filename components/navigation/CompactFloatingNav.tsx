"use client";

import { motion } from "framer-motion";
import { Home, FileText, Users, Activity, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: FileText, label: "Bills", href: "/bills" },
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
      // ⭐ KEY: Flex container wrapping BOTH pill and button, centered together
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3"
    >
      {/* Main Nav Pill - 4 icons */}
      <motion.div
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-black/10 dark:shadow-black/40"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <motion.button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="relative p-2.5 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active pill background */}
              {isActive && (
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

              <Icon
                className={`relative z-10 w-5 h-5 transition-colors ${
                  isActive ? "text-white" : "text-gray-600 dark:text-gray-400"
                }`}
                strokeWidth={2}
              />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Plus Button - SEPARATE but side by side */}
      <motion.button
        onClick={() => handleNavClick("/bills/new")}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-2xl shadow-emerald-500/50 flex items-center justify-center relative"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          whileHover={{ rotate: 90 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Plus className="w-6 h-6" strokeWidth={2.5} />
        </motion.div>

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
      </motion.button>
    </motion.div>
  );
}
