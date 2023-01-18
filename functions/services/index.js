const firebase = require('firebase/app');
require('firebase/auth');
const admin = require('firebase-admin');
var serviceAccount = require('./park-agile-6788e-firebase-adminsdk-sa12p-7c59f5b294.json');
var oqhomapiServiceAccount = require('./park-agile-6788e-firebase-adminsdk-sa12p-7c59f5b294.json');

var prodConfig = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://park-agile-6788e-default-rtdb.firebaseio.com',
  storageBucket: 'appsemem.appspot.com',
});

var homApiProjectConfig = {
  credential: admin.credential.cert(oqhomapiServiceAccount),
  databaseURL: 'https://park-agile-6788e-default-rtdb.firebaseio.com',
  storageBucket: 'appsemem.appspot.com',
};

var homApiProject = admin.initializeApp(homApiProjectConfig, 'homApi');

/**
 * Levantando a autenticação do firebase
 */

const firebaseConfigHom = {
  apiKey: 'AIzaSyCV6aMKRSoA4xgaojZdBZ9FxHjbud7Ubmo',
  authDomain: 'park-agile-6788e.firebaseapp.com',
  databaseURL: 'https://park-agile-6788e-default-rtdb.firebaseio.com',
  projectId: 'park-agile-6788e',
  storageBucket: 'park-agile-6788e.appspot.com',
  messagingSenderId: '116838330114',
  appId: '1:116838330114:web:1827a2f95eba9288aa5c1b',
  measurementId: 'G-LPLJM8MEDR',
};

const firebaseConfigProd = {
  apiKey: 'AIzaSyCV6aMKRSoA4xgaojZdBZ9FxHjbud7Ubmo',
  authDomain: 'park-agile-6788e.firebaseapp.com',
  databaseURL: 'https://park-agile-6788e-default-rtdb.firebaseio.com',
  projectId: 'park-agile-6788e',
  storageBucket: 'park-agile-6788e.appspot.com',
  messagingSenderId: '116838330114',
  appId: '1:116838330114:web:1827a2f95eba9288aa5c1b',
  measurementId: 'G-LPLJM8MEDR',
};

/**
 * Fim
 */

var config;
var configFirebase;

if (process.env.NODE_ENV == 'development') {
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
