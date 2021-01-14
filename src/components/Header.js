export default function Header({ logo }) {
  return (
    <header className="header">
      <a href="#0">
        <img src={logo} alt="Логотип страницы Место." className="header__logo" />
      </a>
    </header>
  );
}
