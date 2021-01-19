import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import importedLogo from "../images/header-logo.svg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { apiObject } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Confirm from "./Confirm";
import Login from "./Login";
import SignUp from "./Register";
import InfoTooltip from "./InfoTooltip";
import { apiAuthObject } from "../utils/apiAuth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const history = useHistory();

  //Создаем стейты
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [infoTooltipProps, setInfoTooltipProps] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  //Загружаем данные карточек один раз при сборке
  useEffect(() => {
    apiObject
      .getCardList()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
  }, []);

  //Загружаем данные пользователя
  useEffect(() => {
    apiObject
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(console.log)
      .finally(() => {
      });
  }, []);

  //Проверяем токен в локальном хранилище
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      // здесь будем проверять токен
      apiAuthObject
        .tokenCheck({ jwt })
        .then(({ data }) => {
          setLoggedIn(true);
          setCurrentUserEmail(data.email);
        })
        .catch(console.log)
        .finally(() => {
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history])

  //Обработчик нажатия на аватарку
  const handleEditAvatarClick = () => {
    //Открываем попап редактирования аватара
    setIsEditAvatarPopupOpen(true);
  };

  //Обработчик нажатия на кнопку редактирования профиля
  const handleEditProfileClick = () => {
    //Открываем попап редактирования профиля
    setIsEditProfilePopupOpen(true);
  };

  //Обработчик нажатия на кнопку добавления новой карточки
  const handleAddPlaceClick = () => {
    //Открываем попап добавления новой карточки
    setIsAddPlacePopupOpen(true);
  };

  //Обработчик нажатия на карточку
  const handleCardClick = (card) => {
    //Открываем попап картинки
    setIsImagePopupOpen(true);
    //Устанавливаем выбранную карточку как текущую, для отображения в попапе
    setSelectedCard(card);
  };

  //Обработчик закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  //Обработчик обновления данных пользователя
  const handleUpdateUser = (data) => {
    //Отправляем новые данные на сервер
    setIsLoading(true);
    apiObject
      .setUserData(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Обработчик обновления аватара
  const handleUpdateAvatar = (data) => {
    //Отправляем новые данные
    setIsLoading(true);
    apiObject
      .setAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  //функция обработчик установки/снятия лайка
  const handleCardLike = (card) => {
    //Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    //Отправляем запрос в API и получаем обновленные данные карточки
    apiObject
      .toggleCardLike(card._id, !isLiked)
      .then((newCard) => {
        //формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((item) => (item._id === card._id ? newCard : item));

        //обновляем стейт
        setCards(newCards);
      })
      .catch(console.log);
  };

  //функция обработчик удаления карточки
  const handleCardDelete = () => {
    //Отправляем запрос на удаление карточки
    setIsLoading(true);
    apiObject
      .deleteCard(selectedCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== selectedCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Обработчик добавления новой карточки
  const handleAddPlace = (card) => {
    //Отправляем запрос на добавление карточки
    setIsLoading(true);
    apiObject
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Обработчик нажатия на кнопку удаления
  const handleClickCardDelete = (card) => {
    //Указываем текущую карточку, чтобы её удалить
    setSelectedCard(card);
    //Закрываем попап
    setIsConfirmOpen(true);
  };

  const handleClickOnButton = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  //Обработчик регистрации
  const handleRegistration = (data) => {
    setIsLoading(true);
    apiAuthObject.signUp(data)
      .then((res) => {
        setInfoTooltipProps({
          success: true,
          message: "Вы успешно зарегистрировались!",
        });
      })
      .catch((error) => {
        setInfoTooltipProps({
          success: false,
          message: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Обработчик авторизации
  const handleAuthorization = (data) => {
    setIsLoading(true);
    apiAuthObject.signIn(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
        return res;
      })
      .then((res) => {
        setLoggedIn(true);
        setCurrentUserEmail(data.email);
      })
      .catch((error) => {
        setInfoTooltipProps({
          success: false,
          message: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Эффект открытия попапа с информацией после действий регистрации и авторизации
  useEffect(() => {
    if (Object.keys(infoTooltipProps).length > 0) {
      setIsInfoTooltipOpen(true);
    }
  }, [infoTooltipProps]);

  const handleExit = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/login');
  }

  return (
    <CurrentUserContext.Provider value={{ ...currentUser, email: currentUserEmail }}>
      <div className="page" onKeyDown={handleClickOnButton}>
        <Header logo={importedLogo} loggedIn={loggedIn} onExit={handleExit}/>
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleClickCardDelete}
            />
            <Footer/>
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              isLoading={isLoading}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              isLoading={isLoading}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              isLoading={isLoading}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
            <Confirm
              isOpen={isConfirmOpen}
              isLoading={isLoading}
              onClose={closeAllPopups}
              onSubmit={handleCardDelete}
            />
          </ProtectedRoute>
          <Route path="/sign-in">
            <Login onAuthorization={handleAuthorization}/>
          </Route>
          <Route path="/sign-up">
            <SignUp onRegistration={handleRegistration}/>
          </Route>
        </Switch>
        <InfoTooltip isSuccess={infoTooltipProps.success}
                     message={infoTooltipProps.message}
                     isOpen={isInfoTooltipOpen}
                     onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
