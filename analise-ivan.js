const fs = require('fs');
const readline = require('readline');
const path = require('path');

const directoryPath = path.join(__dirname, "logs");
const arrayFiles = [
    'log_error_20220909_181953.txt',
    'log_error_20220909_185353.txt',
    'log_error_20220912_161745.txt',
    'log_error_20220912_172912.txt',
    'log_error_20220912_192402.txt',
    'log_error_20220913_113825.txt',
    'log_error_20220913_120640.txt',
    'log_error_20220913_122039.txt',
    'log_error_20220913_122233.txt',
    'log_error_20220913_140035.txt',
    'log_error_20220913_142457.txt',
    'log_error_20220913_143211.txt',
    'log_error_20220913_145247.txt',
    'log_error_20220913_150100.txt',
    'log_error_20220913_155832.txt',
    'log_error_20220913_160202.txt',
    'log_error_20220913_170201.txt',
    'log_error_20220913_170401.txt',
    'log_error_20220913_171235.txt',
    'log_error_20220913_171713.txt',
    'log_error_20220913_174939.txt',
    'log_error_20220913_181159.txt',
    'log_error_20220913_183459.txt',
    'log_error_20220913_195055.txt',
    'log_error_20220913_200437.txt',
    'log_error_20220914_111637.txt',
    'log_error_20220914_112603.txt',
    'log_error_20220914_112731.txt',
    'log_error_20220914_113026.txt',
    'log_error_20220914_113531.txt',
    'log_error_20220914_113836.txt',
    'log_error_20220914_125742.txt',
    'log_error_20220914_130526.txt',
    'log_error_20220914_134036.txt',
    'log_error_20220914_140610.txt',
    'log_error_20220914_143233.txt',
    'log_error_20220914_145910.txt',
    'log_error_20220914_150116.txt',
    'log_error_20220914_155227.txt',
    'log_error_20220914_160306.txt',
    'log_error_20220914_162711.txt',
    'log_error_20220914_170851.txt',
    'log_error_20220914_171121.txt',
    'log_error_20220914_173126.txt',
    'log_error_20220914_174444.txt',
    'log_error_20220914_175631.txt',
    'log_error_20220914_180641.txt',
    'log_error_20220914_182029.txt',
    'log_error_20220914_183638.txt',
    'log_error_20220915_111153.txt',
    'log_error_20220915_122412.txt',
    'log_error_20220915_144109.txt'
];

async function processLineByLine(filename) {
    const fileStream = fs.createReadStream(filename);

    const rl = await readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let errorsIds = [];

    for await (const line of rl) {
        if (line.includes("['radiologist_name', 'radiologist_crm_state', 'radiologist_crm_number']")) {
            idInt = parseInt(line.slice(11, 19));
            errorsIds.push(idInt);
        }
    }

    return errorsIds;
}

async function main() {
    let ids = [];

    for (const item of arrayFiles) {
        newIds = await processLineByLine(directoryPath + "\\" + item);
        ids = [...ids, ...newIds];
    }

    fs.writeFileSync('laudos-com-erro.txt', ids.toString());
}

main();