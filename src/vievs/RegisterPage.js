import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import AuthTemplate from "../templates/AuthTemplate";
import { Link, Redirect } from "react-router-dom";
import Heading from "../components/atoms/Heading/Heading";
import Input from "../components/atoms/Input/Input";
import Button from "../components/atoms/Button/Button";
import { register } from "../actions";

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 0 0 30px 0;
  height: 40px;
  width: 300px;
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const RegisterPage = ({ register, authorized }) => (
  <AuthTemplate>
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={({ username, password }) => {
        register(username, password);
      }}
    >
      {({ handleChange, handleBlur, values }) => {
        if (authorized) {
          return <Redirect to="/" />;
        }
        return (
          <>
            <Heading>Sign up</Heading>
            <StyledForm>
              <StyledInput
                type="text"
                name="username"
                placeholder="Login"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <StyledInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <Button activeColor="notes" type="submit">
                register
              </Button>
            </StyledForm>
            <StyledLink to="/login">I want to log in!</StyledLink>
          </>
        );
      }}
    </Formik>
  </AuthTemplate>
);

const mapStateToProps = ({ authorized }) => ({
  authorized,
});

const mapDispatchToProps = (dispatch) => ({
  register: (username, password) => dispatch(register(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
