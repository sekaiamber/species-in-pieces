#!/bin/bash

CurDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo Work Dir: ${CurDir}

echo ""
echo 1. Convert Svg images to Json...
echo ""
node ${CurDir}/convertSvg2Json.js
rm -rf ${CurDir}/../root/index/species/data
cp -r ${CurDir}/out_images ${CurDir}/../root/index/species/data


echo ""
echo All Done.
echo ""

