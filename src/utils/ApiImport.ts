import { DefaultState, useState, versionControl } from "~/State";
import { useCharacters } from "~/composables/Characters";
import Ajv from "ajv";
import apiSchema from "~/utils/ApiSchema.json";

type ImportData = Partial<typeof DefaultState>;

const ajv = new Ajv();
// In the future if we ever need to do semantic versioning of the API data, we can add a field as below.
// Note that it is probably redundant since we validate the schema using AJV, so it would only change the semantic meaning of the values.
// const API_VERSION = 1;

export const validateImportData = ajv.compile<ImportData>(apiSchema);

export function updateStateFromImportData(data: ImportData) {
  const state = useState();
  const { createCharactersFromData } = useCharacters();
  for (const [key, value] of Object.entries(data)) {
    state.value[key as keyof typeof DefaultState] = value as any;
    if (key === "chars") {
      createCharactersFromData(state.value.chars);
    }
  }
  // Perform standard version control to make sure additional fields not from the game are created
  state.value.version = "0.2.0";
  versionControl();
}
