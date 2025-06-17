#!/bin/bash
set -e
set -x

echo "Current directory: $(pwd)"
ls -la

# Install and build the frontend
cd /app/client
npm install
npm run build

# Copy dist to server folder
rm -rf /app/server/client-dist
cp -r dist /app/server/client-dist

# Install backend deps
cd /app/server
npm install