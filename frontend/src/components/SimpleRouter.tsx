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
  const currentRoute = routes.filter(({ key }) => key === activeMenuKey)[0];

  return (
    <React.Fragment>
      {currentRoute ? (
        currentRoute.component
      ) : (
        <p>No route found for menu key: {activeMenuKey}</p>
      )}
    </React.Fragment>
  );
};

export default SimpleRouter;
