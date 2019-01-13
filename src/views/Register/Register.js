import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import InputWrapper from '../../common/components/forms/InputWrapper';

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .trim()
    .max(64, 'Name must be 64 characters or less')
    .required('Please enter your first name'),
  last_name: Yup.string()
    .trim()
    .max(64, 'Name must be 64 characters or less')
    .required('Please enter your last name'),
  email: Yup.string()
    .trim()
    .email()
    .required('Please enter your email'),
  password: Yup.string()
    .trim()
    .required('Please enter a password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Confirm Password is required'),
});

class Register extends Component {
  renderForm = ({ values, touched, errors, isSubmitting }) => (
    <Form>
      <InputWrapper
        label="First Name"
        required
        validation={touched.first_name && errors.first_name}
      >
        <Field type="text" name="first_name" maxLength="64" />
      </InputWrapper>
      <InputWrapper label="Last Name" required validation={touched.last_name && errors.last_name}>
        <Field type="text" name="last_name" maxLength="64" />
      </InputWrapper>
      <InputWrapper label="Email" required validation={touched.email && errors.email}>
        <Field type="email" name="email" maxLength="64" />
      </InputWrapper>
      <InputWrapper label="Password" required validation={touched.password && errors.password}>
        <Field type="password" name="password" maxLength="64" minLength="6" />
      </InputWrapper>
      <InputWrapper
        label="Confirm Password"
        required
        validation={touched.confirmPassword && errors.confirmPassword}
      >
        <Field type="password" name="confirmPassword" maxLength="64" minLength="6" />
      </InputWrapper>
      <div>
        <button type="submit" disabled={isSubmitting}>
          Sign Up
        </button>
      </div>
    </Form>
  );

  render() {
    return (
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          this.props.onRegisterSuccess(values).then(action => {
            if (action.response.ok) {
              return this.props.onPendingVerification();
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

export default Register;
