#!/usr/bin/sh
rm -rf ./session ./system/data/images/brats/*
touch ./system/data/images/brats/verify
echo '[]' > ./system/data/users.json
