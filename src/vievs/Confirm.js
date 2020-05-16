import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import AuthTemplate from "../templates/AuthTemplate";
import { Redirect } from "react-router-dom";
import Heading from "../components/atoms/Heading/Heading";
import Input from "../components/atoms/Input/Input";
import Button from "../components/atoms/Button/Button";
import { confirm } from "../actions";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
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

const RegisterPage = ({ confirm }) => {
  const [redirect, setRedirect] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = ({ username, code }) => {
    confirm(username, code);
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <AuthTemplate>
      <>
        <Heading>Confirm sign up</Heading>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Group>
            {" "}
            {errors.username && <Error>This field is required</Error>}
            <StyledInput
              type="text"
              name="username"
              placeholder="Login"
              ref={register({ required: true })}
            />
          </Group>

          <Group>
            {errors.code && <Error>This field is required</Error>}
            <StyledInput
              type="text"
              name="code"
              placeholder="Confirmation code"
              ref={register({ required: true })}
            />
          </Group>

          <Button activeColor="notes" type="submit">
            Confirm sign up
          </Button>
        </StyledForm>
      </>
    </AuthTemplate>
  );
};

const mapDispatchToProps = (dispatch) => ({
  confirm: (username, code) => dispatch(confirm(username, code)),
});

export default connect(null, mapDispatchToProps)(RegisterPage);
