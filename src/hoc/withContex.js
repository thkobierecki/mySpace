import React from 'react';
import PageContext from '../contex';

const withContext = Component => function contextComponent(props) {
  return (
    <PageContext.Consumer>
      {context => <Component {...props} pageContext={context} />}
    </PageContext.Consumer>
  );
};

export default withContext;
