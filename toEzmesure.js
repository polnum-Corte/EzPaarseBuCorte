const fs = require('fs');
const ezmesure = require('ezmesure');
var path = require('path');


const token = process.env.EZMESURE_TOKEN;
const indexId = process.env.EZMESURE_INDEX_ID;

const csvFolderPath = `./csv/fraka202403`;

fs.readdir(csvFolderPath, (err, files) => {
    if (err) {
      console.error(`Could not list the directory: ${err}`);
      return;
    }
    files.map((file, index) => {
      // Vérifiez que le fichier est un .csv
      if (path.extname(file) === '.csv') {
        const filePath = path.join(csvFolderPath, file);
        const readStream = fs.createReadStream(filePath);

        ezmesure.indices.insert(readStream, indexId , {token: token})
          .then(response => {
            console.log(`File ${file} successfully sent to Ezmesure: ${response}`);
          })
          .catch(err => {
            console.error(`Error sending file ${file} to Ezmesure: ${err}`);
          });
      }
    })
  })
