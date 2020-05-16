import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../atoms/Button/Button";
import LinkIcon from "../../../assest/icons/link.svg";
import { removeItem as removeItemAction } from "../../../actions/index";
import withContext from "../../../hoc/withContex";

const StyledWrapper = styled.div`
  min-height: 380px;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;

const InnerWrapper = styled.div`
  padding: 17px 30px;
  position: relative;
  background-color: ${({ activeColor, theme }) =>
    activeColor ? theme[activeColor] : "white"};
  cursor: ${({ heading }) => heading && "pointer"};
  :first-of-type {
    z-index: 9999;
  }

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`;

const DateInfo = styled(Paragraph)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
`;

const StyledAvatar = styled.img`
  width: 86px;
  height: 86px;
  border: 5px solid ${({ theme }) => theme.twitters};
  border-radius: 50px;
  position: absolute;
  right: 25px;
  top: 25px;
`;

const StyledLinkButton = styled.a`
  position: absolute;
  right: 25px;
  top: 50%;
  display: block;
  width: 47px;
  height: 47px;
  border-radius: 50px;
  background: white url(${LinkIcon}) no-repeat;
  background-size: 60%;
  background-position: 50%;
  transform: translateY(-50%);
`;

const Card = ({
  id,
  pageContext,
  title,
  twitterName,
  articleUrl,
  content,
  removeItem,
}) => {
  const [redirect, setRedirect] = useState(false);

  const handleCardClick = () => setRedirect(true);

  if (redirect) {
    return <Redirect to={`${pageContext}/details/${id}`} />;
  }

  return (
    <StyledWrapper>
      <InnerWrapper
        heading={true}
        onClick={handleCardClick}
        activeColor={pageContext}
      >
        <StyledHeading>{title}</StyledHeading>
        {pageContext === "twitters" && (
          <StyledAvatar src={`https://avatars.io/twitter/${twitterName}`} />
        )}
        {pageContext === "articles" && <StyledLinkButton href={articleUrl} />}
      </InnerWrapper>
      <InnerWrapper flex>
        <Paragraph>
          {content.length < 200 ? content : `${content.slice(0, 200)}...`}
        </Paragraph>
        <Button onClick={() => removeItem(pageContext, id)} secondary>
          REMOVE
        </Button>
      </InnerWrapper>
    </StyledWrapper>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  pageContext: PropTypes.oneOf(["notes", "twitters", "articles"]),
  title: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  content: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};

Card.defaultProps = {
  pageContext: "notes",
  twitterName: null,
  articleUrl: null,
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(withContext(Card));
