#!/usr/bin/env node
// (from: https://qiita.com/takayukioda/items/a149bc2907ef77121229)

import {app} from "./ssl-cert-getter"

// TODO: Hard code
const httpPort = 8080;

// Run a server
const server = app.listen(httpPort, ()=>{
  console.log(`Listening on ${httpPort}...`);
});
