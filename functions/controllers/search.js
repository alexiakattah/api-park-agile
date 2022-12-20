const functions = require('firebase-functions');
const firebase = require('../services');
const response = require('../services/response');
const request = require('../services/request');

const search = require('../models/search');

exports.search = functions.https.onRequest((req, res) => {
  let parameters = req.body;
  console.log('params', parameters);
  if (!parameters.userType && !parameters.searchFunctionality) {
    return response.transformResponse(req, res);
  }

  request
    .validateAuthUser(req)
    .then((validate) => {
      if (
        parameters.userType === 'haras' &&
        parameters.searchFunctionality === 'getVeterinarians' &&
        parameters.harasId
      ) {
        search
          .getVeterinarians(firebase.database, parameters.harasId)
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'haras' &&
        parameters.searchFunctionality === 'getAnimals' &&
        parameters.userId
      ) {
        search
          .getAnimals(firebase.database, parameters.userId)
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'egua' &&
        parameters.searchFunctionality === 'getVeterinarian' &&
        parameters.userId
      ) {
        search
          .getVeterinarian(
            firebase.database,
            parameters.harasId,
            parameters.userId
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
        parameters.searchFunctionality === 'getDataUser' &&
        parameters.userId
      ) {
        search
          .getDataUser(
            firebase.database,

            parameters.userId
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
        parameters.searchFunctionality === 'getCreditCards' &&
        parameters.userId
      ) {
        search
          .getCreditCards(firebase.database, parameters.userId)
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'egua' &&
        parameters.searchFunctionality === 'findAnimals' &&
        parameters.search
      ) {
        search
          .findAnimals(firebase.database, parameters.search)
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
