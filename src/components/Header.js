import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Route } from "react-router";
import cn from "classnames";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Header({ logo, loggedIn, onExit }) {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const handleClickOnSwitch = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleClickOnExit = () => {
    onExit();
  };


  debugger;
  return (
    <header className={cn("header", { header_compact: loggedIn })}>
      <a href="#0">
        <img src={logo} alt="Логотип страницы Место." className="header__logo"/>
      </a>
      <div className={cn(
        "header__navbar",
        { header__navbar_vertical: loggedIn, header__navbar_hidden: loggedIn && !menuIsOpen },
      )}>
        <Route exact path="/">
          <p className="header__email">{currentUser.email}</p>
          <NavLink to="/sign-in" className="header__nlink">
            <button className="header__btn header__btn_type_exit" onClick={handleClickOnExit}>
              Выйти
            </button>
          </NavLink>
        </Route>
        <Route path="/sign-in">
          <NavLink to="/sign-up" className="header__nlink">Регистрация</NavLink>
        </Route>
        <Route path="/sign-up">
          <NavLink to="/sign-in" className="header__nlink">Войти</NavLink>
        </Route>
      </div>
      {loggedIn && <button className={cn(
        "header__btn header__btn_type_switch",
        { header__btn_action_close: menuIsOpen, header__btn_action_open: !menuIsOpen },
      )} onClick={handleClickOnSwitch}/>}
    </header>
  );
}
