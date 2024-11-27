export type Language = "en" | "fr";

export const translations = {
  en: {
    hero: {
      greeting: "Hi, I'm Landry Bella",
      role: "Full-Stack Web Developer",
      description:
        "Building exceptional web experiences with TypeScript, React and Next.js. 5+ years of crafting modern, performant applications.",
      cta: "Get in Touch",
    },
    navItems: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Privacy", href: "/privacy" },
    ],
    footer: {
      copyright: `© ${new Date().getFullYear()} Landry Bella. All rights reserved.`,
    },
  },
  fr: {
    hero: {
      greeting: "Hello! je suis Landry Bella",
      role: "Développeur Web Full-Stack",
      description:
        "Je crée des expériences web exceptionnelles avec TypeScript, React et Next.js. Plus de 5 ans d'expérience dans le développement d'applications modernes et performantes.",
      cta: "On se parle ?",
    },
    navItems: [
      { name: "Accueil", href: "/" },
      { name: "A propos", href: "/about" },
      { name: "Confidentialité", href: "/privacy" },
    ],
    footer: {
      copyright: `© ${new Date().getFullYear()} Landry Bella. Tous droits réservés.`,
    },
  },
};