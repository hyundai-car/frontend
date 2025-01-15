import { ErrorBoundaryProvider } from "@/app/providers/ErrorBoundaryProvider";
import { QueryClientProvider } from "@/app/providers/QueryClientProvider";
import { theme } from "@/app/styles/theme";
import { ThemeProvider } from "styled-components";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => (
  <QueryClientProvider>
    <ErrorBoundaryProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ErrorBoundaryProvider>
  </QueryClientProvider>
);