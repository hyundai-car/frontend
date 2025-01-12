import { ErrorBoundaryProvider } from "@/app/providers/ErrorBoundaryProvider";
import { QueryClientProvider } from "@/app/providers/QueryClientProvider";
import { RouterProvider } from "@/app/providers/RouterProvider";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => (
  <QueryClientProvider>
    <ErrorBoundaryProvider>
      <RouterProvider>{children}</RouterProvider>
    </ErrorBoundaryProvider>
  </QueryClientProvider>
);
