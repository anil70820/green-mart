import ReduxProvider from "@/redux/provider";
import { ToastContainer } from "react-toastify";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Material Icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      try {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        }
      } catch (_) {}
    `,
          }}
        />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body data-new-gr-c-s-check-loaded="14.1270.0" data-gr-ext-installed="">
        <ReduxProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
