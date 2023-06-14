const got = require("got");

async function generateShortCode(longURL, customURL) {
  const options = {
    method: "POST",
    url: "https://api.short.io/links",
    headers: {
      authorization: "pk_NgDWQwHqr0xleoMr",
    },
    json: {
      originalURL: longURL,
      alias: customURL,
      domain: "app.trunq.xyz",
    },
    responseType: "json",
  };

  got(options)
    .then((response) => {
      console.log(response.body);
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = generateShortCode;
