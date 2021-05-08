import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [isLoggedIn]);

  return <AuthForm />;
};

export default AuthPage;
