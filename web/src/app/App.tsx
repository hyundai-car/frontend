import { Providers } from "@/app/providers";
import AppRouters from "@/app/routers";

function App() {
  return (
    <Providers>
      <AppRouters />
    </Providers>
  );
}

export default App;
