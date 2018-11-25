import * as https from "https";
import * as express from "express";
import * as tls from "tls";

export const app = express();

app.get("/", (req, res)=>{
  const host   = req.query.host;
  const port   = req.query.port || 443;
  const method = req.query.method || "GET";
  console.log(req.query);
  if (host === undefined) {
    res.writeHead(400);
    res.write(`Error: Query parameter 'host' is required.\n`);
    res.write("e.g) /?host=example.com\n");
    res.write("e.g) /?host=example.com&port=443\n");
    res.end();
  } else {
    (async()=>{
      try {
        // Get certificate
        const cert = await getCertificate(host, port);
        // Return the cert JSON
        res.json(cert);
      } catch (err) {
        res.end(`Some error where host=${host}, port=${port}\n`);
      }
    })();
  }
  console.log(host, port, method);
});

/**
 * Get SLL certificate
 * @returns {Promise<"tls".PeerCertificate>}
 * @param host
 * @param port
 */
function getCertificate(host: string, port: number): Promise<tls.PeerCertificate>{
  // Create an option
  const options = {
    host: host,
    port: port,
    method: "GET",
    // (from: https://stackoverflow.com/a/11042814/2885946)
    rejectUnauthorized: false,
    agent: false
  };
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