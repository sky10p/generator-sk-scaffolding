"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const { execSync } = require("child_process");

module.exports = class extends Generator {
  inititializing() {
    this.answers = this.config.getAll();
  }

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
        name: "packageName",
        message: "What is the name of the package?",
        default: this.appname.replace(/\s+/g, "-")
      }
    ];

    return this.prompt(prompts).then(props => {
      const nodeVersion = process.versions.node;
      const yarnVersion = execSync("yarn --version")
        .toString()
        .trim();
      this.answers = { ...this.answers, ...props, nodeVersion, yarnVersion };
    });
  }

  writing() {}

  install() {}
};
