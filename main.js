/**
 * Цитата RIVZOR (https://lolz.guru/members/3043646/):
 * Часть с созданием кода взаимствована у пользователя SerdarAD
 * Я лишь доработал это, чтобы постоянно не запускать по новой
 * И сделал удобную запись в файл, при необходимости, можно все поменять, если, конечно, руки из нужного места.

 * Код наипростейший, как по мне.
 * Удачного пользования.


 * Я доработал изменненый скрипт rivzor
 * Убрал все что не нужно, сделал возможность использования под линуксом
 * 
 * Ported to JS by BigBrainAFK
 * Original URL: https://replit.com/@SerdarAD/WarpKeyGen?v=1#main.py
*/

import fetch from 'node-fetch';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
const ppkeys = await fetch('https://Keyses-for-generator.serdarad.repl.co');
let pkeys = await ppkeys.text();
const keys = pkeys.split(',');
const gkeys = [];
console.clear();
console.log("\n█░█░█ ▄▀█ █▀█ █▀█ ▄█▄\n▀▄▀▄▀ █▀█ █▀▄ █▀▀ ░▀░\n");
console.log('CREEPER (https://lolz.guru/creeper/) AND RIVZOR (https://lolz.guru/members/3043646/)');
console.log('\n');

const value_int = Number(await rl.question("Welcome to the WARP+ Generator\nHow many keys do you want?: "));
for (let a = 1; a <= value_int; a++) {
    console.log("<======================================WARP+ Generate=============================================>");
    console.log("Key being created:", a);

    try {
        const headers = {
            "CF-Client-Version": "a-6.11-2223",
            "Host": "api.cloudflareclient.com",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1",
        };

        const baseURL = 'https://api.cloudflareclient.com/v0a2223';

        let r = await (await fetch(baseURL + "/reg", {method: 'POST', headers})).json();
        const id = r["id"];
        let license = r["account"]["license"];
        const token = r["token"];

        r = await (await fetch(baseURL + "/reg", {method: 'POST', headers})).json();
        const id2 = r["id"];
        const token2 = r["token"];

        const headers_get = {"Authorization": `Bearer ${token}`};
        const headers_get2 = {"Authorization": `Bearer ${token2}`};
        const headers_post = {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`,
        };

        let json = {"referrer": `${id2}`};
        await fetch(baseURL + `/reg/${id}`, {
            method: 'PATCH',
            headers: headers_post,
            body: JSON.stringify(json)
        });

        await fetch(baseURL + `/reg/${id2}`, {
            method: 'DELETE',
            headers: headers_get2
        });

            
        let key = keys[Math.floor(Math.random()*keys.length)];
        //console.log(key)

        json = {"license": `${key}`};
        await fetch(baseURL + `/reg/${id}/account`, {
            method: 'PUT',
            headers: headers_post,
            body: JSON.stringify(json)
        });

        json = {"license": `${license}`};
        await fetch(baseURL + `/reg/${id}/account`, {
            method: 'PUT',
            headers: headers_post,
            body: JSON.stringify(json)
        });

        r = await (await fetch(baseURL + `/reg/${id}/account`, {headers: headers_get})).json();
        //console.log(r);
        const account_type = r["account_type"];
        const referral_count = r["referral_count"];
        license = r["license"];

        if (referral_count === 1) {
            a--;
            continue;
        }

        await fetch(baseURL + `/reg/${id}`, {
            method: 'DELETE',
            headers: headers_get
        });

        console.log(`Account type: ${account_type}`);
        console.log(`Referral count: ${referral_count} referral(s)`);
        // {license}
        console.log(`License: ${license}`);

        if (a % 2 == 0 && a < value_int) {
            var waitTill = new Date(new Date().getTime() + 60 * 1000);
            while(waitTill > new Date()){}
        }
        gkeys.push(license);
    } catch (ex) {
        console.error(ex);
        console.log("Error.");
    }
}

console.clear();
for (let x of gkeys)
    console.log(x);

console.log('Do you want a comma seperated list?[y\\n]');
let a = await rl.question('');
if( a == "y") {
    for (z in Array(10))
        console.log('\n');
    console.log(gkeys.join(', '));
}

await rl.question('\nPress Enter to exit\n');
process.exit();