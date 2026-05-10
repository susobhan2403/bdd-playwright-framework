import dotenv from 'dotenv';

dotenv.config({ override: true });

interface Config {
  APP_ENV: string;
  BASE_URL: string;
  API_BASE_URL: string;
  USERNAME: string;
  PASSWORD: string;
  BROWSER: string;
  HEADLESS: boolean;
  DEFAULT_TIMEOUT: number;
}

const config: Config = {
  APP_ENV: process.env.APP_ENV || 'qa',
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com/',
  API_BASE_URL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  USERNAME: 'standard_user',
  PASSWORD: 'secret_sauce',
  BROWSER: process.env.BROWSER || 'chromium',
  HEADLESS: process.env.HEADLESS === 'true',
  DEFAULT_TIMEOUT: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
};

export default config;