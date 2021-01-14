import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import cn from 'classnames';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  };

  const handleClickLike = () => {
    onCardLike(card);
  };

  const handleClickDelete = () => {
    onCardDelete(card);
  };

  return (
    <li className="card">
      {currentUser._id === card.owner._id && (
        <button className="card__btn card__btn_action_trush" type="button" onClick={handleClickDelete}></button>
      )}

      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      <div className="card__footer">
        <h3 className="card__caption">{card.name}</h3>
        <div className="like card__like">
          <button
            className={cn('like__btn', { like__btn_active: card.likes.some((item) => item._id === currentUser._id) })}
            onClick={handleClickLike}
            type="button"
          ></button>
          <p className="like__count" title={card.likes.reduce((res, item) => (res += `${item.name}\n`), '')}>
            {card.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
}
