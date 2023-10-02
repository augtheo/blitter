import { Configuration } from "../generated-sources/openapi";
import JwtAuthApiConfigurationFactory from "./JwtAuthApiConfigurationFactory";
import NoAuthApiConfigurationFactory from "./NoAuthApiFactory";

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
