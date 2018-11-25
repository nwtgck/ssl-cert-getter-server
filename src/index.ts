#!/usr/bin/env node
// (from: https://qiita.com/takayukioda/items/a149bc2907ef77121229)

import * as yargs from "yargs";
import {app} from "./ssl-cert-getter"

// Create option parser
const parser = yargs
  .option("http-port", {
    describe: 'Port of HTTP server',
    default: 8080
  });

// Parse arguments
const args = parser.parse(process.argv);

const httpPort: number = args["http-port"];

// Run a server
const server = app.listen(httpPort, ()=>{
  console.log(`Listening on ${httpPort}...`);
});


// Not to down whole server
process.on('uncaughtException', function (err) {
  console.error('on uncaughtException: ', err);
});
