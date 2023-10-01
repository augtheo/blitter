import { Configuration } from "../generated-sources/openapi";

export interface ApiConfigurationFactory {
  createApiConfiguration(): Configuration | undefined; // Return type can be specific to your implementation
}
