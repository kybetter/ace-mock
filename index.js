#! /usr/bin/env node

const yargsParser = require('yargs-parser')
const path = require('path')
const run = require('./server/app')

const argv = yargsParser(process.argv.slice(2));

const context = {
  port: argv.port || 12345,
};

run(context);
