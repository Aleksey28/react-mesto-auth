import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Route } from "react-router";
import cn from "classnames";

export default function Header({ logo }) {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleClickOnSwitch = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <header className="header">
      <Route exact path="/">
        <div className={cn("header__menu header__menu_vertical", { header__menu_hidden: !menuIsOpen })}>
          <p className="header__email">Email</p>
          <NavLink to="/sign-up" className="header__nlink">Выйти</NavLink>
        </div>
      </Route>
      <div className="header__main">
        <a href="#0">
          <img src={logo} alt="Логотип страницы Место." className="header__logo"/>
        </a>
        <Route exact path="/">
          <div className="header__menu">
            <p className="header__email">Email</p>
            <NavLink to="/sign-up" className="header__nlink">Выйти</NavLink>
          </div>
          <button className={cn(
            "header__btn",
            { header__btn_type_close: menuIsOpen, header__btn_type_open: !menuIsOpen },
          )} onClick={handleClickOnSwitch}/>
        </Route>
        <Route path="/sign-in">
          <NavLink to="/sign-up" className="header__nlink">Регистрация</NavLink>
        </Route>
        <Route path="/sign-up">
          <NavLink to="/sign-in" className="header__nlink">Войти</NavLink>
        </Route>
      </div>
    </header>
  );
}
