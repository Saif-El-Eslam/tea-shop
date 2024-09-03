import Image from "next/image";
import Logo from "../../assets/tea-shop-logo.png";
import { Suspense } from "react";
import Loading from "@/components/Loading/Loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 gap-4 h-fit md:grid-cols-2 md:max-h-[80vh] max-w-[90vw] m-auto">
      <div className="order-2 md:order-1 lg:order-1 xl:order-1 max-h-[50vh] md:max-h-[80vh] overflow-auto">
        <Suspense fallback={<Loading loadingMessage="Loading..." />}>
          {children}
        </Suspense>
      </div>
      <div className="flex items-center justify-center max-h-[25vh] md:max-h-[80vh] md:order-2 md:rounded-lg bg-lightBeige">
        <Image
          src={Logo}
          alt="tea-shop-logo-auth"
          className="h-full block object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
