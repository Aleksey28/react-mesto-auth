import React from "react";
import { NavLink } from "react-router-dom";
import { Route } from "react-router";

export default function Header({ logo }) {
  return (
    <header className="header">
      <a href="#0">
        <img src={logo} alt="Логотип страницы Место." className="header__logo"/>
      </a>
      <Route path="/sign-in">
        <NavLink to="/sign-up" className="header__nlink">Регистрация</NavLink>
      </Route>
      <Route path="/sign-up">
        <NavLink to="/sign-in" className="header__nlink">Войти</NavLink>
      </Route>
    </header>
  );
}
