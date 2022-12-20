const functions = require('firebase-functions');
const firebase = require('../services');
const response = require('../services/response');
const request = require('../services/request');

const update = require('../models/update');

exports.update = functions.https.onRequest((req, res) => {
  let parameters = req.body;
  console.log('params', parameters);
  if (!parameters.userType && !parameters.searchFunctionality) {
    return response.transformResponse(req, res);
  }

  request
    .validateAuthUser(req)
    .then((validate) => {
      if (
        parameters.userType === 'egua' &&
        parameters.searchFunctionality === 'updateUser' &&
        parameters.data
      ) {
        update
          .updateUser(firebase.database, parameters.data)
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      }
    })

    .catch((error) => {
      console.log(error);
      return response.transformResponse(req, res, error);
    });
});
