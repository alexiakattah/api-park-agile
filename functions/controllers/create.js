const functions = require('firebase-functions');
const firebase = require('../services');
const response = require('../services/response');
const request = require('../services/request');

const create = require('../models/create');

exports.create = functions.https.onRequest((req, res) => {
  const parameters = req.body;
  console.log('params', parameters);
  if (!parameters.userType && !parameters.searchFunctionality) {
    return response.transformResponse(req, res);
  }

  request
    .validateAuthUser(req)
    .then((validate) => {
      if (
        parameters.userType === 'haras' &&
        parameters.searchFunctionality === 'registerAnimals' &&
        parameters.userId
      ) {
        create
          .registerAnimals(
            firebase.database,
            parameters.userId,
            parameters.animal
          )
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'egua' &&
        parameters.searchFunctionality === 'createCreditCard' &&
        parameters.userId
      ) {
        console.log('aquiiii');
        create
          .createCreditCard(
            firebase.database,
            parameters.userId,
            parameters.form
          )
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
