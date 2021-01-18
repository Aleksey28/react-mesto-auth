import React, { createContext, useContext, useEffect, useState } from "react";

const FormContext = createContext({});

export default function Form({
  name,
  className,
  isOpen,
  validators,
  onSubmit,
  defaultValues,
  children,
}) {

  //Стейт всех значений формы
  const [formValues, setFormValues] = useState({});
  //Стейт отображения ошибок
  const [showErrors, setShowErrors] = useState({});
  //Стейт всех ошибок формы
  const [formErrors, setFormErrors] = useState({});
  //Создаем общий стейт для формы для включения/отключения submit
  const [isInvalid, setIsInvalid] = useState(true);

  //Устанавливаем значения формы в зависимости от дефолтного
  //Так как дефолтные значения могут прийти после отрисовки с сервера, подключаем эффект на их изменение
  useEffect(() => {
    setFormValues(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    if (!isOpen) {
      //Обнуляем стейт отображения ошибок
      setShowErrors({});
      //Устанавливаем дефолтные значения
      setFormValues(defaultValues);
    }
  }, [isOpen, defaultValues]);

  //Обработчик изменения любого инпута
  const onChangeInput = (name, value) => {
    //Обновляем стейт всех значений формы
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    //Добавляем эффект возникновения ошибки для пустых полей только после того, как пользователь уже вводил значения
    if (value !== defaultValues[name]) {
      setShowErrors((prevValues) => ({ ...prevValues, [name]: true }));
    }
  };

  //Обработчик submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    //Обнуляем стейт отображения ошибок
    setShowErrors({});
    onSubmit(formValues);
  };

  //Вызываем валидацию на каждый ввод в форму
  useEffect(() => {
    //Получаем все ключи
    const formKeys = Object.keys(formValues);

    //Проверяем валидацию всех значений формы
    const allErrors = formKeys
      .map((key) => {
        const valueByKey = formValues[key];
        if (!validators[key]) {
          return {};
        }
        const errors = Object.entries(validators[key])
          .map(([errorKey, validatorFn]) => {
            return { [errorKey]: validatorFn(valueByKey) };
          })
          .reduce((acc, item) => ({ ...acc, ...item }), {});
        return { [key]: errors };
      })
      .reduce((acc, item) => ({ ...acc, ...item }), {});

    //Устанавливаем стейт всех ошибок формы
    setFormErrors(allErrors);
  }, [formValues, validators]);

  //Определение общей валидности формы
  useEffect(() => {
    for (const fileKey in formErrors) {
      const keyErrors = formErrors[fileKey];
      for (const errorKey in keyErrors) {
        if (keyErrors[errorKey].valid === false) {
          return setIsInvalid(true);
        }
      }
    }
    setIsInvalid(false);
  }, [formErrors]);

  //Заполняем контекст формы
  const formContextValue = { onChangeInput, isInvalid, formErrors, showErrors, formValues };

  return (
    <form
      className={className}
      name={name}
      onSubmit={handleSubmit}
      noValidate
    >
      <FormContext.Provider value={formContextValue}>{children}</FormContext.Provider>
    </form>
  );
}

//Компонент поля формы
export function Field({ name, children }) {
  //Получаем значения контекста формы
  const { onChangeInput, formValues, formErrors, showErrors } = useContext(FormContext);

  //Обработчик изменения инпута
  const handleChangeInput = (e) => {
    onChangeInput(name, e.target.value);
  };

  //Проверяем наличие ошибок по полю
  const isInvalid = !!formErrors[name] &&
    Object.keys(formErrors[name]).some((key) => formErrors[name][key].valid === false);

  //Определяем ключ ошибки
  const errorKey = (!!formErrors[name] ?
                    Object.keys(formErrors[name]).find((key) => formErrors[name][key].valid === false) : "");

  //Определяем сообщение ошибки
  const errorMessage = !!errorKey ? formErrors[name][errorKey].message : "";

  return children({
    value: !formValues[name] ? "" : formValues[name],
    isInvalid: isInvalid && showErrors[name],
    errorMessage: errorMessage,
    onChange: handleChangeInput,
  });
}

export function Submit({ children }) {
  //Получаем значение валидности кнопки из формы
  const { isInvalid } = useContext(FormContext);
  return children({ disabled: isInvalid });
}
