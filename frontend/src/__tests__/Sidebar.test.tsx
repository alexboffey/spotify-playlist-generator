import React from "react";
import { mount } from "enzyme";

import Sidebar from "../components/Sidebar";

const setActiveMenuKey = jest.fn();

describe("<Sidebar />", () => {
  it("Calls setActiveMenuKey with correct key", () => {
    const wrapper = mount(<Sidebar setActiveMenuKey={setActiveMenuKey} />);

    wrapper
      .find(".ant-menu-item")
      .first()
      .simulate("click");

    expect(setActiveMenuKey).toHaveBeenCalled();
    expect(setActiveMenuKey).toHaveBeenCalledWith("playlist");
  });
});
