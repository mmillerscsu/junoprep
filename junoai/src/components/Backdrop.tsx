import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type Props = {
  loading?: boolean;
  loadTitle?: string;
};

const BackdropWrapper = ({ loading, loadTitle }: Props) => {
  return (
    <Box>
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          flexDirection: "column",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={true}
      >
        {loadTitle ? (
          <Box>
            <Typography variant="h5">{loadTitle}</Typography>
          </Box>
        ) : null}
        {loading ? (
          <Box>
            <CircularProgress color="inherit" />
          </Box>
        ) : null}
      </Backdrop>
    </Box>
  );
};

export default BackdropWrapper;
