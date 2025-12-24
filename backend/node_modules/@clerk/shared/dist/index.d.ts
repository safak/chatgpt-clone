export { apiUrlFromPublishableKey } from './apiUrlFromPublishableKey.js';
export { inBrowser, isBrowserOnline, isValidBrowser, isValidBrowserOnline, userAgentIsRobot } from './browser.js';
export { callWithRetry } from './callWithRetry.js';
export { colorToSameTypeString, hasAlpha, hexStringToRgbaColor, isHSLColor, isRGBColor, isTransparent, isValidHexString, isValidHslaString, isValidRgbaString, stringToHslaColor, stringToSameTypeColor } from './color.js';
export { CURRENT_DEV_INSTANCE_SUFFIXES, DEV_OR_STAGING_SUFFIXES, LEGACY_DEV_INSTANCE_SUFFIXES, LOCAL_API_URL, LOCAL_ENV_SUFFIXES, PROD_API_URL, STAGING_API_URL, STAGING_ENV_SUFFIXES, iconImageUrl } from './constants.js';
export { RelativeDateCase, addYears, dateTo12HourTime, differenceInCalendarDays, formatRelative, normalizeDate } from './date.js';
export { deprecated, deprecatedObjectProperty, deprecatedProperty } from './deprecated.js';
export { deriveState } from './deriveState.js';
export { ClerkAPIResponseError, ClerkRuntimeError, EmailLinkError, EmailLinkErrorCode, ErrorThrower, ErrorThrowerOptions, MetamaskError, buildErrorThrower, is4xxError, isCaptchaError, isClerkAPIResponseError, isClerkRuntimeError, isEmailLinkError, isKnownError, isMetamaskError, isNetworkError, isPasswordPwnedError, isUnauthorizedError, isUserLockedError, parseError, parseErrors } from './error.js';
export { SupportedMimeType, extension, readJSONFile } from './file.js';
export { handleValueOrFn } from './handleValueOrFn.js';
export { isomorphicAtob } from './isomorphicAtob.js';
export { isomorphicBtoa } from './isomorphicBtoa.js';
export { buildPublishableKey, createDevOrStagingUrlCache, getCookieSuffix, getSuffixedCookieName, isDevelopmentFromPublishableKey, isDevelopmentFromSecretKey, isProductionFromPublishableKey, isProductionFromSecretKey, isPublishableKey, parsePublishableKey } from './keys.js';
export { LoadClerkJsScriptOptions, buildClerkJsScriptAttributes, clerkJsScriptUrl, loadClerkJsScript, setClerkJsLoadingErrorPackageName } from './loadClerkJsScript.js';
export { loadScript } from './loadScript.js';
export { LocalStorageBroadcastChannel } from './localStorageBroadcastChannel.js';
export { Poller, PollerCallback, PollerRun, PollerStop } from './poller.js';
export { isHttpOrHttps, isProxyUrlRelative, isValidProxyUrl, proxyUrlToAbsoluteURL } from './proxy.js';
export { camelToSnake, deepCamelToSnake, deepSnakeToCamel, getNonUndefinedValues, isIPV4Address, isTruthy, snakeToCamel, titleize, toSentence } from './underscore.js';
export { addClerkPrefix, cleanDoubleSlashes, getClerkJsMajorVersionOrTag, getScriptUrl, hasLeadingSlash, hasTrailingSlash, isAbsoluteUrl, isCurrentDevAccountPortalOrigin, isLegacyDevAccountPortalOrigin, isNonEmptyURL, joinURL, parseSearchParams, stripScheme, withLeadingSlash, withTrailingSlash, withoutLeadingSlash, withoutTrailingSlash } from './url.js';
export { versionSelector } from './versionSelector.js';
export { applyFunctionToObj, filterProps, removeUndefined, without } from './object.js';
export { logger } from './logger.js';
export { DEV_BROWSER_JWT_KEY, extractDevBrowserJWTFromURL, setDevBrowserJWTInURL } from './devBrowser.js';
export { fastDeepMergeAndKeep, fastDeepMergeAndReplace } from './fastDeepMerge.js';
import '@clerk/types';

type Callback = (val?: any) => void;
/**
 * Create a promise that can be resolved or rejected from
 * outside the Promise constructor callback
 */
declare const createDeferredPromise: () => {
    promise: Promise<unknown>;
    resolve: Callback;
    reject: Callback;
};

/**
 * Check if the frontendApi ends with a staging domain
 */
declare function isStaging(frontendApi: string): boolean;

declare const logErrorInDevMode: (message: string) => void;

declare const noop: (..._args: any[]) => void;

type Milliseconds = number;
type BackoffOptions = Partial<{
    firstDelay: Milliseconds;
    maxDelay: Milliseconds;
    timeMultiple: number;
    shouldRetry: (error: unknown, iterationsCount: number) => boolean;
}>;
declare const runWithExponentialBackOff: <T>(callback: () => T | Promise<T>, options?: BackoffOptions) => Promise<T>;

declare const isDevelopmentEnvironment: () => boolean;
declare const isTestEnvironment: () => boolean;
declare const isProductionEnvironment: () => boolean;

type WorkerTimerId = number;
type WorkerTimeoutCallback = () => void;
type WorkerSetTimeout = (cb: WorkerTimeoutCallback, ms: number) => WorkerTimerId;
type WorkerClearTimeout = (id: WorkerTimerId) => void;

declare const createWorkerTimers: () => {
    setTimeout: WorkerSetTimeout;
    setInterval: WorkerSetTimeout;
    clearTimeout: WorkerClearTimeout;
    clearInterval: WorkerClearTimeout;
    cleanup: (..._args: any[]) => void;
};

export { createDeferredPromise, createWorkerTimers, isDevelopmentEnvironment, isProductionEnvironment, isStaging, isTestEnvironment, logErrorInDevMode, noop, runWithExponentialBackOff };
