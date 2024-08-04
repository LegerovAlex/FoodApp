import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "../Login/Login.module.scss";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userAction } from "../../store/user.slice";
import { RegisterForm } from "../../interface/registerForm.inteface";

export function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { jwt, registerErrorMessage } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userAction.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;

    const email = target.email.value;
    const password = target.password.value;
    const name = target.name.value;
    dispatch(register({ email, password, name }));
  };

  return (
    <div className={styles.login}>
      <Headling>Registration</Headling>
      {registerErrorMessage ? (
        <div className={styles.login__error}>{registerErrorMessage}</div>
      ) : null}
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.login__field}>
          <label className={styles.login__label} htmlFor="email">
            Your email
          </label>
          <Input name="email" id="email" placeholder="Email" />
        </div>
        <div className={styles.login__field}>
          <label className={styles.login__label} htmlFor="password">
            Your password
          </label>
          <Input name="password" id="password" placeholder="Password" />
        </div>
        <div className={styles.login__field}>
          <label className={styles.login__label} htmlFor="name">
            Your name
          </label>
          <Input name="name" id="name" placeholder="name" />
        </div>
        <Button size="big">Sign In</Button>
      </form>
      <div className={styles.login__register}>
        <div>Do u have acc?</div>
        <Link className={styles.login__links} to="/auth/login">
          Sign In
        </Link>
      </div>
    </div>
  );
}
