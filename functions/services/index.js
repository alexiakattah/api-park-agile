const firebase = require('firebase/app');
require('firebase/auth');
const admin = require('firebase-admin');
var serviceAccount = require('./appsemem-firebase-adminsdk-d4u1z-52f9d357d3.json');
var oqhomapiServiceAccount = require('./appsemem-firebase-adminsdk-d4u1z-52f9d357d3.json');

var prodConfig = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://appsemem-default-rtdb.firebaseio.com',
  storageBucket: 'appsemem.appspot.com',
});

var homApiProjectConfig = {
  credential: admin.credential.cert(oqhomapiServiceAccount),
  databaseURL: 'https://appsemem-default-rtdb.firebaseio.com',
  storageBucket: 'appsemem.appspot.com',
};

var homApiProject = admin.initializeApp(homApiProjectConfig, 'homApi');

/**
 * Levantando a autenticação do firebase
 */

const firebaseConfigHom = {
  apiKey: "AIzaSyBjlMX6-kkk5QBPwW1d1mVQQRmBxnM80GU",
  authDomain: "appsemem.firebaseapp.com",
  databaseURL: "https://appsemem-default-rtdb.firebaseio.com",
  projectId: "appsemem",
  storageBucket: "appsemem.appspot.com",
  messagingSenderId: "778448237603",
  appId: "1:778448237603:web:e1e43101f775e289816d96"
};

const firebaseConfigProd = {
  apiKey: "AIzaSyBjlMX6-kkk5QBPwW1d1mVQQRmBxnM80GU",
  authDomain: "appsemem.firebaseapp.com",
  databaseURL: "https://appsemem-default-rtdb.firebaseio.com",
  projectId: "appsemem",
  storageBucket: "appsemem.appspot.com",
  messagingSenderId: "778448237603",
  appId: "1:778448237603:web:e1e43101f775e289816d96"
};

/**
 * Fim
 */

var config;
var configFirebase;

if (
  process.env.GCLOUD_PROJECT === 'oqhomapi' ||
  process.env.NODE_ENV == 'development'
) {
  config = homApiProject;
  configFirebase = firebaseConfigHom;
} else {
  config = prodConfig;
  configFirebase = firebaseConfigProd;
}

var firebaseProject = firebase.initializeApp(configFirebase);

exports.database = config.database();
exports.auth = config.auth();
exports.storage = config.storage();
exports.messaging = config.messaging();
exports.firebaseAuth = firebaseProject.auth();
