import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "@/context/AppContext";

import ApolloProvider from "@/components/Providers/ApolloProvider";
import Header from "@/components/Header/Header";
import RenderFooter from "./_renderFooter";
import { Suspense } from "react";
import Loading from "@/components/Loading/Loading";

export const metadata: Metadata = {
  title: "Tea Shop",
  description: "Your favorite tea shop. Brewed with Care, Sipped with Joy",
  icons: {
    icon: "/tea-shop-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider>
          <AppProvider>
            <ToastContainer className="h-0" />
            <div className="bg-[#F5F5F5] min-h-dvh flex flex-col justify-between">
              <header className="App-header">
                <Header />
              </header>

              <Suspense fallback={<Loading loadingMessage="Loading..." />}>
                {children}
              </Suspense>

              <RenderFooter />
            </div>
          </AppProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
