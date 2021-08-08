import { Environment } from "src/app/shared/interfaces/environment.interface";

const baseUrl = 'http://memorize-cards.fun:8080';

export const environment: Environment = {
  apiUrl: `${baseUrl}/api`,
  production: false
};
