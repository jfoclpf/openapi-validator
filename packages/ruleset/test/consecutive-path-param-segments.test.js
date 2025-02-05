const { consecutivePathParamSegments } = require('../src/rules');
const { makeCopy, rootDocument, testRule, severityCodes } = require('./utils');

const rule = consecutivePathParamSegments;
const ruleId = 'consecutive-path-param-segments';
const expectedSeverity = severityCodes.error;

describe('Spectral rule: consecutive-path-param-segments', () => {
  describe('Should not yield errors', () => {
    it('Clean spec', async () => {
      const results = await testRule(ruleId, rule, rootDocument);
      expect(results).toHaveLength(0);
    });
  });

  describe('Should yield errors', () => {
    it('Path has two consecutive param references', async () => {
      const testDocument = makeCopy(rootDocument);

      testDocument.paths['/v1/drinks/{drink_id}/{swig_id}'] =
        testDocument.paths['/v1/drinks/{drink_id}'];
      delete testDocument.paths['/v1/drinks/{drink_id}'];

      const results = await testRule(ruleId, rule, testDocument);
      expect(results).toHaveLength(1);
      const result = results[0];
      expect(result.code).toBe(ruleId);
      expect(result.severity).toBe(expectedSeverity);
      expect(result.path.join('.')).toBe(
        'paths./v1/drinks/{drink_id}/{swig_id}'
      );
      expect(results[0].message).toBe(
        'Path contains two or more consecutive path parameter references: /v1/drinks/{drink_id}/{swig_id}'
      );
    });
  });
});
