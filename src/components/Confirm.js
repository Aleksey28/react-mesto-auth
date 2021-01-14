import PopupWithForm from './PopupWithForm';
import { propsPopupWithConfirmForm } from '../utils/constants.js';
import React from "react";

export default function Confirm({ isOpen, isLoading, onClose, onSubmit }) {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <PopupWithForm
      title={propsPopupWithConfirmForm.title}
      name={propsPopupWithConfirmForm.name}
      submitStates={propsPopupWithConfirmForm.submitStates}
      isOpen={isOpen}
      isLoad={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
