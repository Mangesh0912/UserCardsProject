module.exports = {
    transform: {
      "^.+\\.(ts|tsx)$": "babel-jest",
      "^.+\\.jsx?$": "babel-jest" // Add this line to handle JavaScript files
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
  };