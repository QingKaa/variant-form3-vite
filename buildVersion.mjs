import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';
import packageJson from "./package.json" assert { type: 'json' };

function getRootPath(...dir) {
  return path.resolve(process.cwd(), ...dir);
}

const runBuild = async () => {
  try {
    const OUTPUT_DIR = 'dist';

    const VERSION = 'version.json';

    const versionJson = {
      code:200,
      version: 'v' + packageJson.version,
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    fs.writeFileSync(getRootPath(`${OUTPUT_DIR}/${VERSION}`), JSON.stringify(versionJson));

    console.log(`version file is build successfully!`);
  } catch (error) {
    console.error('version build error:\n' + error);

    process.exit(1);
  }
};

runBuild();
