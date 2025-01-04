import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../Store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState([]);
  const [enteredPassword, setEnteredPassword] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const url = isLogin ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6Gj3hGJUWemo2iK8w7GkCTWiU41SmoFI' : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6Gj3hGJUWemo2iK8w7GkCTWiU41SmoFI';

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const mailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if (res.ok) {
        console.log("ok");
        setIsLoading(false);
        return res.json();
      }
      else {
        return res.json().then((data) => {
          alert(data.error.message);
          console.log(data.error.message);
          setIsLoading(false);
        })
      }
    }).then((data) => {
      console.log(data);
      const expiresIn = data.expiresIn * 1000;
      authCtx.login(data.idToken, expiresIn);
    }).catch((err) => {
      alert(err.message);
    })

    setEnteredEmail("");
    setEnteredPassword("");
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required value={enteredEmail} onChange={mailChangeHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          {isLoading ? <div>Sending Request...</div> : <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
