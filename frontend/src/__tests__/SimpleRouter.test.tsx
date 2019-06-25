import React from "react";
import { shallow } from "enzyme";
import SimpleRouter from "../components/SimpleRouter";

const routes = [
  { key: "component1", component: <span>Component 1</span> },
  { key: "component2", component: <span>Component 2</span> }
];

describe("<SimpleRouter />", () => {
  it("Renders the expected route", () => {
    const wrapper = shallow(
      <SimpleRouter routes={routes} activeMenuKey={routes[0].key} />
    );

    // Assertions
    expect(wrapper.find("span").text()).toBe("Component 1");
  });

  it("Updates component when activeMenuKey prop changes", () => {
    const wrapper = shallow(
      <SimpleRouter routes={routes} activeMenuKey={routes[0].key} />
    );

    // Update props after initial mount
    wrapper.setProps({ activeMenuKey: routes[1].key });

    // Assertions
    expect(wrapper.find("span").text()).toBe("Component 2");
  });

  it("Renders fallback text when no route matches", () => {
    const wrapper = shallow(
      <SimpleRouter routes={routes} activeMenuKey={"somethingElse"} />
    );

    // Assertions
    expect(wrapper.find("p").text()).toContain("No route found for menu key:");
  });
});
