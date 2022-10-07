const fs = require('fs');
const readline = require('readline');

async function processLineByLine(filename) {
  const fileStream = fs.createReadStream(filename);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let errorsIds = '';

  for await (const line of rl) {
    //console.log(`Line from file: ${line}`);
    if (line.includes("['radiologist_name', 'radiologist_crm_state', 'radiologist_crm_number']")) {
        //console.log(`Linha: ${line.slice(11, 19)}`);
        errorsIds += line.slice(11, 19) + ', ';
    }
  }
  
  return (errorsIds.slice(0, -2));
}

processLineByLine('log_error_20220909_181953.txt');
