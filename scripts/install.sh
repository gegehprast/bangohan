#!/usr/bin/env bash

# Remove old installation
rm -rf ~/.local/share/gohan

# Create the directory for the new installation
mkdir -p ~/.local/share/gohan

# Copy the built files to the new installation directory
cp build/. ~/.local/share/gohan -r
