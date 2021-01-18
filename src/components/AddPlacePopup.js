import { propsPopupWithAddForm } from "../utils/constants";
import PopupWithForm from "./PopupWithForm";
import React from "react";

const validators = {
  name: {
    required: (value) => {
      return { valid: value !== "", message: "Вы пропустили это поле." };
    },
    minLength: (value) => {
      return {
        valid: value.length > 2,
        message: `Минимальное количество символов: 2. Длина текста сейчас: ${value.length} символ.`,
      };
    },
  },
  link: {
    required: (value) => {
      return { valid: value !== "", message: "Вы пропустили это поле." };
    },
    isUrl: (value) => {
      return { valid: /http(s?):\/\/[-\w.]{3,}\.[A-Za-z]{2,3}/.test(value), message: "Введите адрес сайта." };
    },
  },
};

const inputsList = [
  { name: "name", placeholder: "Название", maxLength: 30 },
  { name: "link", placeholder: "Ссылка на картинку" },
];

export default function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace }) {
  const handleSubmit = (values) => {
    onAddPlace(values);
  };

  return (
    <PopupWithForm
      title={propsPopupWithAddForm.title}
      name={propsPopupWithAddForm.name}
      isLoad={isLoading}
      isOpen={isOpen}
      submitStates={propsPopupWithAddForm.submitStates}
      validators={validators}
      onClose={onClose}
      onSubmit={handleSubmit}
      defaultValues={
        {
          name: "",
          link: "",
        }
      }
      inputsList={inputsList}
    />
  );
}
