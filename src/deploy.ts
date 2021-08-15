import { Logger } from "tslog";
import { Command } from "commander";
import { buildProject } from "./providers/buildProvider";
import { provideArguments } from "./providers/argumentProvider";

const log: Logger = new Logger({ name: "deploy" });

const cmd = new Command("ghp-deploy")
  .option("-b, --buildCommand <command>", "set command to build project")
  .option("-r, --repository <command>", "set repository to publish")
  .option("-d, --directory <command>", "set directory to publish")
  .option("-t, --token <command>", "set GitHub token to publish")
  // .arguments("<token>")
  .action(async (directory: string, options: Record<string, string>) => {
    log.debug("action - directory:", directory);
    log.debug("action options:", options);

    log.debug("check validate and prompt params");
    const deployOpts = await provideArguments(options);

    if (deployOpts instanceof Error) {
      log.error(deployOpts.message);
      return process.exit(-1);
    }

    if (options.buildCommand && !buildProject(options.buildCommand)) {
      log.error("build finished with error");
      return process.exit(-1);
    }
    return this;
  });

export default cmd;
