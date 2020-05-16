import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import AuthTemplate from "../templates/AuthTemplate";

import Heading from "../components/atoms/Heading/Heading";
import Input from "../components/atoms/Input/Input";
import Button from "../components/atoms/Button/Button";
import { authenticate as authenticateAction } from "../actions";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
`;

const StyledInput = styled(Input)`
  margin: 0 0 30px 0;
  height: 40px;
  width: 300px;
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

const LoginPage = ({ authenticate, authorized }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = ({ username, password }) => authenticate(username, password);
  console.log(errors);
  if (authorized) {
    return <Redirect to="/" />;
  }
  return (
    <AuthTemplate>
      <>
        <Heading>Sign in</Heading>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Group>
            {errors.username && <Error>This field is required</Error>}
            <StyledInput
              type="text"
              name="username"
              ref={register({ required: true })}
              placeholder="Login"
            />
          </Group>
          <Group>
            {errors.password && <Error>This field is required</Error>}
            <StyledInput
              type="password"
              name="password"
              ref={register({ required: true })}
              placeholder="Password"
            />
          </Group>

          <Button activeColor="notes" type="submit">
            sign in
          </Button>
        </StyledForm>
        <StyledLink to="/register">I want my account!</StyledLink>
      </>
    </AuthTemplate>
  );
};
const mapStateToProps = ({ userID = null, authorized }) => ({
  userID,
  authorized,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: (username, password) =>
    dispatch(authenticateAction(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
