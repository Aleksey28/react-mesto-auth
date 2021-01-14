import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { propsPopupWithEditForm } from "../utils/constants";
import PopupWithForm, { Error, Field } from "./PopupWithForm";

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
  about: {
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
};

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
    >
      <Field name="name"
             type="text"
             className="popup__input popup__input_type_name"
             errorClassName="popup__input_type_error"
             placeholder="Название"
             maxLength={30}/>
      <Error name="name" className="popup__error" errorClassName="popup__error_visible"/>
      <Field name="about"
             type="text"
             className="popup__input popup__input_type_about"
             errorClassName="popup__input_type_error"
             placeholder="Описание профиля"
             maxLength={200}/>
      <Error name="link" className="popup__error" errorClassName="popup__error_visible"/>
    </PopupWithForm>
  );
}
