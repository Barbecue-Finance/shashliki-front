import { Environment } from "src/app/shared/interfaces/environment.interface";

const baseUrl = 'https://memorize-cards.fun:5443';

export const environment: Environment = {
  apiUrl: `${baseUrl}/api`,
  production: false
};
