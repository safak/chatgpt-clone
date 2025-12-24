import "./chunk-7ELT755Q.mjs";

// src/authorization.ts
var TYPES_TO_OBJECTS = {
  veryStrict: {
    afterMinutes: 10,
    level: "multiFactor"
  },
  strict: {
    afterMinutes: 10,
    level: "secondFactor"
  },
  moderate: {
    afterMinutes: 60,
    level: "secondFactor"
  },
  lax: {
    afterMinutes: 1440,
    level: "secondFactor"
  }
};
var ALLOWED_LEVELS = /* @__PURE__ */ new Set(["firstFactor", "secondFactor", "multiFactor"]);
var ALLOWED_TYPES = /* @__PURE__ */ new Set(["veryStrict", "strict", "moderate", "lax"]);
var isValidMaxAge = (maxAge) => typeof maxAge === "number" && maxAge > 0;
var isValidLevel = (level) => ALLOWED_LEVELS.has(level);
var isValidVerificationType = (type) => ALLOWED_TYPES.has(type);
var checkOrgAuthorization = (params, options) => {
  const { orgId, orgRole, orgPermissions } = options;
  if (!params.role && !params.permission) {
    return null;
  }
  if (!orgId || !orgRole || !orgPermissions) {
    return null;
  }
  if (params.permission) {
    return orgPermissions.includes(params.permission);
  }
  if (params.role) {
    return orgRole === params.role;
  }
  return null;
};
var validateReverificationConfig = (config) => {
  const convertConfigToObject = (config2) => {
    if (typeof config2 === "string") {
      return TYPES_TO_OBJECTS[config2];
    }
    return config2;
  };
  if (typeof config === "string" && isValidVerificationType(config)) {
    return convertConfigToObject.bind(null, config);
  }
  if (typeof config === "object" && isValidLevel(config.level) && isValidMaxAge(config.afterMinutes)) {
    return convertConfigToObject.bind(null, config);
  }
  return false;
};
var checkStepUpAuthorization = (params, { __experimental_factorVerificationAge }) => {
  if (!params.__experimental_reverification || !__experimental_factorVerificationAge) {
    return null;
  }
  const isValidReverification = validateReverificationConfig(params.__experimental_reverification);
  if (!isValidReverification) {
    return null;
  }
  const { level, afterMinutes } = isValidReverification();
  const [factor1Age, factor2Age] = __experimental_factorVerificationAge;
  const isValidFactor1 = factor1Age !== -1 ? afterMinutes > factor1Age : null;
  const isValidFactor2 = factor2Age !== -1 ? afterMinutes > factor2Age : null;
  switch (level) {
    case "firstFactor":
      return isValidFactor1;
    case "secondFactor":
      return factor2Age !== -1 ? isValidFactor2 : isValidFactor1;
    case "multiFactor":
      return factor2Age === -1 ? isValidFactor1 : isValidFactor1 && isValidFactor2;
  }
};
var createCheckAuthorization = (options) => {
  return (params) => {
    if (!options.userId) {
      return false;
    }
    const orgAuthorization = checkOrgAuthorization(params, options);
    const stepUpAuthorization = checkStepUpAuthorization(params, options);
    if ([orgAuthorization, stepUpAuthorization].some((a) => a === null)) {
      return [orgAuthorization, stepUpAuthorization].some((a) => a === true);
    }
    return [orgAuthorization, stepUpAuthorization].every((a) => a === true);
  };
};
export {
  createCheckAuthorization
};
//# sourceMappingURL=authorization.mjs.map