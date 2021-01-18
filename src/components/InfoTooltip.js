import React from "react";
import failure from "../images/failure.svg";
import success from "../images/success.svg";

export default function InfoTooltip({ isSuccess, isOpen, onClose }) {

  const handleClickOnBackground = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={handleClickOnBackground}>
      <div className="popup__container popup__container_type_form popup__container_align_center">
        <button className="popup__btn popup__btn_action_close" type="button" onClick={onClose}/>
        <img src={isSuccess ? success : failure} alt="Результат авторизации" className="popup__info-icon"/>
        <h3 className="popup__title popup__title_align_center">{isSuccess
                                        ? "Вы успешно зарегистрировались!"
                                        : "Что-то пошло не так!\nПопробуйте ещё раз."}</h3>
      </div>
    </div>
  );
}
