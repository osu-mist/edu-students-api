const appRoot = require('app-root-path');

const { errorBuilder, errorHandler } = appRoot.require('errors/errors');
const { openapi: { paths } } = appRoot.require('utils/load-openapi');
const studentsDAO = require('../../../db/oracledb/students-dao');

/**
 * @summary Get pet by unique ID
 */
const get = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await studentsDAO.getPetById(id);
    if (!result) {
      errorBuilder(res, 404, 'A pet with the specified ID was not found.');
    } else {
      res.send(result);
    }
  } catch (err) {
    errorHandler(res, err);
  }
};

get.apiDoc = paths['/pets/{id}'].get;

module.exports = { get };
