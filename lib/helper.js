export const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  return adjExpirationTime - currentTime;
};

export const retriveStoredToken = () => {
  const localData = localStorage.getItem("token");

  if (!localData) return { initialToken: null, expirationTime: null };

  const { token, expirationTime } = JSON.parse(localStorage.getItem("token"));

  const remainingTime = calculateRemainingTime(expirationTime);

  if (remainingTime < 60000) {
    localStorage.removeItem("token");
    return { initialToken: null, expirationTime: null };
  }
  return { initialToken: token, expirationTime };
};

