import { useContext } from 'react';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__btn profile__btn_action_edit-avatar" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар." className="profile__avatar" />
          <span className="profile__avatar-overlay"></span>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__btn profile__btn_action_edit" type="button" onClick={onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__btn profile__btn_action_add" type="button" onClick={onAddPlace}></button>
      </section>
      <section>
        <ul className="cards">
          {cards.map((item) => {
            return (
              <Card
                card={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                key={item._id}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
