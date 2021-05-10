export const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  return adjExpirationTime - currentTime;
};

export const retriveStoredToken = () => {
  const localData = localStorage.getItem("token");

  if (!localData) return { initialToken: null, expirationTime: null };

  const { token, expirationTime, userName, loginType } = JSON.parse(
    localStorage.getItem("token")
  );

  const remainingTime = calculateRemainingTime(expirationTime);

  //if remaining time < 1 minute, treat token as not valid
  // if (remainingTime < 60000) {
  //   localStorage.removeItem("token");
  //   return { initialToken: null, expirationTime: null };
  // }
  return { initialToken: token, expirationTime, userName, loginType };
};
