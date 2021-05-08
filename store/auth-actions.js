import { authActions } from "./auth-slice";

let logoutTimer;

export const setLogoutTimer = remainingTime => {
  return dispatch => {
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(
      () => dispatch(authActions.logout()),
      remainingTime
    );
    // console.log(remainingTime);
    // console.log("timer ok");
  };
};

export const clearLogoutTimer = () => {
  if (logoutTimer) clearTimeout(logoutTimer);
  //   console.log("timeout cleared");
};
