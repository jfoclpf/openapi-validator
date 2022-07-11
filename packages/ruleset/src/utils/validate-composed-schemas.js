/*
 * Performs validation on a schema and all of its composed schemas.
 *
 * Composed schemas are those referenced by allOf, anyOf, oneOf, or not, plus all schemas composed
 * by those schemas.
 *
 * Composed schemas DO NOT include nested schemas (property schemas, items schemas).
 *
 * @param {object} schema - Simple or composite OpenAPI 3.0 schema object.
 * @param {array} path - Path array for the provided schema.
 * @param {function} validate - Validate function.
 * @param {boolean} includeSelf - Whether to validate the provided schema (or just its composed schemas).
 * @param {boolean} includeNot - Whether to validate schemas composed with `not`.
 * @returns {array} - Array of validation errors.
 */
const validateComposedSchemas = (
  schema,
  path,
  validate,
  includeSelf = false,
  includeNot = true
) => {
  const errors = [];

  if (includeSelf) {
    errors.push(...validate(schema, path));
  }

  if (includeNot && schema.not) {
    errors.push(
      ...validateComposedSchemas(schema.not, [...path, 'not'], validate, true)
    );
  }

  for (const applicatorType of ['allOf', 'oneOf', 'anyOf']) {
    if (Array.isArray(schema[applicatorType])) {
      schema[applicatorType].forEach((s, i) => {
        errors.push(
          ...validateComposedSchemas(s, [...path, applicatorType, i], validate, true)
        );
      });
    }
  }

  return errors;
};

module.exports = validateComposedSchemas;
