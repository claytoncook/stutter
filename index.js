#!/usr/bin/env node

import { mkdir, writeFile, readFile, access } from 'fs';
import prompt from 'prompt';

const { argv: [node, stutter, template, newFileName = "file"] } = process;
const dotStutter = `${process.env.USERPROFILE}/.stutter`;

function main() {
    access(dotStutter, error => {
        if (error) {
            mkdir(dotStutter, () => {
                console.log('Created .stutter directory!');

                mkdir(`${dotStutter}/templates`, () => {
                    console.log('Created .stutter/templates directory');

                    mkdir(`${dotStutter}/templates/test-template`, () => {
                        console.log('Created templates/test-template directory');

                        writeFile(`${dotStutter}/templates/test-template/config.json`, '{ "type": ".txt", "args": ["Username", "Message"] }', error => {
                            if (error) return console.error(error);
                            console.log('Created test-template/config.json');

                            writeFile(`${dotStutter}/templates/test-template/template`, 'Hello, __0__! Welcome to Stutter. Message: __1__', error => {
                                if (error) return console.error(error);
                                console.log('Created test-template/template');

                                main();
                            });
                        });
                    });
                });
            });
        } else {
            if (template) {
                readFile(`${dotStutter}/templates/${template}/config.json`, 'utf8', (error, data) => {
                    if (error) return console.error(error);

                    const { type, args } = JSON.parse(data);
                    readFile(`${dotStutter}/templates/${template}/template`, 'utf8', (error, data) => {
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
                console.log('stutter templateName newFileName');
            }
        }
    });
}

main();