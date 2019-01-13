import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import InputWrapper from '../../common/components/forms/InputWrapper';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email()
    .required('Please enter your email'),
  password: Yup.string()
    .trim()
    .required('Please enter a password'),
});

class Login extends Component {
  renderForm = ({ touched, errors, isSubmitting }) => (
    <Form>
      <InputWrapper label="Email" required validation={touched.email && errors.email}>
        <Field type="email" name="email" maxLength="64" />
      </InputWrapper>
      <InputWrapper label="Password" required validation={touched.password && errors.password}>
        <Field type="password" name="password" maxLength="64" minLength="6" />
      </InputWrapper>
      <div>
        <button type="submit" className="btn" disabled={isSubmitting}>
          Login
        </button>
      </div>
    </Form>
  );

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          this.props.loginUser(values).then(action => {
            if (action.response.ok) {
              this.props.onSuccess();
            } else {
              if (action.json.validationErrors) {
                action.json.validationErrors.forEach(({ key, message }) =>
                  actions.setFieldError(key, message)
                );
              }
            }
            actions.setSubmitting(false);
          });
        }}
        render={this.renderForm}
      />
    );
  }
}

export default Login;
