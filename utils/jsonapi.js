const appRoot = require('app-root-path');
const _ = require('lodash');

const { apiBaseUrl, resourcePathLink, paramsLink } = appRoot.require('utils/uri-builder');


/**
 * @summary Helper function to generate pagination params
 * @function
 * @param {number} pageNumber page number
 * @param {number} pageSize page size
 * @returns {Object} pagination parameters object
 */
const pageParamsBuilder = (pageNumber, pageSize) => (
  { 'page[number]': pageNumber, 'page[size]': pageSize }
);

/**
 * @summary Generate JSON API serializer options
 * @function
 * @param {[Object]} serializerArgs JSON API serializer arguments
 * @returns {Object} JSON API serializer options
 */
const serializerOptions = (serializerArgs) => {
  const {
    identifierField,
    resourceKeys,
    pagination,
    resourcePath,
    topLevelSelfLink,
    keyForAttribute,
    enableDataLinks,
  } = serializerArgs;

  const resourceUrl = resourcePathLink(apiBaseUrl, resourcePath);
  const options = {
    pluralizeType: false,
    attributes: resourceKeys,
    id: identifierField,
    keyForAttribute: keyForAttribute || 'camelCase',
    dataLinks: {
      self: (row) => {
        if (enableDataLinks) {
          return resourcePathLink(resourceUrl, row[identifierField]);
        }
        return null;
      },
    },
    topLevelLinks: { self: topLevelSelfLink },
  };

  if (pagination) {
    const {
      pageNumber,
      totalPages,
      nextPage,
      prevPage,
      pageSize,
      totalResults,
    } = pagination;

    options.topLevelLinks = _.assign(options.topLevelLinks, {
      first: paramsLink(resourceUrl, pageParamsBuilder(pageNumber, pageSize)),
      last: paramsLink(resourceUrl, pageParamsBuilder(totalPages, pageSize)),
      next: nextPage ? paramsLink(resourceUrl, pageParamsBuilder(nextPage, pageSize)) : null,
      prev: prevPage ? paramsLink(resourceUrl, pageParamsBuilder(prevPage, pageSize)) : null,
    });

    options.meta = {
      totalResults,
      totalPages,
      currentPageNumber: pageNumber,
      currentPageSize: pageSize,
    };
  }

  return options;
};

module.exports = { serializerOptions };
