import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateRemainingTime, retriveStoredToken } from "../../lib/helper";
import { clearLogoutTimer, setLogoutTimer } from "../../store/auth-actions";
import { authActions } from "../../store/auth-slice";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(state => state.auth);

  useEffect(() => {
    const { initialToken, expirationTime } = retriveStoredToken();
    if (initialToken) {
      dispatch(authActions.login({ token: initialToken, expirationTime }));
      const remainingTime = calculateRemainingTime(expirationTime);
      dispatch(setLogoutTimer(remainingTime));
    }
  }, [dispatch, retriveStoredToken, calculateRemainingTime]);

  const logoutHanler = () => {
    dispatch(authActions.logout());
    clearLogoutTimer();
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Auth</div>
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
