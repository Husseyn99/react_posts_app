import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context";

import Button from "../Button/Button";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const { setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <div className={styles.navbar}>
      <Button onClick={logout}>Выйти</Button>
      <div className={styles.navbar__links}>
        <Link to="/about">О приложении</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
};

export default Navbar;
