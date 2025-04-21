import React from "react";
import parser from "html-react-parser";
export const Body = ({ children }: { children: string }) => {
  return <div className="body">{parser(children)}</div>;
};
