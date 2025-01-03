import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './components/Pages/AuthPage';
import HomePage from './components/Pages/HomePage';
import { useContext } from 'react';
import AuthContext from './components/Store/auth-context';
import { Redirect } from 'react-router-dom';

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          {!isLoggedIn ? <AuthPage /> : <Redirect to='/profile' />}
        </Route>
        <Route path='/profile'>
          {isLoggedIn ? <UserProfile /> : <Redirect to='/auth' />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
