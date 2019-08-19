import { createHmac } from 'crypto';

export const encryptPassword = (password: string): string => {
  return createHmac('sha256', password).digest('hex');
};
