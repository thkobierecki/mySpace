import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GridTemplates from "../templates/GridTemplates";
import Card from "../components/molecules/Card/Card";
import { fetchItems } from "../actions";

const Twitters = ({ fetchTwitters, twitters, filterVal }) => {
  useEffect(() => {
    fetchTwitters();
  }, []);

  return (
    <GridTemplates>
      {twitters
        .filter((item) => item.title.includes(filterVal))
        .map(({ title, content, twitterName, id }) => (
          <Card
            id={id}
            title={title}
            content={content}
            twitterName={twitterName}
            key={id}
          />
        ))}
    </GridTemplates>
  );
};

Twitters.propTypes = {
  twitters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      twitterName: PropTypes.string.isRequired,
    })
  ),
};

Twitters.defaultProps = {
  twitters: [],
};

const mapStateToProps = (state) => {
  const { twitters, filterVal } = state;
  return { twitters, filterVal };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTwitters: () => dispatch(fetchItems("twitters")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Twitters);
