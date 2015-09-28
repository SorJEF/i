'use strict';
// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Config is ready for accessing remote server. Ask for login/password at slack.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
// You will need to set these on the server you deploy to.
//
module.exports = {
  DEBUG: false,
  DOMAIN: 'http://192.168.10.11:9000',
  SESSION_SECRET: 'dashboardjs-secret',

  SERVER_PROTOCOL: 'http',
  SERVER_PORT: '9000',
  SERVER_KEY: '/sybase/cert/server.key',
  SERVER_CERT: '/sybase/cert/server.crt',

  ACTIVITI_PROT: 'http',
  ACTIVITI_HOST: '192.168.10.13',
  ACTIVITI_PORT: 8080,
  ACTIVITI_REST: 'wf/service',
  ACTIVITI_USER: 'activiti-master',
  ACTIVITI_PASSWORD: 'UjhtJnEvf!',
  ACTIVITI_SESSION_IDLE: '3000',
  ACTIVITI_SESSION_TIMEOUT: '3000',
  ACTIVITI_SESSION_INTERVAL: '1000',

  // PRIVATE_KEY: '/sybase/cert/server.key',
  // CERTIFICATE: '/sybase/cert/server.crt',
  // SSL_PORT: 8081
};
