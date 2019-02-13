const appRoot = require('app-root-path');
const decamelize = require('decamelize');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const _ = require('lodash');

const { serializerOptions } = appRoot.require('utils/jsonapi');
const { openapi } = appRoot.require('utils/load-openapi');
const { paginate } = appRoot.require('utils/paginator');
const { apiBaseURL, resourcePathLink, paramsLink } = appRoot.require('utils/uri-builder');

const petResourceProp = openapi.definitions.PetResource.properties;
const petResourceType = petResourceProp.type.enum[0];
const petResourceKeys = _.keys(petResourceProp.attributes.properties);
const petResourcePath = 'pets';
const petResourceURL = resourcePathLink(apiBaseURL, petResourcePath);

/**
 * The column name getting from database is usually UPPER_CASE.
 * This block of code is to make the camelCase keys defined in openapi.yaml be
 * UPPER_CASE so that the serializer can correctly match the corresponding columns
 * from the raw data rows.
 */
_.forEach(petResourceKeys, (key, index) => {
  petResourceKeys[index] = decamelize(key).toUpperCase();
});

/**
 * @summary Serialize petResources to JSON API
 * @function
 * @param {[Object]} rawPets Raw data rows from data source
 * @param {Object} query Query parameters
 * @returns {Object} Serialized petResources object
 */
const serializePets = (rawPets, query) => {
  /**
   * Add pagination links and meta information to options if pagination is enabled
   */
  const pageQuery = {
    size: query['page[size]'],
    number: query['page[number]'],
  };

  const pagination = paginate(rawPets, pageQuery);
  pagination.totalResults = rawPets.length;
  rawPets = pagination.paginatedRows;

  const topLevelSelfLink = paramsLink(petResourceURL, query);
  const serializerArgs = {
    identifierField: 'ID',
    resourceKeys: petResourceKeys,
    pagination,
    resourcePath: petResourcePath,
    topLevelSelfLink,
    enableDataLinks: true,
  };

  return new JSONAPISerializer(
    petResourceType,
    serializerOptions(serializerArgs),
  ).serialize(rawPets);
};

/**
 * @summary Serialize petResource to JSON API
 * @function
 * @param {Object} rawPet Raw data row from data source
 * @returns {Object} Serialized petResource object
 */
const serializePet = (rawPet) => {
  const topLevelSelfLink = resourcePathLink(petResourceURL, rawPet.ID);
  const serializerArgs = {
    identifierField: 'ID',
    resourceKeys: petResourceKeys,
    resourcePath: petResourcePath,
    topLevelSelfLink,
    enableDataLinks: true,
  };

  return new JSONAPISerializer(
    petResourceType,
    serializerOptions(serializerArgs, petResourcePath, topLevelSelfLink),
  ).serialize(rawPet);
};
module.exports = { serializePets, serializePet };
