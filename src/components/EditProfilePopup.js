import { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { propsPopupWithEditForm } from '../utils/constants.js';
import cn from 'classnames';
import { Field } from './Form';

const validators = {
  name: {
    required: (value) => {
      return value === '';
    },
    minLength: (value) => {
      return value.length < 2;
    },
  },
  about: {
    required: (value) => {
      return value === '';
    },
    minLength: (value) => {
      return value.length < 2;
    },
  },
};

const getErrorMessage = (typeOfError, value = '') => {
  let errorMessage = '';
  switch (typeOfError) {
    case 'required':
      errorMessage = 'Вы пропустили это поле.';
      break;
    case 'minLength':
      errorMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${value.length} символ.`;
      break;
    default:
      errorMessage = '';
  }
  return errorMessage;
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
      <Field name="name">
        {({ onChange, value, errors, ...inputProps }) => {
          const typeOfError =
            (!!errors && Object.keys(errors).find((key) => errors[key] === true)) || '';
          const errorMessage = getErrorMessage(typeOfError, value);
          return (
            <>
              <input
                type="text"
                className={cn('popup__input popup__input_type_name', {
                  popup__input_type_error: errorMessage.length,
                })}
                placeholder="Заголовок профиля"
                maxLength="40"
                onChange={(evt) => onChange(evt.target.value)}
                value={value}
                {...inputProps}
              />
              <span className={cn('popup__error', { popup__error_visible: errorMessage.length })}>
                {errorMessage}
              </span>
            </>
          );
        }}
      </Field>
      <Field name="about">
        {({ onChange, errors, ...inputProps }) => {
          const typeOfError =
            (!!errors && Object.keys(errors).find((key) => errors[key] === true)) || '';
          const errorMessage = getErrorMessage(typeOfError);

          return (
            <>
              <input
                type="text"
                className={cn('popup__input popup__input_type_about', {
                  popup__input_type_error: errorMessage.length,
                })}
                placeholder="Описание профиля"
                maxLength="200"
                onChange={(evt) => onChange(evt.target.value)}
                {...inputProps}
              />
              <span className={cn('popup__error', { popup__error_visible: errorMessage.length })}>
                {errorMessage}
              </span>
            </>
          );
        }}
      </Field>
    </PopupWithForm>
  );
}
