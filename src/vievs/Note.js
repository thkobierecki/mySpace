import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GridTemplates from "../templates/GridTemplates";
import Card from "../components/molecules/Card/Card";
import { fetchItems } from "../actions";

const Note = ({ fetchNotes, notes, filterVal }) => {
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <GridTemplates>
      {notes
        .filter((item) => item.title.includes(filterVal))
        .map(({ title, content, created, id }) => (
          <Card
            id={id}
            title={title}
            content={content}
            created={created}
            key={id}
          />
        ))}
    </GridTemplates>
  );
};

Note.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

Note.defaultProps = {
  notes: [],
};

const mapStateToProps = (state) => {
  const { notes, filterVal } = state;
  return { notes, filterVal };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchItems("notes")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
