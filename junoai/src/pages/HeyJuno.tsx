/**
 * This is the interactive onboarding page for customers.
 *
 */
import React from "react";

// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import OnboardingForm from "./OnboardingForm.tsx";
import { makeStyles } from "@mui/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRightAlt";

import Button from "../components/Button.tsx";

import _ from "lodash";
// import { generateMessage } from "../../../server/openai.js";

import "../styles/animations.css";

type Props = {};

type Form = {
  targetRole: string;
  targetCompany: string;
  targetLevel: string;
};

const STEPS = [
  {
    key: "INIT",
    title: "Hi, I'm Juno",
    subtitle: "Let's start by answering a few questions...",
    primaryAction: true,
  },
  {
    key: "STACK",
    subtitle: "Select the stack you're most comfortable with",
    subtitle2: "Add up to 6 languages.",
    primaryAction: true,
    secondaryAction: true,
  },
  {
    key: "TARGET",
    subtitle:
      "Select your overall experience level, the role you're interested in, and the company that peaks your interest.",
    primaryAction: true,
    secondaryAction: true,
  },
];

// todo: pull from backend
const ROLES = [
  {
    value: "FRE_SWD",
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

const STACKS = [
  {
    category: "FRONT_END",
    value: "REACTJS",
    label: "ReactJS",
  },
  {
    category: "FRONT_END",
    value: "ANGULAR",
    label: "Angular",
  },
  {
    category: "FRONT_END",
    value: "VUE",
    label: "Vue.js",
  },
  {
    category: "FRONT_END",
    value: "TYPESCRIPT",
    label: "TypeScript",
  },
  {
    category: "FRONT_END",
    value: "JQUERY",
    label: "jQuery",
  },
  {
    category: "FRONT_END",
    value: "HTML5",
    label: "HTML5",
  },
  {
    category: "FRONT_END",
    value: "SWIFT",
    label: "Swift",
  },
  {
    category: "FRONT_END",
    value: "JAVASCRIPT",
    label: "JavaScript",
  },
  {
    category: "FRONT_END",
    value: "GOLANG",
    label: "GoLang",
  },
  {
    category: "FRONT_END",
    value: "CSS",
    label: "CSS",
  },
  {
    category: "BACK_END",
    value: "PYTHON",
    label: "Python",
  },
  {
    category: "BACK_END",
    value: "JAVA",
    label: "Java",
  },
  {
    category: "BACK_END",
    value: "PHP",
    label: "PHP",
  },
  {
    category: "BACK_END",
    value: "RUBY",
    label: "Ruby",
  },
  {
    category: "BACK_END",
    value: "CSHARP",
    label: "C#",
  },
  {
    category: "BACK_END",
    value: "NODEJS",
    label: "Node.js",
  },
  {
    category: "BACK_END",
    value: "CPP",
    label: "C++",
  },
  {
    category: "BACK_END",
    value: "EXPRESSJS",
    label: "Express.js",
  },
  {
    category: "BACK_END",
    value: "KOTLIN",
    label: "Kotlin",
  },
  {
    category: "BACK_END",
    value: "DOTNET",
    label: ".NET",
  },
  {
    category: "BACK_END",
    value: "SPRINGBOOT",
    label: "Spring Boot",
  },
  {
    category: "DATABASE",
    value: "MYSQL",
    label: "MySQL",
  },
  {
    category: "DATABASE",
    value: "ORACLE",
    label: "Oracle Database",
  },
  {
    category: "DATABASE",
    value: "POSTGRESQL",
    label: "PostgreSQL",
  },
  {
    category: "DATABASE",
    value: "MONGODB",
    label: "MongoDB",
  },
  {
    category: "DATABASE",
    value: "NOSQL",
    label: "NoSQL",
  },
  {
    category: "DATABASE",
    value: "GRAPHQL",
    label: "GraphQL",
  },
  {
    category: "DATABASE",
    value: "SPARQL",
    label: "SPARQL",
  },
];

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    padding: 48,
  },
  gridContainer: {
    padding: 72,
  },
  margin24: {
    marginTop: 24,
    marginBottom: 24,
  },
}));

