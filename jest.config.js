export default {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!@mui|@babel/runtime)"],
  moduleNameMapper: {
    "^@mui/styled-engine/(.*)$": "@mui/styled-engine-sc/sc/$1",
    "^@mui/material/(.*)$": "<rootDir>/node_modules/@mui/material/$1",
    "^@mui/icons-material/(.*)$":
      "<rootDir>/node_modules/@mui/icons-material/$1",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testMatch: ["<rootDir>/src/**/*.test.(js|jsx|ts|tsx)"],
  moduleDirectories: ["node_modules", "src"],
};
