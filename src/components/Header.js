import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Route } from "react-router";
import cn from "classnames";

export default function Header({ logo, isLogin = true }) {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleClickOnSwitch = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <header className={cn("header", {header_compact: isLogin})}>
      <a href="#0">
        <img src={logo} alt="Логотип страницы Место." className="header__logo"/>
      </a>
      <div className={cn("header__navbar", { header__navbar_vertical: isLogin, header__navbar_hidden: isLogin && !menuIsOpen })}>
        <Route exact path="/">
          <p className="header__email">Email</p>
          <NavLink to="/sign-up" className="header__nlink header__nlink_type_exit">Выйти</NavLink>
        </Route>
        <Route path="/sign-in">
          <NavLink to="/sign-up" className="header__nlink">Регистрация</NavLink>
        </Route>
        <Route path="/sign-up">
          <NavLink to="/sign-in" className="header__nlink">Войти</NavLink>
        </Route>
      </div>
      {isLogin && <button className={cn(
        "header__btn",
        { header__btn_type_close: menuIsOpen, header__btn_type_open: !menuIsOpen },
      )} onClick={handleClickOnSwitch}/>}
    </header>
  );
}
