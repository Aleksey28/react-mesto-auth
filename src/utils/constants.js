export const propsPopupWithAddForm = {
  title: "Новое место",
  name: "add",
  submitStates: {
    static: "Создать",
    loading: "Создание...",
  },
};
export const propsPopupWithEditForm = {
  title: "Редактировать профиль",
  name: "edit",
  submitStates: {
    static: "Сохранить",
    loading: "Сохранение...",
  },
};
export const propsPopupWithEditAvatarForm = {
  title: "Обновить аватар",
  name: "edit-avatar",
  submitStates: {
    static: "Сохранить",
    loading: "Сохранение...",
  },
};
export const propsPopupWithConfirmForm = {
  title: "Вы уверены?",
  name: "confirm",
  submitStates: {
    static: "Да",
    loading: "Удаление...",
  },
};

export const propsAuthLogIn = {
  title: "Вход",
  name: "login",
  submitStates: {
    static: "Войти",
    loading: "Входим...",
  },
};

export const propsAuthRegister = {
  title: "Регистрация",
  name: "Register",
  submitStates: {
    static: "Зарегистрироваться",
    loading: "Регистрируемся...",
  },
};

export const apiSettings = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
  headers: {
    authorization: "fcd9a632-5cad-436c-b58e-4c80d498006a",
    "Content-Type": "application/json",
  },
};

export const apiSettingsAuth = {
  baseUrlAuth: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
};


