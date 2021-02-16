// Basic script that runs set-env.ts in all apps to generate the config files for tests
import { exec } from 'child_process';
import { readdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const dirs = readdirSync('./apps')
  .map(d => resolve(__dirname, 'apps', d, 'set-env.ts'))
  .filter(f => existsSync(f));
dirs.forEach(d => {
  const q = `npx ts-node --project tsconfig.node.json ${d}`;
  exec(q, (err, stdOut, stdErr) => {
    if (err) { console.error(d, err, stdErr); throw err; }
    console.log(stdOut);
  });
});
