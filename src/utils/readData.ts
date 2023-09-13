import * as fs from 'fs';
import path from 'path';

const filePath = path.resolve(__dirname, '../../../../src/data/data.json');

export default function readData(): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
