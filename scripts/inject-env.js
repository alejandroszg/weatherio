#!/usr/bin/env node

/**
 * This script injects environment variables into the production environment file
 * It runs before the build process in Vercel
 */

const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, '../src/environments/environment.prod.ts');

// Read the environment file
let envFileContent = fs.readFileSync(envFilePath, 'utf8');

// Replace placeholders with actual environment variables
const apiKey = process.env.WEATHERSTACK_API_KEY || '';

if (!apiKey) {
  console.error('ERROR: WEATHERSTACK_API_KEY environment variable is not set!');
  process.exit(1);
}

envFileContent = envFileContent.replace('%%WEATHERSTACK_API_KEY%%', apiKey);

// Write the updated content back
fs.writeFileSync(envFilePath, envFileContent, 'utf8');

console.log('✓ Environment variables injected successfully');
