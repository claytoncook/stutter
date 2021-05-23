#!/usr/bin/env node

import { mkdir, writeFile, readFile, access } from 'fs';
import prompt from 'prompt';

const { argv: [node, stuttr, template, newFileName = "file"] } = process;
const dotStuttr = `${process.env.USERPROFILE}/.stuttr`;

function main() {
    access(dotStuttr, error => {
        if (error) {
            mkdir(dotStuttr, () => {
                console.log('Created .stuttr directory!');

                mkdir(`${dotStuttr}/templates`, () => {
                    console.log('Created .stuttr/templates directory');

                    mkdir(`${dotStuttr}/templates/test-template`, () => {
                        console.log('Created templates/test-template directory');

                        writeFile(`${dotStuttr}/templates/test-template/config.json`, '{ "type": ".txt", "args": ["Username", "Message"] }', error => {
                            if (error) return console.error(error);
                            console.log('Created test-template/config.json');

                            writeFile(`${dotStuttr}/templates/test-template/template.txt`, 'Hello, __0__! Welcome to Stuttr. Message: __1__', error => {
                                if (error) return console.error(error);
                                console.log('Created test-template/template.txt');

                                main();
                            });
                        });
                    });
                });
            });
        } else {
            if (template) {
                readFile(`${dotStuttr}/templates/${template}/config.json`, 'utf8', (error, data) => {
                    if (error) return console.error(error);

                    const { type, args } = JSON.parse(data);
                    readFile(`${dotStuttr}/templates/${template}/template${type}`, 'utf8', (error, data) => {
                        if (error) return console.error(error);

                        prompt.start();
                        prompt.get(args, (error, result) => {
                            if (error) return console.error(error);

                            for (let i = 0; i < Object.values(result).length; i++) {
                                data = data.split(`__${i}__`).join(`${Object.values(result)[i]}`);
                            }

                            writeFile(`${process.cwd()}/${newFileName}${type}`, data, error => {
                                if (error) return console.error(error);
                            });
                        });
                    });
                });
            } else {
                console.log('Please choose a valid template.');
                console.log('stuttr templateName newFileName');
            }
        }
    });
}

main();