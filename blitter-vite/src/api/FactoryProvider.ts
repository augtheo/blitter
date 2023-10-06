import { Configuration } from "../generated-sources/openapi";

export interface ApiConfigurationFactory {
  createApiConfiguration(): Configuration | undefined; // Return type can be specific to your implementation
}
class JwtAuthApiConfigurationFactory implements ApiConfigurationFactory {
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

class NoAuthApiConfigurationFactory implements ApiConfigurationFactory {
  createApiConfiguration(): Configuration | undefined {
    const configuration = new Configuration({
      basePath: import.meta.env.VITE_APP_API_URL,
    });
    return configuration;
  }
}

const providers = [
  JwtAuthApiConfigurationFactory,
  NoAuthApiConfigurationFactory,
];

export function getApiConfigurationFactory(): Configuration | undefined {
  for (var provider of providers) {
    const configuration = new provider().createApiConfiguration();
    if (configuration != undefined) {
      return configuration;
    }
    return undefined;
  }
}
