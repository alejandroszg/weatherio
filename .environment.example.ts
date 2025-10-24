/**
 * Environment configuration TEMPLATE
 *
 * Este archivo es una plantilla para configurar tu entorno local.
 *
 * INSTRUCCIONES DE USO:
 * 1. Copia este archivo y renómbralo a 'environment.ts'
 * 2. Obtén tu API key gratuita en: https://weatherstack.com/
 * 3. Reemplaza 'YOUR_API_KEY_HERE' con tu API key real
 * 4. NUNCA subas el archivo environment.ts a GitHub
 */
export const environment = {
  production: false,

  weatherstack: {
    /**
     * Tu API key personal de WeatherStack
     * Plan free: 1000 requests/mes
     * Obtén la tuya en: https://weatherstack.com/product
     */
    apiKey: 'YOUR_API_KEY_HERE',

    /**
     * URL base del endpoint de clima actual
     */
    baseUrl: 'http://api.weatherstack.com/current'
  }
};
