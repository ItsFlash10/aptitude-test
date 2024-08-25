import React from "react";

const TestLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div className="mx-auto">{children}</div>;
};

export default TestLayout;
