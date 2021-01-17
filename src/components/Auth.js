import React from "react";
import Form, { Field, Submit } from "./Form";
import cn from "classnames";

export default function Auth({ name, title, submitStates, isLoading, children, inputsList = [], validators, onSubmit }) {

  const fieldsList = inputsList.map((item) => (
      <Field key={`${name}-${item.name}`} name={item.name}>
        {
          ({ isInvalid, errorMessage, ...inputProps }) => (
            <>
              <input type="text"
                     className={
                       cn(`auth__input auth__input_type_${item.name}`, {
                         "auth__input_type_error": isInvalid,
                       })
                     }
                     {...item}
                     {...inputProps}/>
              <span className={cn("auth__error", { "auth__error_visible": isInvalid })}>
             {isInvalid ? errorMessage : ""}
            </span>
            </>
          )
        }
      </Field>
    ),
  );

  return (
    <Form
      className="auth"
      name="container"
      onSubmit={onSubmit}
      validators={validators}
      defaultValues={{
        email: "",
        password: "",
      }}
      isOpen={true}
    >
      <p className="auth__title">{title}</p>
      <fieldset className="auth__fieldset">
        {fieldsList}
      </fieldset>
      <Submit>
        {
          ({ disabled }) => (
            <button
              className={cn("auth__btn", "auth__btn_action_submit", {
                auth__btn_disabled: disabled,
              })}
              type="submit"
              disabled={disabled}
            >
              {!isLoading ? submitStates.static : submitStates.loading}
            </button>
          )
        }
      </Submit>
      {children}
    </Form>
  );
}
