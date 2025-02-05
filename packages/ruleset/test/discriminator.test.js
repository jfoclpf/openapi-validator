const { discriminator } = require('../src/rules');
const { makeCopy, rootDocument, testRule, severityCodes } = require('./utils');

const name = 'discriminator';

describe('Spectral rule: discriminator', () => {
  it('should not error with a clean spec', async () => {
    // tests oneOf with all properties containing the property
    const results = await testRule(name, discriminator, rootDocument);

    expect(results).toHaveLength(0);
  });

  it('should not error if property is present in all oneOf nested subschemas', async () => {
    const testDocument = makeCopy(rootDocument);
    testDocument.components.schemas.Soda = {
      oneOf: [
        {
          type: 'object',
          properties: {
            type: {
              type: 'string'
            }
          }
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string'
            }
          }
        }
      ]
    };

    const results = await testRule(name, discriminator, testDocument);

    expect(results).toHaveLength(0);
  });

  it('should not error if property is present in all anyOf nested subschemas', async () => {
    const testDocument = makeCopy(rootDocument);
    testDocument.components.schemas.Soda = {
      anyOf: [
        {
          type: 'object',
          properties: {
            type: {
              type: 'string'
            }
          }
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string'
            }
          }
        }
      ]
    };

    const results = await testRule(name, discriminator, testDocument);

    expect(results).toHaveLength(0);
  });

  it('should not error if property is present in at least one allOf nested subschemas', async () => {
    const testDocument = makeCopy(rootDocument);
    testDocument.components.schemas.Soda = {
      allOf: [
        {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            }
          }
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string'
            }
          }
        }
      ]
    };

    const results = await testRule(name, discriminator, testDocument);

    expect(results).toHaveLength(0);
  });

  it('should not error if all anyOf properties have a schema', async () => {
    const testDocument = makeCopy(rootDocument);
    testDocument.components.schemas.Drink = {
      anyOf: [
        {
          $ref: '#/components/schemas/Juice'
        },
        {
          $ref: '#/components/schemas/Soda'
        }
      ],
      discriminator: {
        propertyName: 'type'
      }
    };

    const results = await testRule(name, discriminator, testDocument);

    expect(results).toHaveLength(0);
  });

  it('should error if discriminator is not present in all oneOf subschemas', async () => {
    const testDocument = makeCopy(rootDocument);
    testDocument.components.schemas.Soda = {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          $ref: '#/components/schemas/NormalString'
        }
      }
    };

    const results = await testRule(name, discriminator, testDocument);

    // the spectral path resolution logic is ignored for these tests so the
    // request and response instance are both reported
    expect(results).toHaveLength(4);

    const validation = results[0];
    expect(validation.code).toBe(name);
    expect(validation.message).toBe(
      'The discriminator property name used must be defined in this schema'
    );
    expect(validation.path).toStrictEqual([
      'paths',
      '/v1/drinks',
      'post',
      'requestBody',
      'content',
      'application/json',
      'schema',
      'discriminator',
      'propertyName'
    ]);
    expect(validation.severity).toBe(severityCodes.error);
  });

  it('should error if discriminator is not present in all anyOf subschemas', async () => {
    const testDocument = makeCopy(rootDocument);
    testDocument.components.schemas.Drink = {
      anyOf: [
        {
          $ref: '#/components/schemas/Juice'
        },
        {
          $ref: '#/components/schemas/Soda'
        }
      ],
      discriminator: {
        propertyName: 'type'
      }
    };

    testDocument.components.schemas.Juice = {
      type: 'object',
      required: ['fruit'],
      properties: {
        fruit: {
          $ref: '#/components/schemas/NormalString'
        }
      }
    };

    const results = await testRule(name, discriminator, testDocument);
    expect(results).toHaveLength(4);

    const validation = results[0];
    expect(validation.code).toBe(name);
    expect(validation.message).toBe(
      'The discriminator property name used must be defined in this schema'
    );
    expect(validation.path).toStrictEqual([
      'paths',
      '/v1/drinks',
      'post',
      'requestBody',
      'content',
      'application/json',
      'schema',
      'discriminator',
      'propertyName'
    ]);
    expect(validation.severity).toBe(severityCodes.error);
  });

  it('should error if discriminator is not present in all oneOf nested subschemas', async () => {
    const testDocument = makeCopy(rootDocument);
    testDocument.components.schemas.Soda = {
      oneOf: [
        {
          type: 'object',
          properties: {
            brand: {
              type: 'string'
            }
          }
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string'
            }
          }
        }
      ]
    };

    const results = await testRule(name, discriminator, testDocument);
    expect(results).toHaveLength(4);

    const validation = results[0];
    expect(validation.code).toBe(name);
    expect(validation.message).toBe(
      'The discriminator property name used must be defined in this schema'
    );
    expect(validation.path).toStrictEqual([
      'paths',
      '/v1/drinks',
      'post',
      'requestBody',
      'content',
      'application/json',
      'schema',
      'discriminator',
      'propertyName'
    ]);
    expect(validation.severity).toBe(severityCodes.error);
  });

  it('should error if property is not present in all anyOf nested subschemas', async () => {
    const testDocument = makeCopy(rootDocument);
    testDocument.components.schemas.Soda = {
      anyOf: [
        {
          type: 'object',
          properties: {
            brand: {
              type: 'string'
            }
          }
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string'
            }
          }
        }
      ]
    };

    const results = await testRule(name, discriminator, testDocument);
    expect(results).toHaveLength(4);

    const validation = results[0];
    expect(validation.code).toBe(name);
    expect(validation.message).toBe(
      'The discriminator property name used must be defined in this schema'
    );
    expect(validation.path).toStrictEqual([
      'paths',
      '/v1/drinks',
      'post',
      'requestBody',
      'content',
      'application/json',
      'schema',
      'discriminator',
      'propertyName'
    ]);
    expect(validation.severity).toBe(severityCodes.error);
  });

  it('should not error if property is present in at least one allOf nested subschemas', async () => {
    const testDocument = makeCopy(rootDocument);
    testDocument.components.schemas.Soda = {
      allOf: [
        {
          type: 'object',
          properties: {
            brand: {
              type: 'string'
            }
          }
        },
        {
          type: 'object',
          properties: {
            flavor: {
              type: 'string'
            }
          }
        }
      ]
    };

    const results = await testRule(name, discriminator, testDocument);
    expect(results).toHaveLength(4);

    const validation = results[0];
    expect(validation.code).toBe(name);
    expect(validation.message).toBe(
      'The discriminator property name used must be defined in this schema'
    );
    expect(validation.path).toStrictEqual([
      'paths',
      '/v1/drinks',
      'post',
      'requestBody',
      'content',
      'application/json',
      'schema',
      'discriminator',
      'propertyName'
    ]);
    expect(validation.severity).toBe(severityCodes.error);
  });
});
