import program from "commander";
import { Logger } from "tslog";
// eslint-disable-next-line import/extensions
import pkg from "../package.json";
import cmd from "./deploy";

const log: Logger = new Logger({ name: "myLogger" });

const appName = pkg.name;

program.description(pkg.description).name(appName).version(pkg.version);

program.addCommand(cmd, program.opts());
log.debug("parse and run");
program.parse(process.argv);
