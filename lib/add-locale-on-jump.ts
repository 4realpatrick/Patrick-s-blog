export const addLocaleOnJump = (url: string) => {
  const match = location.href.match(/(?:https?:\/\/[^/]+)?\/([a-z]{2})($|\/)/);
  if (match) {
    return `/${match[1]}${url}`;
  }
  return `/zh${url}`;
};
