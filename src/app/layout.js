import "./globals.css";

export const metadata = {
  title: "GreenMart - Fresh & Organic Grocery",
  description: "Buy fresh fruits, vegetables, and groceries at GreenMart.",
  keywords: [
    "Grocery",
    "Fresh Fruits",
    "Vegetables",
    "Organic Products",
    "GreenMart",
    "Online Grocery Store",
  ],
  openGraph: {
    title: "GreenMart - Fresh & Organic Grocery",
    description: "Buy fresh fruits, vegetables, and groceries at GreenMart.",
    url: "https://green-mart-ebon.vercel.app/",
    siteName: "Create Next App",
    images: [
      {
        url: "https://green-mart-ebon.vercel.app/meta_img.webp",
        width: 1200,
        height: 630,
        alt: "Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "GreenMart - Fresh & Organic Grocery",
    description: "Buy fresh fruits, vegetables, and groceries at GreenMart.",
    images: ["https://green-mart-ebon.vercel.app/meta_img.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
