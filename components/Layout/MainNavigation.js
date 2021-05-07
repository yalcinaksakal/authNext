import Link from "next/link";

import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const logoutHanler = () => {
    logout();
  };
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link className={classes.active} href="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logoutHanler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
