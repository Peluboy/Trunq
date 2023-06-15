import React, { createContext, useState } from "react";

export const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [totalClicks, setTotalClicks] = useState(0);

  const updateTotalClicks = (newTotalClicks) => {
    setTotalClicks(newTotalClicks);
  };

  return (
    <LinkContext.Provider value={{ totalClicks, updateTotalClicks }}>
      {children}
    </LinkContext.Provider>
  );
};
