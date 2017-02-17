#!/bin/bash

CurDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo Work Dir: ${CurDir}

echo ""
echo 1. Convert Svg images to JSON...
echo ""
node ${CurDir}/convertSvg2Json.js

echo ""
echo 2. Process Svg images JSON data...
echo ""
node ${CurDir}/midJsonImage.js

echo ""
echo 3. Copy final data files...
echo ""
rm -rf ${CurDir}/../root/index/species/data
cp -r ${CurDir}/out_images ${CurDir}/../root/index/species/data


echo ""
echo All Done.
echo ""

