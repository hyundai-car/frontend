import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export const RouterProvider = ({ children }: Props) => (
  <Suspense fallback="Loading...">{children}</Suspense>
);
