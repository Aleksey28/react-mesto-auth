import PopupWithForm from './PopupWithForm';
import { propsPopupWithEditAvatarForm } from '../utils/constants.js';
import { Field } from './Form';
import cn from 'classnames';

const validators = {
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
    case 'isUrl':
      errorMessage = `Введите адрес сайта.`;
      break;
    default:
      errorMessage = '';
  }
  return errorMessage;
};

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
    >
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
