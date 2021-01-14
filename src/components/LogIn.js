import React from "react";
import Auth from "./Auth";

export default function LogIn() {
  return (
    <Auth title={"Вход"} isLoading={false} submitStates={{static: "Войти", loading:"Входим..."}}>
      <input type="text" className="auth__input"/>
      <input type="text" className="auth__input"/>
    </Auth>
  );
}
