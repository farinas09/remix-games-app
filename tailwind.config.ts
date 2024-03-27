import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      backgroundColor: {
        primary: {
          light: "#FFFFFF", // Color primario en modo claro
          dark: "#111827", // Color primario en modo oscuro
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"], // Habilitar la variante dark para el color de fondo
    },
  },
  plugins: [],
} satisfies Config;
