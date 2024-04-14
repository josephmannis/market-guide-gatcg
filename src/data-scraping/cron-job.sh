#!/bin/bash

cd /Users/prince/Documents/dev/presentable-projects/market-guide/src/data-scraping/ || exit

tsx ./src/data-scraping/get-full-card-index.ts

cd ../../

git add .
git commit -m "Data Update: $(date)"
git push origin main