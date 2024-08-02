import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import { Headling } from "../../components/Headling/Headling"
import Input from "../../components/Input/Input"
import styles from "./Login.module.scss"
import { FormEvent, useEffect } from "react"
import { LoginForm } from "../../interface/loginForm.interface"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { login } from "../../store/user.slice"



export function Login () {
     
    const dispatch  = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {jwt, error} = useSelector((state:RootState)=> state.user)

     useEffect(()=>{
       if(jwt) {
        navigate("/")
       }
     },[jwt,navigate])
   

    const submit = (e:FormEvent)=> {
        e.preventDefault()
        const target = e.target as typeof e.target & LoginForm
       
        const email = target.email.value;
        const password = target.password.value;
        dispatch(login({email, password}))
    }


    return(
        <div className={styles.login}>
            <Headling>Вход</Headling>
            {error ? <div className={styles.login__error}>{error}</div> :null}
            <form className={styles.form} onSubmit={submit} >
                <div className={styles.login__field}>
                    <label className={styles.login__label} htmlFor="email">Your email</label>
                    <Input name="email"  id="email" placeholder="Email"/>
                </div>
                <div className={styles.login__field}>
                    <label className={styles.login__label} htmlFor="password">Your password</label>
                    <Input name="password"  id="password" placeholder="Password" />
                </div>
                <Button size="big" >Sign In</Button>
            </form>
            <div className={styles.login__register}>
               <div>No acc?</div>
			   <Link  className={styles.login__links}  to="/auth/register">Sign Up</Link>
            </div>
        </div>
    )
}