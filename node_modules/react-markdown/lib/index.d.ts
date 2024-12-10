/**
 * Component to render markdown.
 *
 * @param {Readonly<Options>} options
 *   Props.
 * @returns {JSX.Element}
 *   React element.
 */
export function Markdown(options: Readonly<Options>): JSX.Element;
/**
 * Make a URL safe.
 *
 * @satisfies {UrlTransform}
 * @param {string} value
 *   URL.
 * @returns {string}
 *   Safe URL.
 */
export function defaultUrlTransform(value: string): string;
export type Element = import('hast').Element;
export type ElementContent = import('hast').ElementContent;
export type Nodes = import('hast').Nodes;
export type Parents = import('hast').Parents;
export type Root = import('hast').Root;
export type JsxRuntimeComponents = import('hast-util-to-jsx-runtime').Components;
export type RemarkRehypeOptions = import('remark-rehype').Options;
export type Visitor = import('unist-util-visit').BuildVisitor<Root>;
export type PluggableList = import('unified').PluggableList;
/**
 * Filter elements.
 */
export type AllowElement = (element: Readonly<Element>, index: number, parent: Readonly<Parents> | undefined) => boolean | null | undefined;
/**
 * Map tag names to components.
 */
export type Components = Partial<JsxRuntimeComponents>;
/**
 * Deprecation.
 */
export type Deprecation = {
    /**
     *   Old field.
     */
    from: string;
    /**
     *   ID in readme.
     */
    id: string;
    /**
     * New field.
     */
    to?: keyof Options;
};
/**
 * Configuration.
 */
export type Options = {
    /**
     * Filter elements (optional);
     * `allowedElements` / `disallowedElements` is used first.
     */
    allowElement?: AllowElement | null | undefined;
    /**
     * Tag names to allow (default: all tag names);
     * cannot combine w/ `disallowedElements`.
     */
    allowedElements?: ReadonlyArray<string> | null | undefined;
    /**
     * Markdown.
     */
    children?: string | null | undefined;
    /**
     * Wrap in a `div` with this class name.
     */
    className?: string | null | undefined;
    /**
     * Map tag names to components.
     */
    components?: Components | null | undefined;
    /**
     * Tag names to disallow (default: `[]`);
     * cannot combine w/ `allowedElements`.
     */
    disallowedElements?: ReadonlyArray<string> | null | undefined;
    /**
     * List of rehype plugins to use.
     */
    rehypePlugins?: import("unified").PluggableList | null | undefined;
    /**
     * List of remark plugins to use.
     */
    remarkPlugins?: import("unified").PluggableList | null | undefined;
    /**
     * Options to pass through to `remark-rehype`.
     */
    remarkRehypeOptions?: Readonly<RemarkRehypeOptions> | null | undefined;
    /**
     * Ignore HTML in markdown completely (default: `false`).
     */
    skipHtml?: boolean | null | undefined;
    /**
     * Extract (unwrap) what’s in disallowed elements (default: `false`);
     * normally when say `strong` is not allowed, it and it’s children are dropped,
     * with `unwrapDisallowed` the element itself is replaced by its children.
     */
    unwrapDisallowed?: boolean | null | undefined;
    /**
     * Change URLs (default: `defaultUrlTransform`)
     */
    urlTransform?: UrlTransform | null | undefined;
};
/**
 * Transform all URLs.
 */
export type UrlTransform = (url: string, key: string, node: Readonly<Element>) => string | null | undefined;
