import { useSelector } from "react-redux";
import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  const { loginType, userName } = useSelector(state => state.auth);

  return (
    <section className={classes.profile}>
      <h1>{userName}</h1>
      <p>Your User Profile</p>
      {loginType === "user" ? (
        <ProfileForm />
      ) : (
        <p>You used your Google account to sign in.</p>
      )}
    </section>
  );
};

export default UserProfile;
