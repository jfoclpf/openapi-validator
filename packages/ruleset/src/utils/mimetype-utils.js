/**
 * Returns true if and only if "mimeType" is a "JSON-like" mime type
 * (e.g. "application/json; charset=utf-8").
 * @param {string} mimeType the mimeType string
 * @returns true if "mimeType" represents a JSON media type
 */
function isJsonMimeType(mimeType) {
  if (!mimeType) {
    return false;
  }

  const mimeTypeRE = /^application\/json(;.*)?$/i;
  return mimeTypeRE.test(mimeType);
}

/**
 * Returns true if and only if "mimeType" is a "json-patch" mime type
 * (e.g. "application/json-patch+json; charset=utf-8").
 * @param {string} mimeType the mimeType string
 * @returns true if "mimeType" represents a json-patch media type
 */
function isJsonPatchMimeType(mimeType) {
  if (!mimeType) {
    return false;
  }

  // Regular expressions for each allowable content type.
  const mimeTypeRE = /^application\/json-patch\+json(;.*)?$/i;
  return mimeTypeRE.test(mimeType);
}

/**
 * Returns true if and only if "mimeType" is a "merge-patch" mime type
 * (e.g. "application/merge-patch+json; charset=utf-8").
 * @param {string} mimeType the mimeType string
 * @returns true if "mimeType" represents a json-patch media type
 */
function isMergePatchMimeType(mimeType) {
  if (!mimeType) {
    return false;
  }

  const mimeTypeRE = /^application\/merge-patch\+json(;.*)?$/i;
  return mimeTypeRE.test(mimeType);
}

/**
 * Returns true if and only if "mimeType" is a form-related mime type
 * (e.g. "multipart/form-data; charset=utf-8").
 * @param {string} mimeType the mimeType string
 * @returns boolean true if "mimeType" indicates form content
 */
function isFormMimeType(mimeType) {
  if (!mimeType) {
    return false;
  }

  // Form-related mimetype regex's.
  const formMimeTypeREs = [
    /^multipart\/form-data(;.*)?$/i,
    /^multipart\/related(;.*)?$/i,
    /^multipart\/mixed(;.*)?$/i,
    /^application\/x-www-form-urlencoded(;.*)?$/i
  ];

  return !!formMimeTypeREs.find(re => re.test(mimeType));
}

module.exports = {
  isFormMimeType,
  isJsonMimeType,
  isJsonPatchMimeType,
  isMergePatchMimeType
};
