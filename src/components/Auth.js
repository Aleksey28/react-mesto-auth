import React from "react";

export default function Auth({ title, submitStates, isLoading, children }) {
  return (
    <form className="auth">
      <p className="auth__title">{title}</p>
      {children}
      <button className="auth__submit">{!isLoading ? submitStates.static : submitStates.loading}</button>
    </form>
  );
}
