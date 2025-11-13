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

  const handleFABClick = () => {
    // Navigate to add new bill page
    router.push("/add-bill");
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-6"
    >
      <div className="flex items-center gap-3">
        {/* Main pill navigation */}
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
                    className="absolute inset-0 bg-primary rounded-full"
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

        {/* Floating Action Button - iOS Blue Style */}
        <motion.button
          onClick={handleFABClick}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
          whileHover={{ scale: 1.15, y: -4 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-primary-600 to-primary-700 text-white shadow-2xl shadow-primary/50 flex items-center justify-center group relative"
        >
          {/* Plus Icon */}
          <motion.div
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </motion.div>

          {/* Pulse animation ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
