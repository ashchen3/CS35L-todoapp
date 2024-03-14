#!/bin/bash

echo "starting backend"
cd backend
npm install
npm start &

echo "starting frontend"
cd ../client
npm install
npm start
