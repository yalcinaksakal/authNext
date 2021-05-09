import { authActions } from "./auth-slice";

let logoutTimer;

export const setLogoutTimer = remainingTime => {
  return dispatch => {
    if (logoutTimer) clearInterval(logoutTimer);
    let count = remainingTime;
    const counter = () => {
      count--;
      dispatch(authActions.remainingTimeHandler());
      if (count < 0) {
        clearInterval(logoutTimer);
        dispatch(authActions.logout());
      }
    };
    logoutTimer = setInterval(counter, 1000);

    // if (logoutTimer) clearTimeout(logoutTimer);
    // logoutTimer = setTimeout(
    //   () => dispatch(authActions.logout()),
    //   remainingTime
    // );

    //  console.log(remainingTime);
    // console.log("timer ok");
  };
};

export const clearLogoutTimer = () => {
  if (logoutTimer) clearTimeout(logoutTimer);
  //   console.log("timeout cleared");
};
