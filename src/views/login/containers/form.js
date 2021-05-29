/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik } from 'formik';
import Button from '../../../components/button';
import FormGroup from '../../../components/form/formGroup';
import Input from '../../../components/form/input';
import ErrorText from '../../../components/form/error';

const LoginForm = props => (
  <Formik initialValues={{ email: '', password: '' }} {...props}>
    {({ handleChange, handleBlur, values, handleSubmit, errors }) => (
      <FormGroup>
        {errors.genericError && <ErrorText>{errors.genericError}</ErrorText>}
        <Input
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors.email}
          value={values.email}
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          value={values.password}
        />
        <Button primary large onClick={handleSubmit} type="submit">
          Login
        </Button>
      </FormGroup>
    )}
  </Formik>
);

export default LoginForm;
