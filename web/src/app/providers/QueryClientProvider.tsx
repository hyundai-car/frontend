import {
  QueryClient,
  Query,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

export const QueryClientProvider = ({ children }: Props) => {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        buttonPosition="bottom-left"
        errorTypes={[
          {
            name: "Error",
            initializer: errorInitializer(new Error("Error message")),
          },
          {
            name: "Axios Error",
            initializer: errorInitializer(new AxiosError("Axios error")),
          },
        ]}
      />
    </TanStackQueryClientProvider>
  );
};

function errorInitializer(error: Error) {
  return (query: Query) => {
    query.reset();
    return error;
  };
}
