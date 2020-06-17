import { exec as nodeExec } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import { INFURA_PROJECT_ID } from '../src/constants';

const REPOSITORY_URL = 'https://github.com/ethereum-lists/chains.git';
const REPOSITORY_PATH = join(__dirname, '../.cache/ethereum-lists/chains');
const OUTPUT_PATH = join(__dirname, '../networks.json');

const exec = (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    nodeExec(command, error => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
};

const clone = async (url: string, path: string): Promise<void> => {
  return exec(`git clone ${url} ${path}`);
};

const exists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

const run = async () => {
  if (!(await exists(REPOSITORY_PATH))) {
    await clone(REPOSITORY_URL, REPOSITORY_PATH);
  }

  const fullPath = join(REPOSITORY_PATH, '_data/chains');
  const files = await fs.readdir(fullPath);

  const jsonObjects = await Promise.all(
    files.map(async file => {
      const filePath = join(fullPath, file);
      const content = await fs.readFile(filePath, 'utf8');
      return JSON.parse(content);
    })
  );

  const networks = jsonObjects
    .filter(network => network.rpc.length > 0)
    .map(network => {
      return {
        ...network,
        rpc: [...network.rpc.map((url: string) => url.replace('${INFURA_API_KEY}', INFURA_PROJECT_ID))]
      };
    });

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(networks, null, 2), 'utf8');
};

// tslint:disable-next-line:no-console
run().catch(console.error);
