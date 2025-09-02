#!/usr/bin/env bash

mkdir -p build

ags bundle --root ./ --gtk 4 ./src/app.tsx build/gohan
