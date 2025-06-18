import React from "react";

import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  type?: string;
};

const Header = ({ title, type }: Props) => {
  return <Typography variant={type ? type : "h1"}>{title}</Typography>;
};

export default Header;
