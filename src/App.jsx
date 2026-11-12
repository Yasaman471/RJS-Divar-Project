import { Toaster } from "react-hot-toast";
import AuthPage from "./Pages/AuthPage";

function App() {
  return (
    <>
      <AuthPage />
      <h1>پروژه دیوار</h1>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
