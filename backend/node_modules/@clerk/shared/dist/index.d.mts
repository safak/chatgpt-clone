export { apiUrlFromPublishableKey } from './apiUrlFromPublishableKey.mjs';
export { inBrowser, isBrowserOnline, isValidBrowser, isValidBrowserOnline, userAgentIsRobot } from './browser.mjs';
export { callWithRetry } from './callWithRetry.mjs';
export { colorToSameTypeString, hasAlpha, hexStringToRgbaColor, isHSLColor, isRGBColor, isTransparent, isValidHexString, isValidHslaString, isValidRgbaString, stringToHslaColor, stringToSameTypeColor } from './color.mjs';
export { CURRENT_DEV_INSTANCE_SUFFIXES, DEV_OR_STAGING_SUFFIXES, LEGACY_DEV_INSTANCE_SUFFIXES, LOCAL_API_URL, LOCAL_ENV_SUFFIXES, PROD_API_URL, STAGING_API_URL, STAGING_ENV_SUFFIXES, iconImageUrl } from './constants.mjs';
export { RelativeDateCase, addYears, dateTo12HourTime, differenceInCalendarDays, formatRelative, normalizeDate } from './date.mjs';
export { deprecated, deprecatedObjectProperty, deprecatedProperty } from './deprecated.mjs';
export { deriveState } from './deriveState.mjs';
export { ClerkAPIResponseError, ClerkRuntimeError, EmailLinkError, EmailLinkErrorCode, ErrorThrower, ErrorThrowerOptions, MetamaskError, buildErrorThrower, is4xxError, isCaptchaError, isClerkAPIResponseError, isClerkRuntimeError, isEmailLinkError, isKnownError, isMetamaskError, isNetworkError, isPasswordPwnedError, isUnauthorizedError, isUserLockedError, parseError, parseErrors } from './error.mjs';
export { SupportedMimeType, extension, readJSONFile } from './file.mjs';
export { handleValueOrFn } from './handleValueOrFn.mjs';
export { isomorphicAtob } from './isomorphicAtob.mjs';
export { isomorphicBtoa } from './isomorphicBtoa.mjs';
export { buildPublishableKey, createDevOrStagingUrlCache, getCookieSuffix, getSuffixedCookieName, isDevelopmentFromPublishableKey, isDevelopmentFromSecretKey, isProductionFromPublishableKey, isProductionFromSecretKey, isPublishableKey, parsePublishableKey } from './keys.mjs';
export { LoadClerkJsScriptOptions, buildClerkJsScriptAttributes, clerkJsScriptUrl, loadClerkJsScript, setClerkJsLoadingErrorPackageName } from './loadClerkJsScript.mjs';
export { loadScript } from './loadScript.mjs';
export { LocalStorageBroadcastChannel } from './localStorageBroadcastChannel.mjs';
export { Poller, PollerCallback, PollerRun, PollerStop } from './poller.mjs';
export { isHttpOrHttps, isProxyUrlRelative, isValidProxyUrl, proxyUrlToAbsoluteURL } from './proxy.mjs';
export { camelToSnake, deepCamelToSnake, deepSnakeToCamel, getNonUndefinedValues, isIPV4Address, isTruthy, snakeToCamel, titleize, toSentence } from './underscore.mjs';
export { addClerkPrefix, cleanDoubleSlashes, getClerkJsMajorVersionOrTag, getScriptUrl, hasLeadingSlash, hasTrailingSlash, isAbsoluteUrl, isCurrentDevAccountPortalOrigin, isLegacyDevAccountPortalOrigin, isNonEmptyURL, joinURL, parseSearchParams, stripScheme, withLeadingSlash, withTrailingSlash, withoutLeadingSlash, withoutTrailingSlash } from './url.mjs';
export { versionSelector } from './versionSelector.mjs';
export { applyFunctionToObj, filterProps, removeUndefined, without } from './object.mjs';
export { logger } from './logger.mjs';
export { DEV_BROWSER_JWT_KEY, extractDevBrowserJWTFromURL, setDevBrowserJWTInURL } from './devBrowser.mjs';
export { fastDeepMergeAndKeep, fastDeepMergeAndReplace } from './fastDeepMerge.mjs';
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
