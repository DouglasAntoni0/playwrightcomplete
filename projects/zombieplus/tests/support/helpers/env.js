const path = require('path');
const dotenv = require('dotenv');

let loaded = false;

function loadEnv() {
  if (loaded) return;

  const envPaths = [
    path.resolve(__dirname, '../../../.env'),
    path.resolve(__dirname, '../../../../../.env'),
  ];

  for (const envPath of envPaths) {
    const result = dotenv.config({
      path: envPath,
      quiet: true,
    });

    if (!result.error) {
      loaded = true;
      return;
    }
  }

  dotenv.config({ quiet: true });
  loaded = true;
}

module.exports = loadEnv;