const HeyJuno = ({}: Props) => {
  const classes = useStyles();

  const [selectedStack, setSelectedStack] = React.useState<Object>({});
  const [step, setStep] = React.useState<number>(0);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const renderStep = () => {
    const { key, subtitle, subtitle2 } = STEPS[step];

    return key === "INIT" ? (
      <Box className={classes.containerWrapper}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography className="slide-in-blurred-bottom" variant="h1">
            Hi,&nbsp;
          </Typography>
          <Typography className="fade-in-1250" variant="h1">
            I'm Juno
          </Typography>
        </Box>
        <Box className="fade-in-2000">
          <Typography sx={{ marginTop: 4, marginBottom: 4 }} variant="h6">
            {subtitle}
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowRightIcon />}
            onClick={handleNext}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    ) : key === "STACK" ? (
      <Box className={classes.containerWrapper}>
        <Typography variant="h5">{subtitle}</Typography>
        <Typography variant="subtitle2">{subtitle2}</Typography>
        <Grid
          className={classes.gridContainer}
          container
          spacing={1}
          columnSpacing={0}
          rowSpacing={2}
        >
          {STACKS.map((stack) => (
            <Grid key={stack.value} size={{ xs: 4, md: 2 }}>
              <Chip
                key={stack.value}
                id={stack.value}
                label={stack.label}
                variant={
                  selectedStack[stack.value] !== undefined
                    ? "filled"
                    : "outlined"
                }
                onClick={
                  stack.label === "React" ? undefined : onClickChip(stack)
                }
                onDelete={
                  selectedStack[stack.value] === undefined
                    ? null
                    : stack.label === "React"
                    ? undefined
                    : onRemoveChip(stack)
                }
                color={
                  selectedStack[stack.value] !== undefined
                    ? "secondary"
                    : "default"
                }
              />
            </Grid>
          ))}
        </Grid>
        <Button
          disabled={Object.keys(selectedStack).length < 3}
          endIcon={<ArrowRightIcon />}
          variant="contained"
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    ) : key === "TARGET" ? (
      <Box className={classes.containerWrapper}>
        <OnboardingForm
          stack={Object.values(selectedStack).join(", ")}
          loading={submitting}
          onSubmit={onSubmit}
        />
      </Box>
    ) : null;
  };

  const onClickChip = (chipData) => () => {
    setSelectedStack((prevState) => ({
      ...prevState,
      [chipData.value]: chipData.label,
    }));
  };

  const onRemoveChip = (chipData) => () => {
    const stackCopy: Object = _.cloneDeep(selectedStack);

    delete stackCopy[chipData.value];

    setSelectedStack(stackCopy);
  };

  const fetchMainRoute = async () => {
    const response = await fetch("http://localhost:5000/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.text();
  };

  const generateTechPrep = async (input, filters) => {
    const response = await fetch("http://localhost:5000/api/generatePrep", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input,
        filters,
      }),
    });

    if (!response.ok) {
      throw new Error(`Api request failed with error`);
    }

    const data = await response.json();
    return data;
  };

  const onSubmit = async (formValues) => {
    // pass as level, role, company, stack
    // the order matters here
    const inputs = [
      formValues.level.label,
      formValues.role.label,
      formValues.company.label,
      Object.values(selectedStack).join(", "),
    ];

    const filters = [formValues.role.value, formValues.level.value];

    try {
      setSubmitting(true);
      const response = await generateTechPrep(inputs, filters);
      console.log(JSON.parse(response.data));
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  const handleNext = () => {
    setStep((prevState) => prevState + 1);
  };

  const handleBack = () => {
    setStep((prevState) => prevState - 1);
  };

  return <Box>{renderStep()}</Box>;
};

export default HeyJuno;
