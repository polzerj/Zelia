#!/usr/bin/env zsh
rm -rf ./dist
cp -rf ./src ./dist
rm ./dist/**/*.ts
tsc

