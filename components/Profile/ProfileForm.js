import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/use-fetch";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPwdRef = useRef();
  const [showPwd, setShowPwd] = useState(false);
  const { isLoading, sendRequest: changePwd } = useFetch();
  const [changeResult, setChangeResult] = useState(null);

  const showPwdHandler = () => {
    setShowPwd(prevState => !prevState);
  };
  const { token } = useSelector(state => state.auth);
  const submitHandler = async e => {
    e.preventDefault();
    setChangeResult(null);
    const enteredPwd = newPwdRef.current.value;
    const changePwdResult = await changePwd({
      token,
      password: enteredPwd,
      changePwd: true,
    });
    setChangeResult({
      success: changePwdResult.ok,
      message: changePwdResult.ok
        ? "Your password has changed."
        : changePwdResult.error.includes("expired")
        ? "Your session needs to be refreshed to change password. Please logout and login again."
        : changePwdResult.error,
    });
    if (changePwdResult.ok) setTimeout(() => setChangeResult(null), 3000);
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      {changeResult?.success ? (
        ""
      ) : (
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <div>
            <input
              type={`${showPwd ? "text" : "password"}`}
              // wont validate pwd, just use minlength now
              id="new-password"
              ref={newPwdRef}
            />
            <i
              onClick={showPwdHandler}
              className={`far fa-eye${showPwd ? "" : "-slash"}`}
            ></i>
          </div>
        </div>
      )}

      <div className={classes.action}>
        {isLoading ? (
          "Sending request..."
        ) : changeResult?.success ? (
          ""
        ) : (
          <button>Change Password</button>
        )}
      </div>
      {changeResult ? (
        <div className={classes.message}>
          <p className={changeResult.success ? classes.success : classes.error}>
            {changeResult.message}
          </p>
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default ProfileForm;
