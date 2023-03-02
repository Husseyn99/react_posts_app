import React, { useContext } from "react";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";

import { AuthContext } from "../context";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);

  const login = (e) => {
    e.preventDefault();
    localStorage.setItem("auth", "true");
    setIsAuth(true);
  };

  return (
    <div>
      <h1>Авторизация</h1>
      <form>
        <Input placeholder="Введите логин" type="text" />
        <Input placeholder="Введите пароль" type="password" />
        <Button onClick={login}>Войти</Button>
      </form>
    </div>
  );
};

export default Login;
