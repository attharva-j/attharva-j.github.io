// src/components/Navbar.jsx - Updated
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import GooeyNav from "./GooeyNav";
import ResumeButton from "./ResumeButton";
import ThemeToggle from "./ThemeToggle";
import "./GooeyNav.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const loc = useLocation();

  React.useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  return (
    <header className="border-b border-transparent py-4 relative z-50">
      <div className="container flex items-center justify-between">
        {/* Left side - logo and name */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center font-bold text-slate-800 text-lg">
            AJ
          </div>
          <div>
            <div className="text-lg font-semibold">Atharva Joshi</div>
            <div className="text-xs dark:text-slate-400 text-slate-600">
              GenAI Engineer & Data Scientist
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 relative">
          <GooeyNav>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} label={l.label} active={loc.pathname === l.to} />
            ))}
          </GooeyNav>

          <ThemeToggle />
          <ResumeButton variant="navbar" className="ml-4" />
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden relative z-[60]">
          <motion.button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md focus:outline-none relative"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <X size={26} color="white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Menu size={26} color="white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex justify-end"
          >
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-2xl"
            />

            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative w-[80%] max-w-sm h-full dark:bg-[rgba(10,15,25,0.95)] bg-[rgba(255,255,255,0.95)] backdrop-blur-3xl dark:border-l dark:border-[rgba(255,255,255,0.1)] border-l border-[rgba(0,0,0,0.1)] p-8 flex flex-col items-start"
            >
              <nav className="flex flex-col gap-6 mt-12 w-full">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-semibold dark:text-slate-100 text-slate-900 hover:text-white transition"
                  >
                    {l.label}
                  </Link>
                ))}
                
                <div className="mt-8 flex items-center gap-4">
                  <ThemeToggle />
                  <ResumeButton variant="primary" className="flex-1 justify-center" />
                </div>

                <div className="mt-8 flex gap-4 dark:text-slate-400 text-slate-600">
                  <a href="https://github.com/attharva-j" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  <a href="#" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                  <a href="#" target="_blank" rel="noreferrer">
                    Medium
                  </a>
                </div>
              </nav>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${
        active ? "text-white" : "dark:text-slate-300 text-slate-700 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}