import React from "react";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import List from "../components/List.tsx";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

import Button from "../components/Button.tsx";
import Backdrop from "../components/Backdrop.tsx";

type Props = {
  stack: string;
  loading?: boolean;
  onSubmit: (formValues: any) => void;
};

type Form = {
  role: string;
  company: string;
  level: string;
  stack: string;
};

// todo: pull from backend
const ROLES = [
  {
    value: "FE_SWD",
    label: "Frontend Software Developer",
  },
  {
    value: "BE_SWD",
    label: "Backend Software Developer",
  },
  {
    value: "FS_SWD",
    label: "Fullstack Software Developer",
  },
  {
    value: "DEV_OPS",
    label: "Dev Ops",
  },
];

// todo: pull from backend
const COMPANIES = [
  {
    value: "GOOGLE",
    label: "Google",
  },
  {
    value: "NETFLIX",
    label: "Netflix",
  },
  {
    value: "META",
    label: "Meta",
  },
  {
    value: "APPLE",
    label: "Apple",
  },
  {
    value: "AMAZON",
    label: "Amazon",
  },
  {
    value: "MICROSOFT",
    label: "Microsoft",
  },
  {
    value: "ORACLE",
    label: "Oracle",
  },
  {
    value: "UBER",
    label: "Uber",
  },
  {
    value: "TIKTOK",
    label: "TikTok",
  },
  {
    value: "PAYPAL",
    label: "PayPal",
  },
  {
    value: "AIRBNB",
    label: "Airbnb",
  },
];

// todo: pull from backend
const LEVELS = [
  {
    value: "ENTRY",
    label: "Entry-level",
  },
  {
    value: "MID",
    label: "Mid-level",
  },
  {
    value: "SENIOR",
    label: "Senior",
  },
];

const LIST_ITEMS = [
  {
    label: "Core knowledge units (DSA, System Design, Concurrency...)",
    section: "Curriculum",
  },
  {
    label: "Video and reading recommendations",
    section: "Practice",
  },
  {
    label: "Simulated mock interviews",
    section: "Mock Interviews",
  },
  {
    label: "Tailored to your target company",
    section: "Behavioral Q&A",
  },
];

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: 24,
    marginBottom: 24,
    textAlign: "left",
  },
  formWrapper: {
    display: "flex",
  },
}));

const OnboardingForm = ({ stack, loading, onSubmit }: Props) => {
  const classes = useStyles();
  const [form, setForm] = React.useState<Form>({
    role: ROLES[0].value,
    company: COMPANIES[0].value,
    level: LEVELS[0].value,
    stack,
  });
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const onFormChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    const { role, level, company } = form;
    const seniority = LEVELS.find((lvl) => lvl.value === level);
    const targetRole = ROLES.find((rl) => rl.value === role);
    const targetCompany = COMPANIES.find((comp) => comp.value === company);

    const finalForm = {
      role: targetRole,
      company: targetCompany,
      level: seniority,
      stack,
    };

    onSubmit(finalForm);
  };

  return (
    <Paper sx={{ padding: 4 }}>
      <Typography variant="h5">Generate Your 6-Week Interview Prep</Typography>
      <Box className={classes.formWrapper}>
        <form onSubmit={submitForm}>
          <Box>
            <Box className={classes.textField}>
              <TextField
                select
                fullWidth
                variant="outlined"
                label="Role"
                name="role"
                value={form.role}
                onChange={onFormChange}
                helperText="Select your target role"
              >
                {ROLES.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.textField}>
              <TextField
                select
                fullWidth
                variant="outlined"
                label="Target Company"
                name="company"
                value={form.company}
                onChange={onFormChange}
                helperText="Select your target company"
              >
                {COMPANIES.map((company) => (
                  <MenuItem key={company.value} value={company.value}>
                    {company.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.textField}>
              <TextField
                select
                fullWidth
                variant="outlined"
                label="Experience Level"
                name="level"
                value={form.level}
                onChange={onFormChange}
                helperText="Select your experience level"
              >
                {LEVELS.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
          <Box sx={{ marginTop: 6 }}>
            <List subtitle="AI-Generated Material" listItems={LIST_ITEMS} />
          </Box>
          <Button variant="contained" type="submit" loading={loading}>
            Generate
          </Button>
        </form>
      </Box>
      {loading ? (
        <Backdrop loading loadTitle="Generating Interview Prep" />
      ) : null}
    </Paper>
  );
};

export default OnboardingForm;
