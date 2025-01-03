import { useContext, useState } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../Store/auth-context';

const ProfileForm = () => {
  const [enteredNewPassword, setEnteredNewPassword] = useState('');
  const authCtx=useContext(AuthContext);

  const newPasswordChangeHandler = (event) => {
    setEnteredNewPassword(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD6Gj3hGJUWemo2iK8w7GkCTWiU41SmoFI',{
      method: 'POST',
      body: JSON.stringify({
        idToken:authCtx.token,
        password:enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json'
      } 
    }).then(res=>{

    }); 

    setEnteredNewPassword('');
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler} >
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' value={enteredNewPassword} onChange={newPasswordChangeHandler} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
