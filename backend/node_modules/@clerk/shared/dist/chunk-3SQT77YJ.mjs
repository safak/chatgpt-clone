// src/versionSelector.ts
var versionSelector = (clerkJSVersion, packageVersion = "5.27.0") => {
  if (clerkJSVersion) {
    return clerkJSVersion;
  }
  const prereleaseTag = getPrereleaseTag(packageVersion);
  if (prereleaseTag) {
    if (prereleaseTag === "snapshot") {
      return "5.27.0";
    }
    return prereleaseTag;
  }
  return getMajorVersion(packageVersion);
};
var getPrereleaseTag = (packageVersion) => {
  var _a;
  return (_a = packageVersion.trim().replace(/^v/, "").match(/-(.+?)(\.|$)/)) == null ? void 0 : _a[1];
};
var getMajorVersion = (packageVersion) => packageVersion.trim().replace(/^v/, "").split(".")[0];

export {
  versionSelector,
  getMajorVersion
};
//# sourceMappingURL=chunk-3SQT77YJ.mjs.map