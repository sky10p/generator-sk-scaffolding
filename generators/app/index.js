"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

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
        type: "confirm",
        name: "someAnswer",
        message: "Would you like to enable this option?",
        default: true
      },
      {
        type: "list",
        name: "packageManager",
        message: "¿Qué gestor de paquetes deseas utilizar?",
        choices: ["npm", "yarn"],
        default: "npm"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("dummyfile.txt"),
      this.destinationPath("dummyfile.txt")
    );
  }

  install() {
    if (this.props.packageManager === "npm") {
      this.npmInstall();
    } else {
      this.yarnInstall();
    }
  }
};
