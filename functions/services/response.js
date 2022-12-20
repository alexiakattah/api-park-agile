const cors = require('cors')({
  origin: true
});

exports.transformResponse = (req, res, responseData = null) => {
  cors(req, res, () => {
    // console.log('req', req);
    // console.log('res', res);
    return res
      .status(responseData && responseData.code ? responseData.code : 200)
      .json(responseData);
  });
};
