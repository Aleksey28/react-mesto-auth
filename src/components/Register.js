import React from "react";
import Auth from "./Auth";
import { propsAuthRegister } from "../utils/constants";
import { NavLink } from "react-router-dom";

const validators = {
  email: {
    required: (value) => {
      return {
        valid: !!value,
        message: "Вы пропустили это поле.",
      };
    },
    minLength: (value) => {
      return {
        valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: `Некорректный e-mail`,
      };
    },
  },
  password: {
    required: (value) => {
      return {
        valid: !!value,
        message: "Вы пропустили это поле.",
      };
    },
    minLength: (value) => {
      return {
        valid: value.length > 2,
        message: `Минимальное количество символов: 8. Длина текста сейчас: ${value.length} символ.`,
      };
    },
  },
};

const inputsList = [
  { name: "email", placeholder: "Email" },
  { name: "password", placeholder: "Пароль" },
];

export default function Register() {
  return (
    <Auth name={propsAuthRegister.name}
          title={propsAuthRegister.title}
          submitStates={propsAuthRegister.submitStates}
          isLoading={false}
          validators={validators}
          inputsList={inputsList}
          onSubmit={() => { console.log("message");}}>
      <NavLink to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</NavLink>
    </Auth>
  );
}
