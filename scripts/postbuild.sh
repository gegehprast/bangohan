#!/usr/bin/env bash

# Make executable
chmod +x build/gohan

# Copy the styles to the build directory
rm -rf build/styles
cp src/styles build/styles -r
