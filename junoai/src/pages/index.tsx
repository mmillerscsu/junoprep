import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
};

const PageWrapper = ({ title, children }: Props) => {
  return { children };
};

export default PageWrapper;
