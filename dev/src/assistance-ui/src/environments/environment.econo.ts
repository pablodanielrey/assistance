export const environment = {
  production: true,
  assistanceApiUrl: 'https://api.econo.unlp.edu.ar/assistance/api/v1.0',
  oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',
  loginApiUrl: 'https://api.econo.unlp.edu.ar/login/api/v1.0',
  telegramURL: 'https://telegram.me/AsistenciaFCEBot?start=',
  client_id: 'assistance-ui',

  lugar: 'econo',

  usersLink: 'https://usuarios.econo.unlp.edu.ar',

  footer: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos | FCE',

  loaderHeader: 'Asistencia | FCE',
  loaderLogo: '/assets/img/logofce2018.png',
  loaderFooter1: 'DiTESI | Dirección de tecnologías y Sistemas Informáticos | Facultad de Ciencias Económicas | UNLP | Calle 6 Nº 777',
  loaderFooter2: 'DiTESI | Dirección de tecnologías y Sistemas Informáticos | FCE',

  pantallaPrincipalLogo: '/assets/img/logo_asistencia_fce.png',

  auth: {
    issuer: 'https://oidc.econo.unlp.edu.ar/',
    redirectUri: 'https://asistencia.econo.unlp.edu.ar/auth/oauth2',
    clientId: 'assistance-ui',
    scope: 'openid profile email',
    waitForTokenInMsec: 2000,
    requireHttps: true
  }

};
