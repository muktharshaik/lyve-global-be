import * as fs from 'fs';
import path from 'path';
import { Restaurant } from '../types/dataTypes';

const filePath = path.resolve(__dirname, '../../../../src/data/data.json');

export default function writeData(
  data: Restaurant[]
): Promise<{ response: boolean; message: string | NodeJS.ErrnoException }> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), 'utf8', (err) => {
      if (err) {
        reject({ response: false, message: err });
      } else {
        resolve({ response: true, message: 'Data updated successfully!' });
      }
    });
  });
}
