import { ApolloProvider } from "@apollo/client";
import React, { FC } from "react"
import { client } from "./client";

type Props = {
  children: React.ReactNode;
}

export const AppProvider:FC<Props> = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);