import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import AuthTemplate from "../templates/AuthTemplate";
import { Link, Redirect } from "react-router-dom";
import Heading from "../components/atoms/Heading/Heading";
import Input from "../components/atoms/Input/Input";
import Button from "../components/atoms/Button/Button";
import { register } from "../actions";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  height: 40px;
  width: 100%;
`;
const Error = styled.span`
  padding-left: 20px;
  width: 100%;
  color: red;
  font-size: 14px;
`;
const Group = styled.div`
  margin: 0 0 10px 0;
  width: 300px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const RegisterPage = ({ registerUser }) => {
  const [redirect, setRedirect] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  console.log(errors);
  const onSubmit = ({ username, password, email }) => {
    registerUser(username, password, email);
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/confirmation" />;
  }
  return (
    <AuthTemplate>
      <>
        <Heading>Sign up</Heading>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Group>
            {errors.email && <Error>This field is required</Error>}
            <StyledInput
              type="email"
              name="email"
              placeholder="Email"
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                },
              })}
            />
          </Group>
          <Group>
            {errors.username && <Error>This field is required</Error>}
            <StyledInput
              type="text"
              name="username"
              placeholder="Login"
              ref={register({ required: true })}
            />
          </Group>
          <Group>
            {errors.password && (
              <Error>
                {errors.password.message
                  ? errors.password.message
                  : "This field is required"}
              </Error>
            )}
            <StyledInput
              type="password"
              name="password"
              placeholder="Password"
              ref={register({
                required: true,
                minLength: { value: 8, message: "must be 8 or more sign" },
              })}
            />
          </Group>
          <Button activeColor="notes" type="submit">
            register
          </Button>
        </StyledForm>
        <StyledLink to="/login">I want to log in!</StyledLink>
      </>
    </AuthTemplate>
  );
};

const mapStateToProps = ({ authorized }) => ({
  authorized,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (username, password, email) =>
    dispatch(register(username, password, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
