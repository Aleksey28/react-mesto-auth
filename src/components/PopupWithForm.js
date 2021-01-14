import cn from "classnames";
import React, { createContext, useContext, useEffect, useState } from "react";

const PopupWithFormContext = createContext({});

export default function PopupWithForm({
  title,
  name,
  isOpen,
  isLoad,
  submitStates,
  validators,
  onClose,
  onSubmit,
  children,
  defaultValues,
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
    onSubmit(formValues);
  };

  //Обработчик закрытия
  const handleClose = () => {
    //Обнуляем стейт отображения ошибок
    setShowErrors({});
    //Устанавливаем дефолтные значения
    setFormValues(defaultValues);
    //Закрываем
    onClose();
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
    <div className={cn(`popup popup_type_${name}`, { popup_opened: isOpen })} data-name={name}>
      <form
        className="popup__container popup__container_type_form"
        name="container"
        onSubmit={handleSubmit}
        noValidate
      >
        <button
          className="popup__btn popup__btn_action_close"
          type="button"
          onClick={handleClose}
        />
        <h2 className="popup__title">{title}</h2>
        <PopupWithFormContext.Provider value={formContextValue}>{children}</PopupWithFormContext.Provider>
        <button
          className={cn("popup__btn", "popup__btn_action_submit", {
            popup__btn__disabled: isInvalid,
          })}
          type="submit"
          disabled={isInvalid}
        >
          {!isLoad ? submitStates.static : submitStates.loading}
        </button>
      </form>
    </div>
  );
}

//Компонент поля формы
export function Field({ name, className = "", errorClassName = "", ...props }) {
  //Получаем значения контекста формы
  const { onChangeInput, formValues, formErrors, showErrors } = useContext(PopupWithFormContext);

  //Обработчик изменения инпута
  const handleChangeInput = (e) => {
    onChangeInput(name, e.target.value);
  };

  //Проверяем наличие ошибок по полю
  const isInvalid = !!formErrors[name] &&
    Object.keys(formErrors[name]).some((key) => formErrors[name][key].valid === false);

  return (
    <input name={name}
           value={!formValues[name] ? "" : formValues[name]}
           className={
             cn(className, {
               [errorClassName]: isInvalid && showErrors[name],
             })
           }
           onChange={handleChangeInput}
           {...props}/>
  );
}

//Компонент ошибки формы
export function Error({ name, className = "", errorClassName = "", ...props }) {
  //Получаем значения контекста формы
  const { formErrors, showErrors } = useContext(PopupWithFormContext);

  //Определяем ключ ошибки
  const errorKey = (!!formErrors[name] ?
                    Object.keys(formErrors[name]).find((key) => formErrors[name][key].valid === false) : "");

  //Определяем сообщение ошибки
  const errorMessage = !!errorKey ? formErrors[name][errorKey].message : "";

  return (
    <span className={cn(className, { [errorClassName]: showErrors[name] && errorMessage.length })} {...props}>
     {showErrors[name] && errorMessage}
    </span>
  );
}

