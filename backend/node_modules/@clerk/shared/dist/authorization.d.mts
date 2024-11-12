import { CheckAuthorizationWithCustomPermissions } from '@clerk/types';

type AuthorizationOptions = {
    userId: string | null | undefined;
    orgId: string | null | undefined;
    orgRole: string | null | undefined;
    orgPermissions: string[] | null | undefined;
    __experimental_factorVerificationAge: [number, number] | null;
};
/**
 * Creates a function for comprehensive user authorization checks.
 * Combines organization-level and step-up authentication checks.
 * The returned function authorizes if both checks pass, or if at least one passes
 * when the other is indeterminate. Fails if userId is missing.
 */
declare const createCheckAuthorization: (options: AuthorizationOptions) => CheckAuthorizationWithCustomPermissions;

export { createCheckAuthorization };
