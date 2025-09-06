import { Poppins } from "next/font/google";
import { Pacifico } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "EcoFinds",
  description: "Sustainable Second-Hand Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${pacifico.variable}`}>
      <body suppressHydrationWarning className={`${poppins.className}`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
