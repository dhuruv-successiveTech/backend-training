import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from 'url';
import YAML from "yamljs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDoc = YAML.load(path.join(__dirname, "../../swagger.yaml"));

export { swaggerUi, swaggerDoc as specs };
