const { exec } = require('node:child_process');
const fs = require('fs');

let numTestnets = 11;
let promises = [];
const TESTNET_PREFIX = 'first-remix-challenges-';
for(let i = 0; i < numTestnets; i++) {
    promises.push(new Promise((resolve, reject) => {
        const testnetName = TESTNET_PREFIX + i;
        exec(`harbor quickstart ${testnetName}`, (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject();
                return;
            }
            if(stdout.length > 0) {
                const url = stdout.split('\n').find(x => x.startsWith('http'));
                resolve({url, testnetName});
            }
            else {
                reject();
            }
        });
    }));
}

Promise.allSettled(promises).then(async (results) => {
    const networks = {};
    const fulfilled = results.filter(x => x.status === 'fulfilled');
    for(let i = 0; i < fulfilled.length; i++) {
        const { testnetName, url } = fulfilled[i].value;
        networks[testnetName] = { url };
    }
    fs.writeFileSync('./networks.json', JSON.stringify(networks, null, 2));
    for(let i = 0; i < fulfilled.length; i++) {
        const { testnetName } = fulfilled[i].value;
        exec(`npx hardhat run deploy/deploy.js --network ${testnetName}`, (error, stdout, stderr) => {
            console.log(testnetName);
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }
});