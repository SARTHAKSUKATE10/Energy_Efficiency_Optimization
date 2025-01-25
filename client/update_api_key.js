const fs = require('fs');
const path = require('path');

// Function to update .env file
function updateEnvFile(newApiKey) {
  const envPath = path.resolve(__dirname, '.env');
  const envContent = `REACT_APP_OPENAI_API_KEY=${newApiKey}`;
  
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('API Key updated successfully!');
}

// Check if a new API key is provided as an argument
const newApiKey = process.argv[2];

if (!newApiKey) {
  console.error('Please provide a new API key as an argument.');
  process.exit(1);
}

// Update the .env file
updateEnvFile(newApiKey);
