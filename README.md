# https-auth-downloader-proxy

A simple proxy server that allows me to download a file through my VPS.

## Why

Downloading torrents from my seedbox was very slow, but downloading to my VPS then downloading to my local box was much much faster.

Typical download speed from my seedbox was aour 100 Kb/s whereas downloading through this proxy resulted in downloading at 2 Mb/s.

My other requirement was that I wanted to download files from my VPS to my local computer via HTTPS and didn't want other users to connect and user this without a password so HTTP Auth is also included.

## Setup

    git clone https://github.com/silas/https-auth-proxy-downloader.git
    
    npm install
    
build some secure certificates:

    openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
    openssl rsa -passin pass:x -in server.pass.key -out server.key

insert some data, not all data needs to be answered

    openssl req -new -key server.key -out server.csr

    openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

keys have been generated, now start the server:

    node index.js

now you can connect with the client and download a file.

You can adjust the server port, username, and password inside the `index.js` file.

Using proxy:

    curl -k -u silasb:1337 -O http://duh:8001/domain/file_to_download
