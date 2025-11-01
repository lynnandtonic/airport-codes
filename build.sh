#!/bin/bash
set -ex

rm -rf build
mkdir -p build/images

node build.js

for jpg in ./assets/images/large/*.jpg; do
    filename=`basename $jpg .jpg`
    card="./assets/images/card/${filename}.avif"
    medium="./assets/images/medium/${filename}.jpg"

    if [ ! -f "$card" ]; then
        npx -y sharp-cli -i "$jpg" -o assets/images/card --format avif --quality 40 --effort 6 --chromaSubsampling "4:2:0" resize --height 220
    fi

    if [ ! -f "$medium" ]; then
        npx -y sharp-cli -i assets/images/large/*.jpg -o assets/images/medium --format jpeg --mozjpeg resize 900
    fi
done

cp -rp assets/images/card build/images
cp -rp assets/images/medium build/images
cp assets/images/*.{gif,svg,jpg,png} build/images

cp assets/CNAME build
cp assets/favicon.ico build
cp _redirects build
