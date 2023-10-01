import { Configuration } from "../generated-sources/openapi";
const configuration = new Configuration({
  basePath: import.meta.env.VITE_APP_API_URL,
});

export default configuration;
