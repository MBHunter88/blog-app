#!/bin/bash
set -e
set -x

echo "Current directory: $(pwd)"
ls -la

# Install and build the frontend
cd ../client
npm install
npm run build

# Copy dist to server folder
rm -rf ../server/client-dist
cp -r dist ../server/client-dist

# Go back to root, then into server to install backend deps
cd ..
cd server
npm install