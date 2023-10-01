import { Configuration } from "../generated-sources/openapi";
import { ApiConfigurationFactory } from "./ApiConfigurationFactory";

export default class JwtAuthApiConfigurationFactory
  implements ApiConfigurationFactory
{
  createApiConfiguration(): Configuration | undefined {
    const bearerToken = localStorage.getItem("blitter.auth.token");
    if (bearerToken != null) {
      return new Configuration({
        basePath: import.meta.env.VITE_APP_API_URL,
        accessToken: bearerToken,
      });
    }
    return undefined;
  }
}
