import PopupWithForm from './PopupWithForm';
import { propsPopupWithConfirmForm } from '../utils/constants.js';

export default function Confirm({ isOpen, isLoading, onClose, onSubmit }) {
  const handleSubmit = (evt) => {
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
