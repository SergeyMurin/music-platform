import { config as configDev } from './src/shared/config/dev.config';
import { config as configProd } from './src/shared/config/prod.config';

export default process.env.NODE_ENV === 'production' ? configProd : configDev;
