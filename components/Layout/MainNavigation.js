import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateRemainingTime, retriveStoredToken } from "../../lib/helper";
import { clearLogoutTimer, setLogoutTimer } from "../../store/auth-actions";
import { authActions } from "../../store/auth-slice";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, remainingTime } = useSelector(state => state.auth);
  useEffect(() => {
    const { initialToken, expirationTime, userName } = retriveStoredToken();
    if (initialToken) {
      dispatch(
        authActions.login({ token: initialToken, expirationTime, userName })
      );
      const remainingTime = calculateRemainingTime(expirationTime);
      dispatch(setLogoutTimer(remainingTime));
    } else router.replace("/auth");
  }, [dispatch, retriveStoredToken, calculateRemainingTime]);

  const logoutHanler = () => {
    dispatch(authActions.logout());
    clearLogoutTimer();
    router.replace("/auth");
  };
  if (!remainingTime && isLoggedIn) logoutHanler();
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
                <div className={classes.counter}>
                  {remainingTime} seconds to logout
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
