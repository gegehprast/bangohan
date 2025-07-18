#!/usr/bin/env bash

# Create Bangohan directory in local share
# mkdir -p ~/.local/share/bangohan

# Copy the styles to the local share directory
# cp src/styles/. ~/.local/share/bangohan/styles -r

# Run ags
ags run ./src/app.ts --gtk 4
