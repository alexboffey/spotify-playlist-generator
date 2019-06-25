import React from "react";
import { shallow } from "enzyme";
import Header from "../components/Header";

describe("<Header />", () => {
  it("Should render without the action prop", () => {
    const wrapper = shallow(<Header title="Some Title" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render with the action prop", () => {
    const wrapper = shallow(
      <Header title="Some Title" action={<span>I am an action</span>} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
