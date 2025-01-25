const fs = require('fs');
const path = require('path');

// Function to update .env file
function updateEnvFile(newApiKey) {
  const envPath = path.resolve(__dirname, '.env');
  
  // Read existing content
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace or add Gemini API key
  if (envContent.includes('REACT_APP_GEMINI_API_KEY=')) {
    envContent = envContent.replace(
      /REACT_APP_GEMINI_API_KEY=.*/, 
      `REACT_APP_GEMINI_API_KEY=${newApiKey}`
    );
  } else {
    envContent += `\nREACT_APP_GEMINI_API_KEY=${newApiKey}`;
  }
  
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('Gemini API Key updated successfully!');
}

// Check if a new API key is provided as an argument
const newApiKey = process.argv[2];

if (!newApiKey) {
  console.error('Please provide a new Gemini API key as an argument.');
  process.exit(1);
}

// Update the .env file
updateEnvFile(newApiKey);
