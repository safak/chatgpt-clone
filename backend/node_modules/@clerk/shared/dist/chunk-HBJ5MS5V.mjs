import {
  noop
} from "./chunk-7FNX7RWY.mjs";
import {
  isDevelopmentEnvironment
} from "./chunk-QMOEH4QX.mjs";

// src/utils/createDeferredPromise.ts
var createDeferredPromise = () => {
  let resolve = noop;
  let reject = noop;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

// src/utils/logErrorInDevMode.ts
var logErrorInDevMode = (message) => {
  if (isDevelopmentEnvironment()) {
    console.error(`Clerk: ${message}`);
  }
};

// src/utils/runWithExponentialBackOff.ts
var defaultOptions = {
  firstDelay: 125,
  maxDelay: 0,
  timeMultiple: 2,
  shouldRetry: () => true
};
var sleep = async (ms) => new Promise((s) => setTimeout(s, ms));
var createExponentialDelayAsyncFn = (opts) => {
  let timesCalled = 0;
  const calculateDelayInMs = () => {
    const constant = opts.firstDelay;
    const base = opts.timeMultiple;
    const delay = constant * Math.pow(base, timesCalled);
    return Math.min(opts.maxDelay || delay, delay);
  };
  return async () => {
    await sleep(calculateDelayInMs());
    timesCalled++;
  };
};
var runWithExponentialBackOff = async (callback, options = {}) => {
  let iterationsCount = 0;
  const { shouldRetry, firstDelay, maxDelay, timeMultiple } = {
    ...defaultOptions,
    ...options
  };
  const delay = createExponentialDelayAsyncFn({ firstDelay, maxDelay, timeMultiple });
  while (true) {
    try {
      return await callback();
    } catch (e) {
      iterationsCount++;
      if (!shouldRetry(e, iterationsCount)) {
        throw e;
      }
      await delay();
    }
  }
};

// src/loadScript.ts
var NO_DOCUMENT_ERROR = "loadScript cannot be called when document does not exist";
var NO_SRC_ERROR = "loadScript cannot be called without a src";
async function loadScript(src = "", opts) {
  const { async, defer, beforeLoad, crossOrigin, nonce } = opts || {};
  const load = () => {
    return new Promise((resolve, reject) => {
      if (!src) {
        reject(NO_SRC_ERROR);
      }
      if (!document || !document.body) {
        reject(NO_DOCUMENT_ERROR);
      }
      const script = document.createElement("script");
      crossOrigin && script.setAttribute("crossorigin", crossOrigin);
      script.async = async || false;
      script.defer = defer || false;
      script.addEventListener("load", () => {
        script.remove();
        resolve(script);
      });
      script.addEventListener("error", () => {
        script.remove();
        reject();
      });
      script.src = src;
      script.nonce = nonce;
      beforeLoad == null ? void 0 : beforeLoad(script);
      document.body.appendChild(script);
    });
  };
  return runWithExponentialBackOff(load, { shouldRetry: (_, iterations) => iterations < 5 });
}

export {
  createDeferredPromise,
  logErrorInDevMode,
  runWithExponentialBackOff,
  loadScript
};
//# sourceMappingURL=chunk-HBJ5MS5V.mjs.map