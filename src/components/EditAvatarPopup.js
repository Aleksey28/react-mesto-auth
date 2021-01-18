import { propsPopupWithEditAvatarForm } from "../utils/constants";
import PopupWithForm from "./PopupWithForm";
import React from "react";

const validators = {
  link: {
    required: (value) => {
      return { valid: !!value, message: "Вы пропустили это поле." };
    },
    isUrl: (value) => {
      return { valid: /http(s?):\/\/[-\w.]{3,}\.[A-Za-z]{2,3}/.test(value), message: "Введите адрес сайта." };
    },
  },
};

const inputsList = [
  { name: "link", placeholder: "Ссылка на картинку" },
];

export default function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
  const handleSubmit = (values) => {
    onUpdateAvatar(values);
  };

  return (
    <PopupWithForm
      title={propsPopupWithEditAvatarForm.title}
      name={propsPopupWithEditAvatarForm.name}
      isLoad={isLoading}
      isOpen={isOpen}
      submitStates={propsPopupWithEditAvatarForm.submitStates}
      validators={validators}
      onClose={onClose}
      onSubmit={handleSubmit}
      defaultValues={{ link: "" }}
      inputsList={inputsList}
    />
  );
}
