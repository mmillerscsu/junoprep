import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

type Props = {
  listItems: Array<ListItem>;
  ordered?: boolean;
  subtitle?: string | null;
};

type ListItem = {
  label: string;
  section: string;
};

const useStyles = makeStyles((theme) => ({
  mainAlignment: {
    textAlign: "left",
  },
}));

const List = ({ listItems, ordered, subtitle }: Props) => {
  const classes = useStyles();

  const renderListItems = () => {
    return listItems.map((item) => (
      <li key={item.section}>
        <b>{item.section}:</b> {item.label}
      </li>
    ));
  };

  return (
    <Box className={classes.mainAlignment}>
      {subtitle ? (
        <Typography variant="subtitle1">
          <b>{subtitle}</b>
        </Typography>
      ) : null}
      {ordered ? <ol>{renderListItems()}</ol> : <ul>{renderListItems()}</ul>}
    </Box>
  );
};

export default List;
