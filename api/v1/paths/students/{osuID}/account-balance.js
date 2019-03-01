const appRoot = require('app-root-path');

const studentsDAO = require('../../../db/oracledb/students-dao');

const { errorBuilder, errorHandler } = appRoot.require('errors/errors');
const { openapi: { paths } } = appRoot.require('utils/load-openapi');

const get = async (req, res) => {
  try {
    const { osuID } = req.params;
    const result = await studentsDAO.getAccountBalanceById(osuID);
    if (result === undefined) {
      errorBuilder(res, 404, 'A student with the OSU ID was not found.');
    } else {
      res.send(result);
    }
  } catch (err) {
    errorHandler(res, err);
  }
};

get.apiDoc = paths['/students/{osuID}/account-balance'].get;

module.exports = { get };