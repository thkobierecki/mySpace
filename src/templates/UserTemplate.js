import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "../components/organisms/Sidebar/Sidebar";

const StyledWrapper = styled.div`
  padding-left: 150px;
`;
const UserTemplate = ({ children, authorized }) => {
  if (!authorized) return <Redirect to="/login" />;
  return (
    <StyledWrapper>
      <Sidebar />
      {children}
    </StyledWrapper>
  );
};

UserTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node])
};

const mapStateToProps = ({ authorized }) => ({
  authorized
});

export default connect(mapStateToProps)(UserTemplate);
