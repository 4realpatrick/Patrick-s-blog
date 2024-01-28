/**
 * @description 一个数组，用户无需登录也可以访问的地址集合
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * @description 用以authentication的地址，用户在登录之前可以访问这些页面，但是用户在登录之后则不能访问这些页面，而是会被重定向到我们设置的页面，反之，如果用户在登录之前访问了不能访问的页面，我们会重定向到登录页
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * @description 不会在auth之前阻止的请求开头，代表着用户在没有登录时，如果有请求是从下方的route而来，则不会阻止，这里是为了登录和注册
 * {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * @description
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
