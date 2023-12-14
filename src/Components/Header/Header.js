import React from "react";

const Header = () => {
  return (
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <a className="nav-link" href="/">
          Inbox
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/sentmails">
          Sent Mails
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/login">
          Login
        </a>
      </li>
    </ul>
  );
};

export default Header;
