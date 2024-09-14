"use client"; // Required when using hooks in Next.js App Router

import { ApolloProvider as Provider } from "@apollo/client";
import client from "@/graphQL/apolloClient";

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider client={client}>{children}</Provider>;
}
