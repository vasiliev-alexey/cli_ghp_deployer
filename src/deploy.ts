import { Logger } from "tslog";
import { Command } from "commander";
import { buildProject } from "./providers/buildProvider";
import { provideArguments } from "./providers/argumentProvider";
import { deployDirectory } from "./providers/delployProvider";
import { loggerFactory } from "./logger";

const log: Logger = loggerFactory("Main");

const cmd = new Command("ghp-deploy")
  .option("-o, --owner <command>", "set owner to deploy project")
  .option("-a, --buildCommand <command>", "set command to build project")
  .option("-r, --repository <command>", "set repository to publish")
  .option("-d, --directory <command>", "set directory to publish")
  .option("-b --branch <command>", "set branch to publish")
  .option("-t, --token <command>", "set GitHub token to publish")

  .action(async (options: Record<string, string>) => {
    log.debug("check validate and prompt params");

    const deployOpts = await provideArguments(options);

    if (deployOpts instanceof Error) {
      log.debug("options invalid");
      log.error(deployOpts.name, deployOpts.message);
      return process.exit(-1);
    }

    if (options.buildCommand && !buildProject(options.buildCommand)) {
      log.error("build finished with error");
      return process.exit(-1);
    }

    await deployDirectory(deployOpts);

    return this;
  });

export default cmd;
