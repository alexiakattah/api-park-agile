const firebase = require('../services/');
exports.validateAuthUser = (req) => {
  const parameters = req.body;


  return new Promise((resolve, reject) => {
    let idToken = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('APPSEMEM ')
    ) {
      idToken = req.headers.authorization.split('APPSEMEM ')[1];
      // console.log(idToken);
    } else {
      return reject({
        success: false,
        message: 'Requisição não autorizada1.',
        error: {
          code: 401,
          message: 'Unauthorized',
        },
        code: 200,
      });
    }

    if (!idToken) {
      return reject({
        success: false,
        message: 'Requisição não autorizada2.',
        error: {
          code: 401,
          message: 'Unauthorized',
        },
        code: 200,
      });
    }

    firebase.auth
      .verifyIdToken(idToken)
      .then((decodedIdToken) => {
       
         resolve(decodedIdToken)
          
      })
      .catch((error) => {
        reject({
          success: false,
          message: 'Requisição não autorizada3.',
          error: {
            code: 401,
            message: 'Unauthorized',
            data: error,
          },
          code: 200,
        });
      });
  });
};
