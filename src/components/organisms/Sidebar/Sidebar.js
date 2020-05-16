import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon";
import bulbIcon from "../../../assest/icons/bulb.svg";
import logIcon from "../../../assest/icons/logout.svg";
import penIcon from "../../../assest/icons/pen.svg";
import twitterIcon from "../../../assest/icons/twitter.svg";
import logoIcon from "../../../assest/icons/logo.svg";
import withContext from "../../../hoc/withContex";
import { logout } from "../../../actions";
const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 160px;
  height: 100vh;
  padding: 25px 0;
  background-color: ${({ activeColor, theme }) =>
    activeColor ? theme[activeColor] : theme.note};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled(NavLink)`
  display: block;
  width: 67px;
  height: 67px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 15vh;
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledLoguout = styled(ButtonIcon)`
  margin-top: auto;
`;

const Sidebar = ({ pageContext, logout }) => (
  <StyledWrapper activeColor={pageContext}>
    <StyledLogo to="/" />
    <StyledList>
      <li>
        <ButtonIcon
          as={NavLink}
          to="/notes"
          icon={penIcon}
          activeclass="active"
        />
      </li>
      <li>
        <ButtonIcon
          as={NavLink}
          to="/twitters"
          icon={twitterIcon}
          activeclass="active"
        />
      </li>
      <li>
        <ButtonIcon
          as={NavLink}
          to="/articles"
          icon={bulbIcon}
          activeclass="active"
        />
      </li>
    </StyledList>
    <StyledLoguout
      as={NavLink}
      to="/login"
      onClick={() => logout()}
      icon={logIcon}
    />
  </StyledWrapper>
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  null,
  mapDispatchToProps
)(withContext(Sidebar));
