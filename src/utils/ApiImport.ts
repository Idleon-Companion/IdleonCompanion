import { DefaultState, useState } from "~/State";
import { useCharacters } from "~/composables/Characters";
import Ajv from "ajv";
import apiSchema from "~/utils/ApiSchema.json";

type ImportData = Partial<typeof DefaultState>;

const ajv = new Ajv();
// TODO: decide on how we want to do semantic versioning for the API schema
// const API_VERSION = 1;

export const validateImportData = ajv.compile<ImportData>(apiSchema);

export function updateStateFromImportData(data: ImportData) {
  const state = useState();
  const { createCharactersFromData } = useCharacters();
  for (const [key, value] of Object.entries(data)) {
    if (key === "version") {
      // For now, we don't check or validate the version (see above comment)
      continue;
    }
    state.value[key as keyof typeof DefaultState] = value as any;
    if (key === "chars") {
      createCharactersFromData(state.value.chars);
    }
  }
}
