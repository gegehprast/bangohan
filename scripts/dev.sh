#!/usr/bin/env bash

# Create Gohan directory in local share
mkdir -p ~/.local/share/gohan

# Copy the styles to the local share directory
cp src/styles/. ~/.local/share/gohan/styles -r

# Run ags
ags run ./src/app.tsx --gtk 4
