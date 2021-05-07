import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(async credentials => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        body: JSON.stringify({
          returnSecureToken: true,
          ...credentials,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const fetchedData = await response.json();

      if (!response.ok)
        throw new Error(
          fetchedData.error?.message
            ? fetchedData.error.message
            : "Authentication Failed"
        );
      setIsLoading(false);
      if (credentials.isLogin) {
        const expiresIn = +fetchedData.expiresIn;
        const expirationTime = new Date(
          new Date().getTime() + expiresIn * 1000
        ).toISOString();
        return { ok: true, idToken: fetchedData.idToken, expirationTime };
      }
      return { ok: true, result: fetchedData };
    } catch (error) {
      setIsLoading(false);
      return { ok: false, error: error.message };
    }
  }, []);

  return {
    isLoading,
    sendRequest,
  };
};
export default useFetch;
