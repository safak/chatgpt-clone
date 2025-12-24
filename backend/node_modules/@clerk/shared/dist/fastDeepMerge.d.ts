/**
 * Merges 2 objects without creating new object references
 * The merged props will appear on the `target` object
 * If `target` already has a value for a given key it will not be overwritten
 */
declare const fastDeepMergeAndReplace: (source: Record<any, any> | undefined | null, target: Record<any, any> | undefined | null) => void;
declare const fastDeepMergeAndKeep: (source: Record<any, any> | undefined | null, target: Record<any, any> | undefined | null) => void;

export { fastDeepMergeAndKeep, fastDeepMergeAndReplace };
