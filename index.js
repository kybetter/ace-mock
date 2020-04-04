#! /usr/bin/env node

const yargsParser = require('yargs-parser')
const run = require('./server/app')

const argv = yargsParser(process.argv.slice(2));

const config = {
  port: argv.port || 12345,
};

run(config);
