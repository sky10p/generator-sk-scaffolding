/* eslint-disable new-cap */
"use strict";
const { execSync } = require("child_process");
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-sk-scaffolding:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      projectName: "my-test-project",
      projectVersion: "0.1.0",
      projectDescription: "A test project",
      projectAuthor: "John Doe",
      license: "ISC",
      githubRepository: "https://github.com/johndoe/my-test-project.git",
      programmingLanguage: "TypeScript"
    });
  });

  it("creates a package.json with correct content", () => {
    const expectedPackageJson = {
      name: "my-test-project",
      version: "0.1.0",
      description: "A test project",
      author: "John Doe",
      repository: {
        type: "git",
        url: "https://github.com/johndoe/my-test-project.git"
      }
    };
    assert.JSONFileContent("package.json", expectedPackageJson);
  });

  it("should create package.json with correct values", () => {
    assert.file(["package.json"]);
    assert.JSONFileContent("package.json", {
      name: "my-test-project",
      version: "0.1.0",
      description: "A test project",
      author: "John Doe",
      repository: {
        type: "git",
        url: "https://github.com/johndoe/my-test-project.git"
      },
      volta: {
        node: process.versions.node,
        yarn: execSync("yarn --version")
          .toString()
          .trim()
      }
    });
  });

  it("should create tsconfig.json and src/index.ts for TypeScript simple repo", () => {
    assert.file(["tsconfig.json", "src/index.ts", ".gitignore"]);
  });

  test("it should generate a README.md file with the correct content", async () => {
    const projectName = "my-test-project";
    const projectDescription = "my-test-project";

    assert.fileContent("Readme.md", `# ${projectName}`);
    assert.fileContent("Readme.md", projectDescription);
  });
});
