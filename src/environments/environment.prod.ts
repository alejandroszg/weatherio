// Production environment file
// The API key will be injected at build time from Vercel environment variables

export const environment = {
  production: true,
  weatherstack: {
    apiKey: '%%WEATHERSTACK_API_KEY%%', // This will be replaced at build time
    baseUrl: 'http://api.weatherstack.com/current'
  }
};
