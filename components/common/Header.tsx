import React from "react";
import parser from "html-react-parser";

const HeaderText = ({ children }: { children: string }) => {
  return <div className="header">{parser(children)}</div>;
};

export default HeaderText;
