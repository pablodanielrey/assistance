export const environment = {
  production: false,
  assistanceApiUrl: 'http://localhost:10302/assistance/api/v1.0',
  oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',
  logoutUrl:'https://login.econo.unlp.edu.ar/logout/{{id_token}}/{{client_id}}',
  telegramURL: 'https://telegram.me/AsistenciaFCEBot?start=',
  client_id: 'assistance-ui',

  footer: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos | FCE',

  loaderHeader: 'Asistencia | FCE',
  loaderLogo: '/assets/img/logofce2018.png',
  loaderFooter1: 'DiTESI | Dirección de tecnologías y Sistemas Informáticos | Facultad de Ciencias Económicas | UNLP | Calle 6 Nº 777',
  loaderFooter2: 'DiTESI | Dirección de tecnologías y Sistemas Informáticos | FCE',

  pantallaPrincipalLogo: '/assets/img/logo_asistencia_fce.png',

};
