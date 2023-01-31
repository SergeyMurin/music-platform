import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: 'postgres' as Dialect,
    host: 'localhost',
    port: 5555,
    username: 'postgres',
    password: 'admin',
    database: 'music-platform',
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
