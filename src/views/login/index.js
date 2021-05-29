import React, { useEffect } from 'react';

import useLogin from '../../state/auth/hooks/useLogin';

import Container from './containers/container';
import Form from './containers/form';
import Spinner from '../../components/spinner';
import { isTokenExpired } from '../../utils/jwt';

const Login = ({ location, history }) => {
  const { from } = location.state || { from: { pathname: '/home' } };
  const [auth, setLogin, isLoading, error] = useLogin();

  useEffect(() => {
    if (!isTokenExpired()) {
      history.push(from);
    }
  }, [auth, from, history]);

  return (
    <Container>
      <Spinner show={isLoading} />
      <Form onSubmit={(values, actions) => setLogin({ values, actions })} />
      {error && <div style={{ color: 'red', margin: '1rem' }}>{error}</div>}
    </Container>
  );
};

export default Login;
