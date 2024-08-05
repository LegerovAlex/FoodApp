import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Login.module.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getLogin, userAction } from "../../store/user.slice";
import { LoginFormState } from "../../interface/loginFormState.interface";

export function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { jwt, loginErrorMessage } = useSelector(
    (state: RootState) => state.user
  );

const [formState, setFormState] = useState<LoginFormState>({
  values:{
    email:"",
    password:"",

  }, 
  errors: {
    email:null,
    password:null,
  }
})



const handleChange = (event: ChangeEvent<HTMLInputElement>)=> {
  const {name, value} = event.target
  setFormState((prevState)=> ({
   ...prevState,
   values: {
     ...prevState.values,
     [name]: value
   },
   errors: {
     ...prevState.errors,
     [name]: null
   }
  }))
} 


  const validateEmail = (email:string)=> {
     return email ? null : "Email is requaried"
  }

  const validatePassword = (password:string)=> {
    return password ? null : "Password is requaried"
 }



  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userAction.clearLoginError());
    
    const emailError = validateEmail(formState.values.email)
    const passwordError = validatePassword(formState.values.password)
  
    if (emailError || passwordError) {
      setFormState((prevState) => ({
        ...prevState,
        errors: {
          email: emailError,
          password: passwordError,
        },
      }));
      return;
    }
     
    dispatch(getLogin({
      email: formState.values.email,
      password: formState.values.password,
    }));
     
  };

  return (
    <div className={styles.login}>
      <Headling>Вход</Headling>
      {loginErrorMessage ? (
        <div className={styles.login__error}>{loginErrorMessage}</div>
      ) : null}
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.login__field}>
          <label className={styles.login__label} htmlFor="email">
            Your email
          </label>
          <Input name="email" id="email" placeholder="Email" 
           onChange={handleChange}
           value={formState.values.email}
           error={formState.errors.email}
           isValid={!formState.errors.email}/>
        </div>
        <div className={styles.login__field}>
          <label className={styles.login__label} htmlFor="password">
            Your password
          </label>
          <Input name="password" id="password" placeholder="Password"
          onChange={handleChange}
          value={formState.values.password}
          error={formState.errors.password}
          isValid={!formState.errors.password}
          />
        </div>
        <Button size="big">Sign In</Button>
      </form>
      <div className={styles.login__register}>
        <div>No acc?</div>
        <Link className={styles.login__links} to="/auth/register">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
