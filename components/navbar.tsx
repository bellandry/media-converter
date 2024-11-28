"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import useOpenSheetStore from "@/store/use-open-sheet-store";
import { motion } from "framer-motion";
import { Github, Gitlab, Linkedin, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { LanguageSwitcher } from "./language-switcher";

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const navItems = t("navItems");
  const { isOpen, setIsOpen } = useOpenSheetStore();

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href.startsWith("/#")) {
      // Check if we're on the home page and the hash matches
      if (pathname === "/" && typeof window !== "undefined") {
        const hash = window.location.hash;
        return hash === href;
      }
      return false;
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold bg-neutral-950 dark:bg-white text-neutral-100 dark:text-neutral-900 rounded-md p-1 flex gap-1 items-center pl-2"
        >
          Format
          <span className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-sm p-1">
            Flow
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
        {(navItems as { name: string; href: string }[]).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "transition-colors",
                isActiveLink(item.href)
                  ? "text-foreground font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background/60 backdrop-blur-sm flex flex-col justify-between">
              <div className="flex flex-col gap-4 mt-8">
                {(navItems as { name: string; href: string }[]).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={setIsOpen}
                    className={cn(
                      "transition-colors",
                      isActiveLink(item.href)
                        ? "text-foreground font-medium"
                        : "text-neutral-600 hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                href="https://github.com/bellandry/flow-format"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Button className="bg-neutral-950 dark:bg-white rounded-full" size={"lg"}>
                    <Github className="h-5 w-5" />
                    Github Repo
                </Button>
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/bellandry"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://gitlab.com/bellandry.work"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Gitlab className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://linkedin.com/in/bellandry"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
