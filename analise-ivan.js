const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function processLineByLine(filename) {
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let errorsIds = '';

    for await (const line of rl) {
        if (line.includes("['radiologist_name', 'radiologist_crm_state', 'radiologist_crm_number']")) {
            errorsIds += line.slice(11, 19) + ', ';
        }
    }

    return (errorsIds.slice(0, -2));
}


async function readFilesFromDir(dirName) {
    const directoryPath = path.join(__dirname, dirName);
    await fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log(err);
        }

        return files;
    });
}