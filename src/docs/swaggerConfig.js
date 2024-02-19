// swaggerConfig.js

const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Description of your API',
    },
  },
  // Path to the API specs
  apis: [path.join(__dirname, '../routes/*.js')], // Adjust the path to your compiled JavaScript files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
