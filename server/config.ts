import { config as configDev } from './src/config/config.development';
import { config as configProd } from './src/config/config.production';

export default process.env.NODE_ENV === 'production' ? configProd : configDev;
