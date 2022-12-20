const functions = require('firebase-functions')
const auth = require('../models/auth')
const firebase = require('../services/');
const response = require('../services/response');
exports.createUser = functions.https.onRequest((req, res)=>{
  let parameters = req.body;
  console.log('paramsss', parameters)
  auth
    .create(firebase.auth, firebase.database, parameters)
    .then((create) => {
      return response.transformResponse(req, res, create);
    })
    .catch((error) => {
      return response.transformResponse(req, res, error);
    });
})