// 736076693286-uk39q439de824gkiu3h3m4kb3viurau4.apps.googleusercontent.com

import { useRef, useState } from "react";
import { useRouter } from "next/router";

import classes from "./AuthForm.module.css";
import useFetch from "../../hooks/use-fetch";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { setLogoutTimer } from "../../store/auth-actions";
import { calculateRemainingTime } from "../../lib/helper";
import GoogleLogin from "react-google-login";

const AuthForm = () => {
  const { isLoading, sendRequest: fetchLoginData } = useFetch();
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [successMsg, setSuccessMsg] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const emailRef = useRef();
  const pwdRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const showPwdHandler = () => {
    setShowPwd(prevState => !prevState);
  };

  const loginHandler = (
    token,
    expirationTime,
    userName,
    loginType = "user"
  ) => {
    dispatch(
      authActions.login({
        token,
        expirationTime,
        userName,
        loginType,
      })
    );
    dispatch(setLogoutTimer(calculateRemainingTime(expirationTime)));
    router.replace("/");
  };

  const responseGoogle = response => {
    if (response.error) {
     
      setError(response.error.replace(/_/g, " "));
      return;
    }
    const expiresIn = +response.tokenObj.expires_in;
    //fix 120 seconds to logout, if u want logout according to Firebase expiresIn time, use it instead of 120 below
    const expirationTime = new Date(
      new Date().getTime() + 120 * 1000
    ).toISOString();
    loginHandler(
      response.tokenId,
      expirationTime,
      response.profileObj.name,
      "google"
    );
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
    setError(false);
    const enteredEmail = emailRef.current.value;
    const enteredPwd = pwdRef.current.value;
    const loginData = await fetchLoginData({
      email: enteredEmail,
      password: enteredPwd,
      isLogin,
    });
    if (!loginData.ok) {
      setError(loginData.error);
      return;
    }
    if (!isLogin) {
      setSuccessMsg(loginData.result);
      setTimeout(() => {
        setSuccessMsg(null);
        setIsLogin(true);
      }, 2000);
      return;
    }

    loginHandler(
      loginData.idToken,
      loginData.expirationTime,
      enteredEmail.split("@")[0]
    );
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
            <>
              <button>{isLogin ? "Login" : "Create Account"}</button>
            </>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      <GoogleLogin
        render={renderProps => (
          <button
            className={classes.gbutton}
            onClick={() => {
              setError(false);
              renderProps.onClick();
            }}
          >
            Login with
            <i
              className="fab fa-google"
              style={{
                background: "transparent",
                color: "#4c8bf5",
                marginLeft: "5px",
              }}
            ></i>
          </button>
        )}
        clientId="736076693286-uk39q439de824gkiu3h3m4kb3viurau4.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
      {error ? <p className={classes.error}>{error}</p> : ""}
      {successMsg ? <p className={classes.success}>{successMsg}</p> : ""}
    </section>
  );
};

export default AuthForm;
