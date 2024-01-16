import React, { FC } from "react";
import { Loader } from "../Loader/Loader";
import { ApolloError } from "@apollo/client";

type Props = {
  isLoading: boolean,
  error: ApolloError | undefined,
  children: React.ReactNode,
  errorMessage: string | undefined,
}

export const QueryComponent: FC<Props> = ({
  isLoading,
  error,
  children,
  errorMessage
}) => {
  return (
    <>
    {isLoading ? (
      <Loader />
    ) : error ? (
      <div>Error loading {errorMessage}</div>
    ) : (
      children
    )}
    </>
  )
}
