import * as fs from 'fs';

function error(...args: any[]): void {
  console.error('\x1b[31m%s\x1b[0m', ...args);
}

function readFileToPromise(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      // @ts-ignore
      resolve(data);
    });
  });
}

function diffFiles(refFile: string, diffFile: string): void {
  console.log('Diff tool');
  Promise.all([
    readFileToPromise(refFile),
    readFileToPromise(diffFile)
  ]).then(([refBuf, diffBuf]) => {
    console.log('Files Loaded');
    const refObj = JSON.parse(refBuf);
    const diffObj = JSON.parse(diffBuf);
    console.log('Files Parsed');
    diffObjects(refObj, diffObj);
  });
}

function diffObjects(ref: any, diff: any, path: string = ''): void {
  Object.entries(ref).forEach(([key, value]) => {
    const pathStr = path !== '' ? `${path}.${key}` : key;
    if (diff[key] === undefined) {
      error(`missing ${pathStr}`);
      return;
    }
    if (typeof value !== typeof diff[key]) {
      error(`Different types for ${pathStr} - ${typeof value} ≠ ${typeof diff[key]}`);
      return;
    }
    if (typeof value === 'object') {
      diffObjects(value, diff[key], pathStr);
    }
  });
}

const [file1, file2] = process.argv.slice(-2);

diffFiles(file1, file2);
