import { Sequelize } from 'sequelize-typescript';
import { Track } from '../track/track.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5555,
        username: 'postgres',
        password: 'admin',
        database: 'music-platform',
      });

      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

      sequelize.addModels([Track]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
