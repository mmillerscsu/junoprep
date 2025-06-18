import { readFileSync } from "fs";
const resource_bank = JSON.parse(
  readFileSync(new URL("../resource_bank.json", import.meta.url))
);

export const filterRelevantResources = (topic, difficulty) => {
  const resources = resource_bank
    .filter(
      (resource) =>
        resource.difficulty.toLowerCase() === difficulty.toLowerCase()
    )
    .filter((resource) => {
      // Full-Stack engineers can get either backend/frontend topics
      if (topic === "FS_SWD") {
        // todo: limit number of resources for Full-Stack as this list could get large
        return (
          resource.topic === "FS_SWD" ||
          resource.topic === "FE_SWD" ||
          resource.topic === "BE_SWD"
        );
      } else {
        return resource.topic === topic;
      }
    });

  return resources
    .map(
      (resource, idx) =>
        `${idx + 1}. [${resource.title}] - ${resource.url} - ${resource.type}`
    )
    .join("\n");
};
