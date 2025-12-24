import React, { PropsWithChildren } from 'react';
import { ClerkPaginatedResponse, OrganizationDomainResource, OrganizationMembershipRequestResource, OrganizationMembershipResource, OrganizationInvitationResource, OrganizationResource, GetDomainsParams, GetMembershipRequestParams, GetMembersParams, GetInvitationsParams, UserOrganizationInvitationResource, OrganizationSuggestionResource, CreateOrganizationParams, SetActive, GetUserOrganizationMembershipParams, GetUserOrganizationInvitationsParams, GetUserOrganizationSuggestionsParams, ActiveSessionResource, SessionResource, UserResource, LoadedClerk, ClientResource, ClerkOptions } from '@clerk/types';
import { ClerkAPIResponseError } from '../error.mjs';
import { dequal } from 'dequal';

declare function assertContextExists(contextVal: unknown, msgOrCtx: string | React.Context<any>): asserts contextVal;
type Options = {
    assertCtxFn?: (v: unknown, msg: string) => void;
};
type ContextOf<T> = React.Context<{
    value: T;
} | undefined>;
type UseCtxFn<T> = () => T;
/**
 * Creates and returns a Context and two hooks that return the context value.
 * The Context type is derived from the type passed in by the user.
 * The first hook returned guarantees that the context exists so the returned value is always CtxValue
 * The second hook makes no guarantees, so the returned value can be CtxValue | undefined
 */
declare const createContextAndHook: <CtxVal>(displayName: string, options?: Options) => [ContextOf<CtxVal>, UseCtxFn<CtxVal>, UseCtxFn<CtxVal | Partial<CtxVal>>];

type ValueOrSetter<T = unknown> = (size: T | ((_size: T) => T)) => void;
type CacheSetter<CData = any> = (data?: CData | ((currentData?: CData) => Promise<undefined | CData> | undefined | CData)) => Promise<CData | undefined>;
type PaginatedResources<T = unknown, Infinite = false> = {
    data: T[];
    count: number;
    error: ClerkAPIResponseError | null;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    page: number;
    pageCount: number;
    fetchPage: ValueOrSetter<number>;
    fetchPrevious: () => void;
    fetchNext: () => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    revalidate: () => Promise<void>;
    setData: Infinite extends true ? CacheSetter<(ClerkPaginatedResponse<T> | undefined)[]> : CacheSetter<ClerkPaginatedResponse<T> | undefined>;
};
type PaginatedResourcesWithDefault<T> = {
    [K in keyof PaginatedResources<T>]: PaginatedResources<T>[K] extends boolean ? false : undefined;
};
type PaginatedHookConfig<T> = T & {
    /**
     * Persists the previous pages with new ones in the same array
     */
    infinite?: boolean;
    /**
     * Return the previous key's data until the new data has been loaded
     */
    keepPreviousData?: boolean;
};

type UseOrganizationParams = {
    domains?: true | PaginatedHookConfig<GetDomainsParams>;
    membershipRequests?: true | PaginatedHookConfig<GetMembershipRequestParams>;
    memberships?: true | PaginatedHookConfig<GetMembersParams>;
    invitations?: true | PaginatedHookConfig<GetInvitationsParams>;
};
type UseOrganization = <T extends UseOrganizationParams>(params?: T) => {
    isLoaded: false;
    organization: undefined;
    membership: undefined;
    domains: PaginatedResourcesWithDefault<OrganizationDomainResource>;
    membershipRequests: PaginatedResourcesWithDefault<OrganizationMembershipRequestResource>;
    memberships: PaginatedResourcesWithDefault<OrganizationMembershipResource>;
    invitations: PaginatedResourcesWithDefault<OrganizationInvitationResource>;
} | {
    isLoaded: true;
    organization: OrganizationResource;
    membership: undefined;
    domains: PaginatedResourcesWithDefault<OrganizationDomainResource>;
    membershipRequests: PaginatedResourcesWithDefault<OrganizationMembershipRequestResource>;
    memberships: PaginatedResourcesWithDefault<OrganizationMembershipResource>;
    invitations: PaginatedResourcesWithDefault<OrganizationInvitationResource>;
} | {
    isLoaded: boolean;
    organization: OrganizationResource | null;
    membership: OrganizationMembershipResource | null | undefined;
    domains: PaginatedResources<OrganizationDomainResource, T['membershipRequests'] extends {
        infinite: true;
    } ? true : false> | null;
    membershipRequests: PaginatedResources<OrganizationMembershipRequestResource, T['membershipRequests'] extends {
        infinite: true;
    } ? true : false> | null;
    memberships: PaginatedResources<OrganizationMembershipResource, T['memberships'] extends {
        infinite: true;
    } ? true : false> | null;
    invitations: PaginatedResources<OrganizationInvitationResource, T['invitations'] extends {
        infinite: true;
    } ? true : false> | null;
};
declare const useOrganization: UseOrganization;

