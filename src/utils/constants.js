export const propsPopupWithAddForm = {
  title: 'Новое место',
  name: 'add',
  submitStates: {
    static: 'Создать',
    loading: 'Создание...',
  },
};
export const propsPopupWithEditForm = {
  title: 'Редактировать профиль',
  name: 'edit',
  submitStates: {
    static: 'Сохранить',
    loading: 'Сохранение...',
  },
};
export const propsPopupWithEditAvatarForm = {
  title: 'Обновить аватар',
  name: 'edit-avatar',
  submitStates: {
    static: 'Сохранить',
    loading: 'Сохранение...',
  },
};
export const propsPopupWithConfirmForm = {
  title: 'Вы уверены?',
  name: 'confirm',
  submitStates: {
    static: 'Да',
    loading: 'Удаление...',
  },
};

export const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn_action_submit',
  inactiveButtonClass: 'popup__btn__disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const apiSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'fcd9a632-5cad-436c-b58e-4c80d498006a',
    'Content-Type': 'application/json',
  },
};
