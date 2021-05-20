import { Environment } from "src/app/shared/interfaces/environment.interface";

const baseUrl = 'http://localhost';

export const environment: Environment = {
  apiUrl: `${baseUrl}/api`,
  production: false
};
