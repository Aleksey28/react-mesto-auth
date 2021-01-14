export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_show ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_show">
        <button className="popup__btn popup__btn_action_close" type="button" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <h3 className="popup__caption">{card.name}</h3>
      </div>
    </div>
  );
}
