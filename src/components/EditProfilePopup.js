import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { propsPopupWithEditForm } from "../utils/constants";
import PopupWithForm from "./PopupWithForm";

const validators = {
  name: {
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
  about: {
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
  { name: "name", placeholder: "Название", maxLength: 30 },
  { name: "about", placeholder: "Описание профиля", maxLength: 200 },
];

export default function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
  const handleSubmit = (values) => {
    onUpdateUser(values);
  };

  const currentUser = useContext(CurrentUserContext);

  return (
    <PopupWithForm
      title={propsPopupWithEditForm.title}
      name={propsPopupWithEditForm.name}
      isOpen={isOpen}
      isLoad={isLoading}
      submitStates={propsPopupWithEditForm.submitStates}
      validators={validators}
      onClose={onClose}
      onSubmit={handleSubmit}
      defaultValues={currentUser}
      inputsList={inputsList}
    />
  );
}
