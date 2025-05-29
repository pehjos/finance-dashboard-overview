#!/bin/bash

echo "Running Jest tests..."
npm test

echo "Running tests with coverage..."
npm run test:coverage

echo "Running tests in watch mode..."
npm run test:watch
