import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import AuthTemplate from "../templates/AuthTemplate";
import { Redirect } from "react-router-dom";
import Heading from "../components/atoms/Heading/Heading";
import Input from "../components/atoms/Input/Input";
import Button from "../components/atoms/Button/Button";
import { confirm } from "../actions";

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

const RegisterPage = ({ confirm }) => {
  const [redirect, setRedirect] = useState(false);

  return (
    <AuthTemplate>
      <Formik
        initialValues={{ username: "", code: "" }}
        onSubmit={({ username, code }) => {
          confirm(username, code);
          setRedirect(true);
        }}
      >
        {({ handleChange, handleBlur, values }) => {
          if (redirect) {
            return <Redirect to="/login" />;
          }
          return (
            <>
              <Heading>Confirm sign up</Heading>
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
                  type="text"
                  name="code"
                  placeholder="Confirmation code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <Button activeColor="notes" type="submit">
                  Confirm sign up
                </Button>
              </StyledForm>
            </>
          );
        }}
      </Formik>
    </AuthTemplate>
  );
};

const mapDispatchToProps = (dispatch) => ({
  confirm: (username, code) => dispatch(confirm(username, code)),
});

export default connect(null, mapDispatchToProps)(RegisterPage);
