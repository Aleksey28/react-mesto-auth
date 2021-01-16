import React from "react";
import Auth from "./Auth";
import { propsAuthLogIn } from "../utils/constants";

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
        message: `Минимальное количество символов: 2. Длина текста сейчас: ${value.length} символ.`,
      };
    },
  },
};

const inputsList = [
  { name: "email", placeholder: "Email", maxLength: 30 },
  { name: "password", placeholder: "Пароль", maxLength: 200 },
];

export default function LogIn() {
  return (
    <Auth name={propsAuthLogIn.name}
          title={propsAuthLogIn.title}
          submitStates={propsAuthLogIn.submitStates}
          isLoading={false}
          validators={validators}
          inputsList={inputsList}
          onSubmit={() => { console.log("message");}}/>
  );
}
