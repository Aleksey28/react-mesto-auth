import React from "react";
import Auth from "./Auth";

export default function SignUp() {
  return (
    <Auth title={"Регистрация"} isLoading={false} submitStates={{static: "Зарегистрироваться", loading:"Регистрируемся..."}}>
      <input type="text" className="auth__input"/>
      <input type="text" className="auth__input"/>
    </Auth>
  );
}
