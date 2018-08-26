// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //assistanceApiUrl: 'https://api.econo.unlp.edu.ar/assistance/api/v1.0',
  assistanceApiUrl: 'http://localhost:9006/assistance/api/v1.0',
  oidp_issuer: 'https://oidp.econo.unlp.edu.ar',
  userinfoEndpoint: 'https://oidp.econo.unlp.edu.ar/userinfo',
  loginUrl: 'https://oidp.econo.unlp.edu.ar/oauth2/auth',
  logoutUrl: 'https://consent.econo.unlp.edu.ar/logout'
  // tokenEndpoint: 'https://oidp.econo.unlp.edu.ar/oauth2/auth'


};
