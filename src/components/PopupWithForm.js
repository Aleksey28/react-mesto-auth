import cn from "classnames";
import React from "react";
import Form, { Field, Submit } from "./Form";

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
  inputsList = [],
  defaultValues,
}) {

  const handleClickOnBackground = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const fieldsList = inputsList.map((item) => (
      <Field key={`${name}-${item.name}`} name={item.name}>
        {
          ({ isInvalid, errorMessage, ...inputProps }) => (
            <>
              <input type="text"
                     className={
                       cn(`popup__input popup__input_type_${item.name}`, {
                         "popup__input_type_error": isInvalid,
                       })
                     }
                     {...item}
                     {...inputProps}/>
              <span className={cn("popup__error", { "popup__error_visible": isInvalid })}>
             {isInvalid ? errorMessage : ""}
            </span>
            </>
          )
        }
      </Field>
    ),
  );

  return (
    <div className={cn(`popup popup_type_${name}`, { popup_opened: isOpen })}
         data-name={name}
         onClick={handleClickOnBackground}
    >
      <Form
        className="popup__container popup__container_type_form"
        name="container"
        onSubmit={onSubmit}
        validators={validators}
        defaultValues={defaultValues}
        isOpen={isOpen}
      >
        <button
          className="popup__btn popup__btn_action_close"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        {fieldsList}
        <Submit>
          {
            ({ disabled }) => (
              <button
                className={cn("popup__btn", "popup__btn_action_submit", {
                  popup__btn__disabled: disabled,
                })}
                type="submit"
                disabled={disabled}
              >
                {!isLoad ? submitStates.static : submitStates.loading}
              </button>
            )
          }
        </Submit>
      </Form>
    </div>
  );
}


