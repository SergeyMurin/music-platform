import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

/**
 * Editing default.json file that must be in init folder of the module root
 *
 * Usage:
 *
 * await updateInitJSON(__dirname, [
 *
 *       {
 *         title: 'role',
 *         access: true,
 *       },
 *
 *     ]);
 * @param{string} filePath must be __dirname
 * @param{Array} newData
 * @returns {Promise<void>}
 */
export const updateInitJSON = async (filePath: string, newData: any[]) => {
  filePath = filePath.replace('\\dist', '') + process.env.MODEL_INIT_JSON_PATH;
  try {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        throw new Error(err.message);
      }

      const parsedData = JSON.parse(data);
      const updatedData = [...parsedData, ...newData];
      const updatedJSON = JSON.stringify(updatedData, null, 2);

      fs.writeFile(filePath, updatedJSON, 'utf8', (writeError) => {
        if (writeError) {
          throw new Error(err.message);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};
