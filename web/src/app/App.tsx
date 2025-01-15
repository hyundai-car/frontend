import { Providers } from "@/app/providers";
import AppRouters from "@/app/providers/RouterProvider";

function App() {
  return (
    <Providers>
      <AppRouters />
    </Providers>
  );
}

export default App;