import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";
import useFetch from "../../hooks/use-fetch";

const AuthForm = () => {
  const { isLoading, sendRequest: fetchLoginData } = useFetch();
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [showPwd, setShowPwd] = useState(false);
  const emailRef = useRef();
  const pwdRef = useRef();

  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const showPwdHandler = () => {
    setShowPwd(prevState => !prevState);
  };

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
    setError(false);
    emailRef.current.value = "";
    pwdRef.current.value = "";
    setShowPwd(false);
  };

  const submitHandler = async event => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPwd = pwdRef.current.value;
    const loginData = await fetchLoginData({
      email: enteredEmail,
      password: enteredPwd,
      isLogin,
    });
    if (!loginData.ok) setError(loginData.error);
    console.log(loginData);
    // fetch("/api/sign-in", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: enteredEmail,
    //     password: enteredPwd,
    //     returnSecureToken: true,
    //     isLogin,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then(res => {
    //     setIsLoading(false);
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then(data => {
    //         throw new Error(
    //           data.error?.message ? data.error.message : "Authentication Failed"
    //         );
    //       });
    //     }
    //   })
    //   .then(data => {
    //     console.log(data);
    //     const expiresIn = +data.expiresIn;
    //     const expirationTime = new Date(
    //       new Date().getTime() + expiresIn * 1000
    //     ).toISOString();
    //     authCtx.login(data.idToken, expirationTime);
    //     router.replace("/");
    //   })
    //   .catch(error => {
    //     setIsErr(error.message);
    //   });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            ref={emailRef}
            className={classes.email}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <div className={classes.pwd}>
            <input
              type={showPwd ? "text" : "password"}
              id="password"
              required
              ref={pwdRef}
              className={classes.pwdInput}
            />
            <i
              onClick={showPwdHandler}
              className={`far fa-eye${showPwd ? "" : "-slash"}`}
            ></i>
          </div>
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <p>Sending Request...</p>
          ) : (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {error ? <p className={classes.error}>{error}</p> : ""}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;