const functions = require('firebase-functions');
const firebase = require('../services');
const response = require('../services/response');
const request = require('../services/request');

const reserves = require('../models/reserves');

exports.reserves = functions.https.onRequest((req, res) => {
  const parameters = req.body;

  if (!parameters.userType && !parameters.searchFunctionality) {
    return response.transformResponse(req, res);
  }

  request
    .validateAuthUser(req)
    .then((validate) => {
      if (
        parameters.userType === 'egua' &&
        parameters.searchFunctionality === 'registerReserve' &&
        parameters.userId
      ) {
        reserves
          .registerReserve(
            firebase.database,
            parameters.userId,
            parameters.params
          )
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'haras' &&
        parameters.searchFunctionality === 'getReserves' &&
        parameters.userId
      ) {
        console.log('entrou aqui ');
        reserves
          .getReserves(firebase.database, parameters.userId, parameters.params)
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'egua' &&
        parameters.searchFunctionality === 'getReservesEgua' &&
        parameters.userId
      ) {
        console.log('entrou aqui eguaaaaa ');
        reserves
          .getReservesEgua(
            firebase.database,
            parameters.userId,
            parameters.params
          )
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'haras' &&
        parameters.searchFunctionality === 'getUserWhoRequestedReserve' &&
        parameters.userId
      ) {
        console.log('entrou aqui ');
        reserves
          .getUserWhoRequestedReserve(
            firebase.database,
            parameters.userId,
            parameters.reserveDetails
          )
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'haras' &&
        parameters.searchFunctionality === 'getAnimalsDay' &&
        parameters.userId
      ) {
        console.log('entrou aqui ');
        reserves
          .getAnimalsDay(firebase.database, parameters.userId)
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'haras' &&
        parameters.searchFunctionality === 'cancelReserve' &&
        parameters.userId
      ) {
        console.log('entrou aqui ');
        reserves
          .cancelReserve(
            firebase.database,
            parameters.userId,
            parameters.reserve
          )
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'haras' &&
        parameters.searchFunctionality === 'confirmReserve' &&
        parameters.userId
      ) {
        console.log('entrou aqui ');
        reserves
          .confirmReserve(
            firebase.database,
            parameters.userId,
            parameters.reserve
          )
          .then((client) => {
            return response.transformResponse(req, res, client);
          })
          .catch((error) => {
            return response.transformResponse(req, res, error);
          });

        return;
      } else if (
        parameters.userType === 'haras' &&
        parameters.searchFunctionality === 'confirmColeta' &&
        parameters.userId
      ) {
        console.log('entrou aqui ');
        reserves
          .confirmColeta(
            firebase.database,
            parameters.userId,
            parameters.reserve
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
