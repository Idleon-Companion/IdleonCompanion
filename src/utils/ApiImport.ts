import Ajv from "ajv";
import apiSchema from "~/utils/ApiSchema.json";

const ajv = new Ajv();

export const validateApiImportJSON = ajv.compile(apiSchema);
