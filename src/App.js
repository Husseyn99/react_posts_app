import { useState, useEffect } from "react";

import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";

import { AuthContext } from "./context";

import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ isAuth, setIsAuth, isLoading, setIsLoading }}
      >
        <Navbar />
        <AppRouter />
      </AuthContext.Provider>
    </>
  );
}

export default App;
