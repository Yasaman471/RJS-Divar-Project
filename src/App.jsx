import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
