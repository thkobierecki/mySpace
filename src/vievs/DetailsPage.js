import React, { useEffect, useState } from "react";
import DetailsTemplate from "../templates/DetailsTemplate";
import withContext from "../hoc/withContex";
import { connect } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { getNote } from "../graphql/queries";

const DetailsPage = ({ match }) => {
  const [activeitem, setActiveItem] = useState({
    title: "",
    content: "",
    articleUrl: "",
    twitterName: "",
  });
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const { id } = match.params;
    const currentNote = await API.graphql(graphqlOperation(getNote, { id }));
    const {
      title,
      content,
      articleUrl,
      twitterName,
    } = currentNote.data.getNote;
    setActiveItem({ title, content, articleUrl, twitterName });
  };

  return (
    <DetailsTemplate
      title={activeitem.title}
      content={activeitem.content}
      articleUrl={activeitem.articleUrl}
      twitterName={activeitem.twitterName}
    />
  );
};

export default withContext(DetailsPage);
