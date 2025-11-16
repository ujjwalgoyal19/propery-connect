import Twilio from 'twilio';

import { env } from './env';

const twilio = Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

export default twilio;
