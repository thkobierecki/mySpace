import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import withContext from "../../../hoc/withContex";
import Heading from "../../atoms/Heading/Heading";
import { addItem as addItemAction } from "../../../actions/index";

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  border-left: 10px solid ${({ activeColor, theme }) => theme[activeColor]};
  display: flex;
  flex-direction: column;
  padding: 100px 50px;
  width: 600px;
  height: 100vh;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? "0" : "100%")});
  transition: transform 0.5s ease-in-out;
`;

const StyledTextArea = styled(Input)`
  margin: 30px 0 100px;
  height: 30vh;
  border-radius: 20px;
`;
const StyledInput = styled(Input)`
  margin-top: 35px;
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const NewItemBar = ({ pageContext, isVisible, addItem, handleClose }) => (
  <StyledWrapper isVisible={isVisible} activeColor={pageContext}>
    <Heading big>Create new {pageContext}</Heading>
    <Formik
      initialValues={{
        title: "",
        content: "",
        articleUrl: "",
        twitterName: "",
      }}
      onSubmit={(values) => {
        addItem(pageContext, values);
        handleClose();
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <StyledForm>
          <StyledInput
            type="text"
            name="title"
            placeholder="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          {pageContext === "twitters" && (
            <StyledInput
              placeholder="twitter name eg. hello_roman"
              type="text"
              name="twitterName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.twitterName}
            />
          )}
          {pageContext === "articles" && (
            <StyledInput
              placeholder="link"
              type="text"
              name="articleUrl"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.articleUrl}
            />
          )}
          <StyledTextArea
            name="content"
            as="textarea"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.content}
          />
          <Button type="submit" activeColor={pageContext}>
            Add Note
          </Button>
        </StyledForm>
      )}
    </Formik>
  </StyledWrapper>
);
NewItemBar.propTypes = {
  pageContext: PropTypes.oneOf(["notes", "twitters", "articles"]),
  isVisible: PropTypes.bool,
  addItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

NewItemBar.defaultProps = {
  pageContext: "notes",
  isVisible: false,
};
const mapDispatchToProps = (dispatch) => ({
  addItem: (itemType, itemContent) =>
    dispatch(addItemAction(itemType, itemContent)),
});

export default connect(null, mapDispatchToProps)(withContext(NewItemBar));
