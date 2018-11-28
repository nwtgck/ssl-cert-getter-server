# ssl-cert-getter-server
[![npm](https://img.shields.io/npm/v/ssl-cert-getter-server.svg)](https://www.npmjs.com/package/ssl-cert-getter-server)
 [![Build Status](https://travis-ci.com/nwtgck/ssl-cert-getter-server.svg?token=TuxNpqznwwyy7hyJwBVm&branch=develop)](https://travis-ci.com/nwtgck/ssl-cert-getter-server) 
[![Docker Automated build](https://img.shields.io/docker/automated/nwtgck/ssl-cert-getter-server.svg)](https://hub.docker.com/r/nwtgck/ssl-cert-getter-server/)
 [![](https://images.microbadger.com/badges/image/nwtgck/ssl-cert-getter-server.svg)](https://microbadger.com/images/nwtgck/ssl-cert-getter-server "Get your own image badge on microbadger.com")

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)  

A Sever Getting SSL Certificate

![A Server Getting SSL Certificate](demo-images/ssl-cert-getter-server.gif)  

Response returned in Chrome Chrome is formated by [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc), a Chrome Extension. You can get information about the certificate of example.com:443, which contains expire date and etc.

## Quick Start

Access to <https://ssl-cert.glitch.me/?host=example.com> and get a JSON of SSL certificate info.

## Run Server 

### Way 1: Run server from source 

Run a server from the latest source.

```bash
# Clone this repository
git clone https://github.com/nwtgck/ssl-cert-getter-server.git 
# Go to the directory
cd ssl-cert-getter-server 
# Install dependencies
npm install
# Run a server
npm start
```
