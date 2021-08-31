#!/usr/bin/env node
import program from "commander";

import pkg from "../package.json";
import cmd from "./deploy";

const appName = pkg.name;

program
  .description(pkg.description)
  .name(appName)
  .version(pkg.version)
  .addCommand(cmd, program.opts());
program.parse(process.argv);
