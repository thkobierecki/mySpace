import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GridTemplates from "../templates/GridTemplates";
import Card from "../components/molecules/Card/Card";
import { fetchItems } from "../actions";

const Articles = ({ fetchArticles, articles, filterVal }) => {
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <GridTemplates>
      {articles
        .filter((item) => item.title.includes(filterVal))
        .map(({ title, content, articleUrl, id }) => (
          <Card
            id={id}
            title={title}
            content={content}
            articleUrl={articleUrl}
            key={id}
          />
        ))}
    </GridTemplates>
  );
};

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

Articles.defaultProps = {
  articles: [],
};

const mapeStateToProps = (state) => {
  const { articles, filterVal } = state;
  return { articles, filterVal };
};

const mapeDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchItems("articles")),
});

export default connect(mapeStateToProps, mapeDispatchToProps)(Articles);
