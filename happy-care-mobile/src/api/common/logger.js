/* eslint-disable no-console */
import moment from 'moment';

const Info = (info) => {
  const now = moment().format('DD/MM/YYYY HH:mm:ss');
  console.info(`[INFO ${now}]: ${info}`);
};

const Warning = (warning) => {
  const now = moment().format('DD/MM/YYYY HH:mm:ss');
  console.warn(`[WARNING ${now}]:  ${warning}`);
};

const Error = (error) => {
  const now = moment().format('DD/MM/YYYY HH:mm:ss');
  console.error(`[ERROR ${now}]:  ${error}`);
};

export default {
  Info,
  Warning,
  Error,
};
