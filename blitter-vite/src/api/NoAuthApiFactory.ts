import { Configuration } from "../generated-sources/openapi";
import { ApiConfigurationFactory } from "./ApiConfigurationFactory";

export default class NoAuthApiConfigurationFactory
  implements ApiConfigurationFactory
{
  createApiConfiguration(): Configuration | undefined {
    const configuration = new Configuration({
      basePath: import.meta.env.VITE_APP_API_URL,
    });
    return configuration;
  }
}
