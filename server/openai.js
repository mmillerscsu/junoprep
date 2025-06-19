import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { t } from "./utilities/text.js";
import { filterRelevantResources } from "./utilities/resources.js";

const openai_key = process.env.OPEN_AI_KEY;
const openai_model = "gpt-4o-mini";

const client = new OpenAI({
  apiKey: openai_key,
});

const Resources = z.object({
  name: z.string(),
  link: z.string(),
});

const PracticeTasks = z.object({
  task: z.string(),
  resource: z.string(),
});

const WeekPrep = z.object({
  week: z.number(),
  objectives: z.array(z.string()),
  practice_tasks: z.array(PracticeTasks),
  mock_questions: z.array(z.string()),
  estimated_hours: z.number(),
  resources: z.array(Resources),
});

const Curriculum = z.object({
  result: z.array(WeekPrep),
});

// todo: update the week length here
const prompt = `You're a technical interview coach.
    Create a 2-week personalized interview prep plan for a {} {} targeting {}.
    The candidate is familiar with {}.

    You must only recommend learning resources from the list below when suggesting materials (articles, practice, videos, books, etc). 
    Do not create your own links or make up new resources.

    Curated Resource List:
    {}

    For each week, include:
    - Objectives (e.g. concepts to review)
    - Practice Tasks (only from the curated list above)
    - Mock Interview Questions (both technical + behavioral)
    - Estimated Time Commitment (hrs/week)
    - Resources (only from the curated list above)
    `;

export const generateMessage = async (input, filters) => {
  if (!input || !filters) {
    return null;
  }

  // filter curated resource list
  // todo: make filters an object instead of an array
  const resources = filterRelevantResources(filters[0], filters[1]);

  const insertions = [...input, resources];

  const content = t(prompt, insertions);

  const response = await client.responses.create({
    model: openai_model,
    input: [{ role: "system", content: content }],
    text: {
      format: zodTextFormat(Curriculum, "curriculum"),
    },
    temperature: 1.3,
  });

  return response.output_text;
};
