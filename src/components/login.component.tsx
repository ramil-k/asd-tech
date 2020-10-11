import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { login } from "../services/login.service";
import { useHistory } from "react-router-dom";
import "./login.component.scss";
import { Loader } from "./loader.component";

interface LoginFields {
  login: string;
  password: string;
}

const initialValues: LoginFields = { login: "", password: "" };

export const Login = () => {
  const history = useHistory();
  const onSubmit = async (
    values: LoginFields,
    formikHelpers: FormikHelpers<LoginFields>
  ) => {
    try {
      const res = await login(values.login, values.password);
      console.log(`LOGIN RESULT:`, res);
      history.replace("/");
    } catch (e) {
      console.error(`LOGIN FAILED:`, e);
      formikHelpers.setFieldError("login", e.description);
    }
  };
  const validate = (values: LoginFields) => {
    const errors: FormikErrors<LoginFields> = {};
    if (values.login.length === 0) {
      errors.login = "Поле обязательно для заполнения";
    }
    if (values.password.length === 0) {
      errors.password = "Поле обязательно для заполнения";
    }

    return errors;
  };
  return (
    <div className="login">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login__form">
            <label className="login__label">
              <span className="login__label-text">Логин</span>
              <Field type="text" name="login" />
            </label>
            <ErrorMessage
              name="login"
              component="div"
              className="login__error-message"
            />
            <label className="login__label">
              <span className="login__label-text">Пароль</span>
              <Field type="password" name="password" />
            </label>
            <ErrorMessage
              name="password"
              component="div"
              className="login__error-message"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="login__button"
            >
              {isSubmitting && (
                <Loader
                  style={{ display: "inline-block", marginRight: "0.8rem" }}
                />
              )}
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
