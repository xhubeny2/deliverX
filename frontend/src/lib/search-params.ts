import { parseAsString } from 'nuqs';

export const runSearchParams = {
  action: parseAsString, // 'generate'
  driverId: parseAsString, // driver ID, eg. 'cm3u8a...'
};
