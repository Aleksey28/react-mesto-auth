import PopupWithForm from './PopupWithForm';
import cn from 'classnames';
import { propsPopupWithAddForm } from '../utils/constants.js';
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
  link: {
    required: (value) => {
      return value === '';
    },
    isUrl: (value) => {
      return !/http(s?):\/\/[-\w\.]{3,}\.[A-Za-z]{2,3}/.test(value);
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
    case 'isUrl':
      errorMessage = `Введите адрес сайта.`;
      break;
    default:
      errorMessage = '';
  }
  return errorMessage;
};

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
                placeholder="Название"
                maxLength="30"
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
      <Field name="link">
        {({ onChange, errors, ...inputProps }) => {
          const typeOfError =
            (!!errors && Object.keys(errors).find((key) => errors[key] === true)) || '';
          const errorMessage = getErrorMessage(typeOfError);

          return (
            <>
              <input
                type="url"
                className={cn('popup__input popup__input_type_link', {
                  popup__input_type_error: errorMessage.length,
                })}
                placeholder="Ссылка на картинку"
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
