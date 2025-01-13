import { ErrorBoundaryProvider } from "@/app/providers/ErrorBoundaryProvider";
import { QueryClientProvider } from "@/app/providers/QueryClientProvider";
type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => (
  <QueryClientProvider>
    <ErrorBoundaryProvider>{children}
    </ErrorBoundaryProvider>
  </QueryClientProvider>
);
