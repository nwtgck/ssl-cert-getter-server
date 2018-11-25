#!/usr/bin/env node
// (from: https://qiita.com/takayukioda/items/a149bc2907ef77121229)

import * as https from "https";
import * as express from "express";
import * as tls from "tls";

// TODO: Hard code
const httpPort = 8080;

const app = express();

// Run a server
const server = app.listen(httpPort, ()=>{
  console.log(`Listening on ${httpPort}...`);
});

app.get("/", (req, res)=>{
  const host   = req.query.host;
  const port   = req.query.port || 443;
  const method = req.query.method || "GET";
  console.log(req.query);
  if (host === undefined) {
    res.writeHead(400);
    res.write(`Error: query parameter 'host' should be specified.\n`);
    res.end("e.g) /?host=example.com&port=443&method=GET");
  } else {
    // Create an option
    const options = {
      host: host,
      port: port,
      method: method
    };
    (async()=>{
      try {
        // Get certificate
        const cert = await getCertificate(options); 
        // Return the cert JSON
        res.json(cert);
      } catch (err) {
        res.end(`Some error with ${JSON.stringify(options)}\n`);
      }
    })();
  }
  console.log(host, port, method);
});

/**
 * Get SLL certificate
 * @param {{host: string; port: number; method: "GET"}} options
 * @returns {Promise<"tls".PeerCertificate>}
 */
function getCertificate(options: {host: string, port: number, method: "GET"}): Promise<tls.PeerCertificate>{
  return new Promise<tls.PeerCertificate>((resolve, reject)=>{
    // Create request
    const req = https.request(options, function(res) {
      // Get certificate
      const cert = (res.connection as tls.TLSSocket).getPeerCertificate();
      // Resolve with the certificate
      resolve(cert);
      // Destroy connection
      res.connection.destroy();
    });
    req.on("error", (err)=>{
      // Pass the error
      reject(err);
    });
    // Finish request
    req.end();
  }); 
}
