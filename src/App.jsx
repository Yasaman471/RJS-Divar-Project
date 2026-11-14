import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Router from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import defaultOptions from "./configs/reactQuery";

const queryClient = new QueryClient({ defaultOptions });
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <Toaster position="top-center" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
