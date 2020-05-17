import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserTemplate from "./UserTemplate";
import Input from "../components/atoms/Input/Input";
import Heading from "../components/atoms/Heading/Heading";
import Paragraph from "../components/atoms/Paragraph/Paragraph";
import withContext from "../hoc/withContex";
import ButtonIcon from "../components/atoms/ButtonIcon/ButtonIcon";
import plusIcon from "../assest/icons/plus.svg";
import NewItemBar from "../components/organisms/NewItemBar/NewItemBar";
import { filterArray } from "../actions";

const StyledWrapper = styled.div`
  position: relative;
  padding: 20px 160px 0px 78px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  /* @media (max-width: 1500px) {
    grid-gap: 45px;
    grid-template-columns: repeat(2, 1fr);
  } */

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;
const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;

  ::first-letter {
    text-transform: uppercase;
  }
`;
const StyledHParagraph = styled(Paragraph)`
  margin: 0;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  position: fixed;
  right: 40px;
  bottom: 40px;
  border-radius: 50px;
  background-color: ${({ activeColor, theme }) => theme[activeColor]};
  background-size: 40%;
  z-index: 10000;
  :focus {
    outline: none;
  }
`;
const GridTemplate = ({ children, pageContext, filterArray }) => {
  const [visible, setVisible] = useState(false);
  const [searchV, setTitle] = useState("");
  const toggleNewItemBar = () => {
    setVisible(!visible);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    filterArray(e.target.value);
  };

  return (
    <UserTemplate>
      <StyledWrapper>
        <StyledPageHeader>
          <Input
            search
            value={searchV}
            onChange={(e) => handleChange(e)}
            placeholder="Search"
          />
          <StyledHeading big as="h1">
            {pageContext}
          </StyledHeading>
          <StyledHParagraph>{pageContext}</StyledHParagraph>
        </StyledPageHeader>
        <StyledGrid>{children}</StyledGrid>
        <StyledButtonIcon
          onClick={toggleNewItemBar}
          activeColor={pageContext}
          icon={plusIcon}
        />
        <NewItemBar handleClose={toggleNewItemBar} isVisible={visible} />
      </StyledWrapper>
    </UserTemplate>
  );
};

GridTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageContext: PropTypes.oneOf(["notes", "twitters", "articles"]),
};

GridTemplate.defaultProps = {
  pageContext: "notes",
};

const mapDispatchToProps = (dispatch) => ({
  filterArray: (filter) => dispatch(filterArray(filter)),
});
export default connect(null, mapDispatchToProps)(withContext(GridTemplate));
