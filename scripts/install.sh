#!/usr/bin/env bash

# Remove old installation
rm -rf ~/.local/share/bangohan

# Create the directory for the new installation
mkdir -p ~/.local/share/bangohan

# Copy the built files to the new installation directory
cp build/. ~/.local/share/bangohan -r
