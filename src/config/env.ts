import dotenv from 'dotenv';

dotenv.config();

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
  BASE_URL: process.env.BASE_URL || '',
  API_BASE_URL: process.env.API_BASE_URL || '',
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  BROWSER: process.env.BROWSER || 'chromium',
  HEADLESS: process.env.HEADLESS === 'true',
  DEFAULT_TIMEOUT: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
};

export default config;