import { Environment } from "src/app/shared/interfaces/environment.interface";

const baseUrl = 'http://localhost:5080';

export const environment: Environment = {
  apiUrl: `${baseUrl}/api`,
  production: false
};
