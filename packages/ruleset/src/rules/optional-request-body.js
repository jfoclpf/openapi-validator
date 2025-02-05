const { oas3 } = require('@stoplight/spectral-formats');
const { optionalRequestBody } = require('../functions');

module.exports = {
  description:
    'An optional requestBody with required properties should probably be required',
  message: '{{description}}',
  given:
    "$.paths[*].[*].[?(@property === 'requestBody' && @.required !== true)].content.[*].schema",
  severity: 'info',
  formats: [oas3],
  resolved: true,
  then: {
    function: optionalRequestBody
  }
};
