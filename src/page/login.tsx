import { Box, Button } from "@mui/material";
import styled from "styled-components";
import {
  Formik,
  Field,
  ErrorMessage,
  FormikProps,
  FormikHelpers,
  Form,
} from "formik";
import { Flex } from "../style/common";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction, RegisterAction } from "../store/auth/action";
import { selectAuth } from "../store/auth/reducer";
import LoginForm from "../components/login-form";
import SignupForm from "../components/signup-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

export const LoginFormTitle = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
  background-color: #fff;
  padding: 12px;
  font-size: 24px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 440px;
  @media (max-width: 600px) {
    width: 240px;
  }
`;

export const LoginFormWraaper = styled(LoginFormTitle)``;

export const Label = styled("label")`
  font-size: 16px;
  color: #4a4a4a;
`;
export const InputField = styled(Field)`
  outline: none;
  padding-left: 5px;
  height: 40px;
  min-width: 400px;
  border-radius: 8px;
  font-size: large;
  border: 1px solid #ccc;
  @media (max-width: 600px) {
    min-width: 200px;
  }
`;

export const Error = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
`;

export const LoginSigup = styled(Flex)<{ formtype: boolean }>`
  background-color: ${(props) => (props.formtype ? "#e2e2f0" : "white")};
  padding: 4px;
  color: #0c0101;
  font-size: 16px;
  border-radius: 20px;
  transition: 0.5s;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface FormValues {
  email: string;
  name?: string;
  phonenumber?: string;
  password: string;
  confirmPassword?: string;
  file: string | Blob;
}

const validationLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  name: Yup.string().required("Name is required"),
  phonenumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can be maximum 15 digits"),
});
enum ButtonType {
  Login = "login",
  signup = "signup",
}

const Login = () => {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const user = useSelector(selectAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.token && user.token.length > 10) {
      navigate("/allchat");
    } else navigate("/");
  }, [navigate, user]);
  console.log(user.token);

  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (
    values: FormValues,
    _formikHelpers: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    if (formtype === ButtonType.Login) {
      dispatch(LoginAction.request(values));
    } else {
      console.log(values);

      dispatch(
        RegisterAction.request({
          email: values.email,
          name: values.name,
          password: values.password,
          phoneNumber: values.phonenumber
        })
      );
    }
  };

  const [formtype, setFocuced] = useState<string>(ButtonType.Login);

  return (
    <LoginWrapper>
      <Box>
        <LoginFormTitle>chat App</LoginFormTitle>
        <LoginFormWraaper>
          <Flex width="100%" paddingLeft={2} paddingRight={2}>
            <LoginSigup
              formtype={formtype === ButtonType.Login}
              onClick={() => setFocuced(ButtonType.Login)}
            >
              Login
            </LoginSigup>
            <LoginSigup
              formtype={formtype === ButtonType.signup}
              onClick={() => setFocuced(ButtonType.signup)}
            >
              Signup
            </LoginSigup>
          </Flex>
          <Formik
            initialValues={initialValues}
            validationSchema={
              formtype === ButtonType.Login
                ? validationLoginSchema
                : validationSchema
            }
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }: FormikProps<FormValues>) => {
              return formtype === ButtonType.Login ? (
                <LoginForm isSubmitting={isSubmitting} />
              ) : (
                <SignupForm
                  isSubmitting={isSubmitting}
                  setFieldValue={setFieldValue}
                />
              );
            }}
          </Formik>
        </LoginFormWraaper>
      </Box>
    </LoginWrapper>
  );
};

export default Login;
