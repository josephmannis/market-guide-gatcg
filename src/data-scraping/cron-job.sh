#!/bin/bash

tsx ./src/data-scraping/get-full-card-index.ts

git add .
git commit -m "Data Update: $(date)"
git push origin main