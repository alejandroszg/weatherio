// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  weatherstack: {
    apiKey: '7c9a7ca75df7063938c75b736cb16da3', // Replace with your local dev key
    baseUrl: 'http://api.weatherstack.com/current',
  },
};
