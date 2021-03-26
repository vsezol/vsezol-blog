import * as path from 'path';
import * as fs from 'fs';
import * as matter from 'gray-matter';

export async function getFiles() {
  const pathToFiles = path.resolve('../posts');

  const fileNames: string[] = await new Promise((res, rej) => {
    fs.readdir(pathToFiles, (err, files) => {
      if (err) rej(err);
      else res(files);
    });
  });

  const filePaths = fileNames.map((name: string) =>
    path.resolve(pathToFiles, name)
  );

  const files = await Promise.all(filePaths.map(path => matter.read(path)));

  return files;
}