type UseOrganizationListParams = {
    userMemberships?: true | PaginatedHookConfig<GetUserOrganizationMembershipParams>;
    userInvitations?: true | PaginatedHookConfig<GetUserOrganizationInvitationsParams>;
    userSuggestions?: true | PaginatedHookConfig<GetUserOrganizationSuggestionsParams>;
};
type UseOrganizationList = <T extends UseOrganizationListParams>(params?: T) => {
    isLoaded: false;
    createOrganization: undefined;
    setActive: undefined;
    userMemberships: PaginatedResourcesWithDefault<OrganizationMembershipResource>;
    userInvitations: PaginatedResourcesWithDefault<UserOrganizationInvitationResource>;
    userSuggestions: PaginatedResourcesWithDefault<OrganizationSuggestionResource>;
} | {
    isLoaded: boolean;
    createOrganization: (params: CreateOrganizationParams) => Promise<OrganizationResource>;
    setActive: SetActive;
    userMemberships: PaginatedResources<OrganizationMembershipResource, T['userMemberships'] extends {
        infinite: true;
    } ? true : false>;
    userInvitations: PaginatedResources<UserOrganizationInvitationResource, T['userInvitations'] extends {
        infinite: true;
    } ? true : false>;
    userSuggestions: PaginatedResources<OrganizationSuggestionResource, T['userSuggestions'] extends {
        infinite: true;
    } ? true : false>;
};
declare const useOrganizationList: UseOrganizationList;

declare const useSafeLayoutEffect: typeof React.useLayoutEffect;

type UseSessionReturn = {
    isLoaded: false;
    isSignedIn: undefined;
    session: undefined;
} | {
    isLoaded: true;
    isSignedIn: false;
    session: null;
} | {
    isLoaded: true;
    isSignedIn: true;
    session: ActiveSessionResource;
};
type UseSession = () => UseSessionReturn;
/**
 * Returns the current auth state and if a session exists, the session object.
 *
 * Until Clerk loads and initializes, `isLoaded` will be set to `false`.
 * Once Clerk loads, `isLoaded` will be set to `true`, and you can
 * safely access `isSignedIn` state and `session`.
 *
 * @example
 * A simple example:
 *
 * import { useSession } from '@clerk/clerk-react'
 *
 * function Hello() {
 *   const { isSignedIn, session } = useSession();
 *   if(!isSignedIn) {
 *     return null;
 *   }
 *   return <div>{session.updatedAt}</div>
 * }
 */
declare const useSession: UseSession;

type UseSessionListReturn = {
    isLoaded: false;
    sessions: undefined;
    setActive: undefined;
} | {
    isLoaded: true;
    sessions: SessionResource[];
    setActive: SetActive;
};
type UseSessionList = () => UseSessionListReturn;
declare const useSessionList: UseSessionList;

type UseUserReturn = {
    isLoaded: false;
    isSignedIn: undefined;
    user: undefined;
} | {
    isLoaded: true;
    isSignedIn: false;
    user: null;
} | {
    isLoaded: true;
    isSignedIn: true;
    user: UserResource;
};
/**
 * Returns the current auth state and if a user is signed in, the user object.
 *
 * Until Clerk loads and initializes, `isLoaded` will be set to `false`.
 * Once Clerk loads, `isLoaded` will be set to `true`, and you can
 * safely access `isSignedIn` state and `user`.
 *
 * @example
 * A simple example:
 *
 * import { useUser } from '@clerk/clerk-react'
 *
 * function Hello() {
 *   const { isSignedIn, user } = useUser();
 *   if(!isSignedIn) {
 *     return null;
 *   }
 *   return <div>Hello, {user.firstName}</div>
 * }
 */
declare function useUser(): UseUserReturn;

declare const useClerk: () => LoadedClerk;

type UseMemoFactory<T> = () => T;
type UseMemoDependencyArray = Exclude<Parameters<typeof React.useMemo>[1], 'undefined'>;
type UseDeepEqualMemo = <T>(factory: UseMemoFactory<T>, dependencyArray: UseMemoDependencyArray) => T;
declare const useDeepEqualMemo: UseDeepEqualMemo;
declare const isDeeplyEqual: typeof dequal;

declare const ClerkInstanceContext: React.Context<{
    value: LoadedClerk;
} | undefined>;
declare const useClerkInstanceContext: () => LoadedClerk;
declare const UserContext: React.Context<{
    value: UserResource | null | undefined;
} | undefined>;
declare const useUserContext: () => UserResource | null | undefined;
declare const ClientContext: React.Context<{
    value: ClientResource | null | undefined;
} | undefined>;
declare const useClientContext: () => ClientResource | null | undefined;
declare const SessionContext: React.Context<{
    value: ActiveSessionResource | null | undefined;
} | undefined>;
declare const useSessionContext: () => ActiveSessionResource | null | undefined;
declare const OptionsContext: React.Context<ClerkOptions>;
declare function useOptionsContext(): ClerkOptions;
type OrganizationContextProps = {
    organization: OrganizationResource | null | undefined;
};
declare const useOrganizationContext: () => {
    organization: OrganizationResource | null | undefined;
};
declare const OrganizationProvider: ({ children, organization, swrConfig, }: PropsWithChildren<OrganizationContextProps & {
    swrConfig?: any;
}>) => React.JSX.Element;
declare function useAssertWrappedByClerkProvider(displayNameOrFn: string | (() => void)): void;

export { ClerkInstanceContext, ClientContext, OptionsContext, OrganizationProvider, SessionContext, UserContext, assertContextExists, createContextAndHook, isDeeplyEqual, useAssertWrappedByClerkProvider, useClerk, useClerkInstanceContext, useClientContext, useDeepEqualMemo, useOptionsContext, useOrganization, useOrganizationContext, useOrganizationList, useSafeLayoutEffect, useSession, useSessionContext, useSessionList, useUser, useUserContext };
