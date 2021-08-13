import program, { Command } from "commander";
import { Logger } from "tslog";
import pkg from "../package.json";
import cmd from "./deploy";

const log: Logger = new Logger({ name: "myLogger" });

const appName = pkg.name;

program
  .description(pkg.description)
  .name(appName)
  // .arguments("[repo]")
  // .option("-b, --buildCommand <command>", "set command to build project")
  // .option("-d, --directory <directory>", "set directory you wish to deploy")
  // .option("-r, --repo <repo>", "set GitHub repository name")
  // .option("-t, --token <token>", "set GitHub token")
  .version(pkg.version);

if (program.opts().directory === null) {
  console.log("directory = null");
  console.log("directory = null");
}

// const cmd = new Command("ss").arguments("<path>").action((path) => {
//   console.log("aaaaaaaaaaaaa");
// });
program.addCommand(cmd, program.opts());

program.parse(process.argv);

// log.debug("program.opts().config", program.opts().buildCommand);

if (program.opts().c) {
  console.log("sssssssssssssssssssssssssssss");
}
