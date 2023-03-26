"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { execSync } = require("child_process");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super-duper ${chalk.red(
          "generator-sk-scaffolding"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "projectName",
        message: "What is the name of the project?",
        default: this.appname.replace(/\s+/g, "-")
      },
      {
        type: "input",
        name: "projectDescription",
        message: "Provide a short description for the project:",
        default: ""
      },
      {
        type: "input",
        name: "projectVersion",
        message: "What is the initial version of the project?",
        default: "1.0.0"
      },
      {
        type: "input",
        name: "projectAuthor",
        message: "Who is the author of the project?",
        default: ""
      },
      {
        type: "list",
        name: "license",
        message: "Which license would you like to use?",
        choices: [
          { name: "ISC", value: "ISC" },
          { name: "MIT", value: "MIT" },
          { name: "Apache-2.0", value: "Apache-2.0" },
          { name: "GPL-3.0", value: "GPL-3.0" }
          // Agrega más opciones de licencia aquí si lo deseas
        ],
        default: "ISC"
      },
      {
        type: "input",
        name: "githubRepository",
        message: "What is the GitHub repository URL for this project?",
        default: "",
        validate: input => {
          if (!input) {
            return "Please provide a valid GitHub repository URL.";
          }

          const pattern = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(\.git)?$/;
          return (
            pattern.test(input) ||
            "Please provide a valid GitHub repository URL."
          );
        }
      },
      {
        type: "list",
        name: "programmingLanguage",
        message: "Which programming language would you like to use?",
        choices: ["TypeScript"],
        default: "TypeScript"
      },

      /* {
        type: "confirm",
        name: "isNpmProject",
        message: "Is this an npm project? (semantic-release will be added)",
        default: true
      }, */
      /* {
        type: "confirm",
        name: "isMonorepo",
        message: "Is this a monorepo?",
        default: false
      }, */
      {
        type: "confirm",
        name: "addGithubAction",
        message: "Add a GitHub Action?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      const nodeVersion = process.versions.node;
      const yarnVersion = execSync("yarn --version")
        .toString()
        .trim();
      this.answers = { ...props, nodeVersion, yarnVersion };
    });
  }

  writingRootPackageJson() {
    let originalPath = "general/package.json";
    if (this.answers.programmingLanguage === "Typescript") {
      originalPath = "typescript.package.json.ejs";
    }

    this.fs.copyTpl(
      this.templatePath(originalPath),
      this.destinationPath("package.json"),
      this.answers
    );
  }

  writingReadme() {
    this.fs.copyTpl(
      this.templatePath("general/Readme.md"),
      this.destinationPath("README.md"),
      {
        projectName: this.answers.projectName,
        projectDescription: this.answers.projectDescription
      }
    );
  }

  writingTsSimpleRepoConfig() {
    this.fs.copyTpl(
      this.templatePath("node/.gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copyTpl(
      this.templatePath("general/.env.example"),
      this.destinationPath(".env.example")
    );
    this.fs.copyTpl(
      this.templatePath("typescript/src/index.ts"),
      this.destinationPath("src/index.ts")
    );
    this.fs.copyTpl(
      this.templatePath("typescript/tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
  }

  writing() {
    this.writingRootPackageJson();

    if (this.answers.programmingLanguage === "Typescript") {
      this.writingTsSimpleRepoConfig();
    }

    if (this.answers.addReadme) {
      this.writingReadme();
    }
  }

  install() {
    if (this.answers.programmingLanguage === "Typescript") {
      this.addDevDependencies([
        "@types/jest",
        "@types/node",
        "dotenv",
        "jest",
        "ts-jest",
        "ts-node",
        "ts-node-dev",
        "typescript"
      ]);
      this.yarnInstall();
    }
  }
};
