import cn from 'classnames';
import { Form, Button } from './Form';

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
  return (
    <div className={cn(`popup popup_type_${name}`, { popup_opened: isOpen })} name={name}>
      <Form
        className="popup__container popup__container_type_form"
        name="container"
        onSubmit={onSubmit}
        validators={validators}
        defaultValues={defaultValues}
      >
        <button
          className="popup__btn popup__btn_action_close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <Button>
          {({ disabled }) => (
            <button
              className={cn('popup__btn', 'popup__btn_action_submit', {
                popup__btn__disabled: disabled,
              })}
              type="submit"
              disabled={disabled}
            >
              {!isLoad ? submitStates.static : submitStates.loading}
            </button>
          )}
        </Button>
      </Form>
    </div>
  );
}
