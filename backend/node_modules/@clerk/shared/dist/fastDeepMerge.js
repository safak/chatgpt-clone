"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/fastDeepMerge.ts
var fastDeepMerge_exports = {};
__export(fastDeepMerge_exports, {
  fastDeepMergeAndKeep: () => fastDeepMergeAndKeep,
  fastDeepMergeAndReplace: () => fastDeepMergeAndReplace
});
module.exports = __toCommonJS(fastDeepMerge_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fastDeepMergeAndKeep,
  fastDeepMergeAndReplace
});
//# sourceMappingURL=fastDeepMerge.js.map