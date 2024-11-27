const assetsKey =
  "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$";

const config = {
  clearMocks: true,
  coveragePathIgnorePatterns: [
        "/node_modules/",
        "config/tests"
    ],
  moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
        "\\.svg$": "<rootDir>/src/config/tests/mocks/svg.ts",
        [assetsKey
        ]: "ts-jest",
    },

  roots: [
        "<rootDir>"
    ],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
        "<rootDir>/jest.setup.ts"
    ],
  transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            { tsconfig: "tsconfig.app.json"
            }
        ],
        [assetsKey
        ]: [
            "ts-jest",
            { tsconfig: "tsconfig.app.json"
            }
        ],
        "\\.svg$": [
            "ts-jest",
            { tsconfig: "tsconfig.app.json"
            }
        ],
    },
};

export default config;