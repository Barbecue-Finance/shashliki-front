import { Environment } from "src/app/shared/interfaces/environment.interface";

const baseUrl = 'http://akiana.io:8080';

export const environment: Environment = {
  apiUrl: `${baseUrl}/api`,
  production: false
};
