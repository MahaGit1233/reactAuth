import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../Store/auth-context';

const MainNavigation = () => {

  const authCtx = useContext(AuthContext);

  const logoutBtnHandler = () => {
    authCtx.logout();
    // authCtx.token=null;
  }

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        {!isLoggedIn ?
          <ul>
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          </ul> : <ul>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <button onClick={logoutBtnHandler}>Logout</button>
            </li>
          </ul>}

      </nav>
    </header >
  );
};

export default MainNavigation;
