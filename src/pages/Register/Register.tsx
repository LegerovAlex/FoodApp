import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "../Login/Login.module.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userAction } from "../../store/user.slice";
import { registerFormState } from "../../interface/RegisterformState.inteface";




export function Register() {
  
  const [formState, setFormState] = useState<registerFormState>({
    values:{
      name:"",
      password:"",
      email:"",
    },
    errors: {
      name:  null,
      email:  null,
      password: null
 
    }
  })


  const validateEmail = (email:string)=> {
          return email ? null : "Email is requaried"
  }
  
  

  const validateName = (name:string)=> {
    return name ? null : "Name is requaried"
}



const validatePassword = (password:string)=> {
  return password ? null : "Password is requaried"
}


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
    
    const emailError = validateEmail(formState.values.email)
    const nameError = validateName(formState.values.name)
    const passwordError = validatePassword(formState.values.password)


    if(emailError || nameError || passwordError) {
      setFormState((prevState)=> ({
        ...prevState,
        errors :{ 
          email:emailError,
          name:nameError,
          password:passwordError,
        } 
        
      }) )
      return
    }

    dispatch(register(formState.values))
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
          <Input name="email" id="email" placeholder="Email"   
            value={formState.values.email}
            error={formState.errors.email}
            isValid={!formState.errors.email}
            onChange={handleChange}

           />
       
        </div>
        <div className={styles.login__field}>
          <label className={styles.login__label} htmlFor="password"  >
            Your password
          </label>
          <Input name="password" id="password" placeholder="Password" 
          value={formState.values.password}
          error={formState.errors.password}
          isValid={!formState.errors.password}
          onChange={handleChange} 
         />
         
        </div>
        <div className={styles.login__field}>
          <label className={styles.login__label} htmlFor="name">
            Your name
          </label>
          <Input name="name" id="name" placeholder="name" 
          value={formState.values.name}
          error={formState.errors.name}
          onChange={handleChange}
          isValid={!formState.errors.name}
          />
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
