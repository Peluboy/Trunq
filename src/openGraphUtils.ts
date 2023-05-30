export const updateOGPTags = (
  name: string,
  longURL: string,
  shortCode: string
) => {
  if (longURL) {
    const title = `${name} - ${longURL}`;
    const description = `Check out this link: ${longURL}`;
    const url = `${window.location.protocol}//${window.location.host}/${shortCode}`;

    const metaTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
    ];

    return metaTags;
  }
  return [];
};
