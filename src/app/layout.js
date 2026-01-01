"use client";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import TitleBar from "@/components/TitleBar";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import ReduxProvider from "@/redux/provider";

// export const metadata = {
//   title: "GreenMart - Fresh & Organic Grocery",
//   description: "Buy fresh fruits, vegetables, and groceries at GreenMart.",
//   keywords: [
//     "Grocery",
//     "Fresh Fruits",
//     "Vegetables",
//     "Organic Products",
//     "GreenMart",
//     "Online Grocery Store",
//   ],
//   openGraph: {
//     title: "GreenMart - Fresh & Organic Grocery",
//     description: "Buy fresh fruits, vegetables, and groceries at GreenMart.",
//     url: "https://green-mart-ebon.vercel.app/",
//     siteName: "Create Next App",
//     images: [
//       {
//         url: "https://green-mart-ebon.vercel.app/meta_img.webp",
//         width: 1200,
//         height: 630,
//         alt: "Open Graph Image",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     title: "GreenMart - Fresh & Organic Grocery",
//     description: "Buy fresh fruits, vegetables, and groceries at GreenMart.",
//     images: ["https://green-mart-ebon.vercel.app/meta_img.webp"],
//   },
// };

export default function RootLayout({ children }) {
  const path = usePathname();
  const pathname = ["/auth", "/orders"];
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {!pathname.includes(path) && <TitleBar />}
          {!pathname.includes(path) && <Header />}
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
