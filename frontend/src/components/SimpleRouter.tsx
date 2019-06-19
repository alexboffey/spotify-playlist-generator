import React from "react";

interface ISimpleRouter {
  activeMenuKey: string;
  routes: Array<{
    key: string;
    component: React.ReactElement;
  }>;
}

const SimpleRouter: React.FunctionComponent<ISimpleRouter> = ({
  routes,
  activeMenuKey
}) => {
  const currentRoute = routes.filter(({ key }) => key === activeMenuKey)[0]
    .component;

  return (
    <React.Fragment>
      {currentRoute ? (
        currentRoute
      ) : (
        <p>No route found for the key: {activeMenuKey}</p>
      )}
    </React.Fragment>
  );
};

export default SimpleRouter;
