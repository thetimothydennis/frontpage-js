#!/bin/bash

npm run kill
cd client
npm run build
cd ..
npm run serve
