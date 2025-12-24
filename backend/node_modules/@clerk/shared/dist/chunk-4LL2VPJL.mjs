// src/fastDeepMerge.ts
var fastDeepMergeAndReplace = (source, target) => {
  if (!source || !target) {
    return;
  }
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key) && source[key] !== null && typeof source[key] === `object`) {
      if (target[key] === void 0) {
        target[key] = new (Object.getPrototypeOf(source[key])).constructor();
      }
      fastDeepMergeAndReplace(source[key], target[key]);
    } else if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
};
var fastDeepMergeAndKeep = (source, target) => {
  if (!source || !target) {
    return;
  }
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key) && source[key] !== null && typeof source[key] === `object`) {
      if (target[key] === void 0) {
        target[key] = new (Object.getPrototypeOf(source[key])).constructor();
      }
      fastDeepMergeAndKeep(source[key], target[key]);
    } else if (Object.prototype.hasOwnProperty.call(source, key) && target[key] === void 0) {
      target[key] = source[key];
    }
  }
};

export {
  fastDeepMergeAndReplace,
  fastDeepMergeAndKeep
};
//# sourceMappingURL=chunk-4LL2VPJL.mjs.map