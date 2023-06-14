import React, { useState } from "react";

const ShortenLinkForm: React.FC = () => {
  const [link, setLink] = useState<string>(""); // Explicitly define the type as string
  const [shortURL, setShortURL] = useState<string>("");

  const generateShortCode = async (longURL: string, customURL?: string) => {
    try {
      const data = {
        domain: "app.trunq.xyz",
        originalURL: longURL,
        allowDuplicates: false,
      };

      const response = await fetch("https://api.short.cm/links/public", {
        method: "post",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: "pk_NgDWQwHqr0xleoMr",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setShortURL(responseData.shortURL);
    } catch (error) {
      console.error("Error shortening link:", error);
    }
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const isValidURL = /^(ftp|http|https):\/\/[^ "]+$/.test(link);
      const longURL = isValidURL ? link : `http://${link}`;
      const customURL = ""; // Change this line to obtain the value from the form input

      if (!customURL && customURL.trim() === "") {
        await generateShortCode(longURL);
      } else {
        await generateShortCode(longURL, customURL);
      }
    } catch (error) {
      console.error("Error generating shortcode:", error);
    }

    setLink("");
  };

  return (
    <div>
      <h1 className="message">Shorten your first link!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="text"
            type="url"
            value={link}
            onChange={handleLinkChange}
            id="linkinput"
            placeholder="Paste a URL to shorten"
          />
          <input type="submit" id="myinput" value="Shorten" />
        </div>
      </form>
      {shortURL && <p id="message">Your short link is {shortURL}</p>}
    </div>
  );
};

export default ShortenLinkForm;
