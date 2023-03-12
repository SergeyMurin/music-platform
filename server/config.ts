import { config as configDev } from './src/shared/config/configDevelopment';
import { config as configProd } from './src/shared/config/configProduction';

export default process.env.NODE_ENV === 'production' ? configProd : configDev;
