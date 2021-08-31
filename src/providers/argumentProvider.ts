import inquirer from "inquirer";
import { Logger } from "tslog";
import fs from "fs";
import userName from "git-user-name";
import { DeployOptions } from "../types";
import { loggerFactory } from "../logger";

const logger: Logger = loggerFactory("provideArguments");

function validatePublishOption(opt: Partial<DeployOptions>): {
  isError: boolean;
  errMsg?: string;
} {
  const retValue: {
    isError: boolean;
    errMsg?: string;
  } = {
    isError: false,
  };

  if (!opt.repository) {
    retValue.errMsg += "Absent setting for repository";
  }
  if (!opt.owner) {
    retValue.errMsg += "Absent setting for owner";
  }

  if (!opt.directory) {
    retValue.errMsg += "Absent option for directory for repository";
  } else if (!fs.existsSync(opt.directory)) {
    retValue.errMsg += "Absent directory in repository for deploy";
  }

  if (!opt.branch) {
    retValue.errMsg += "Absent branch for repository";
  }

  retValue.isError = Boolean(retValue.errMsg);

  return retValue;
}

async function promptOption(
  optName: string,
  defaultValue?: string
): Promise<string> {
  const rez = await inquirer.prompt([
    {
      name: optName,
      type: "input",
      default: defaultValue,
      message: `What is ${optName} for deployment?`,
      validate(inputName) {
        return inputName.length > 0;
      },
    },
  ]);

  return rez[optName];
}

export async function provideArguments(
  cmdOptions: Record<string, string>
): Promise<DeployOptions | Error> {
  logger.info("cmdOptions", cmdOptions);

  const deployOptions: Partial<DeployOptions> = {};

  if (!cmdOptions.owner) {
    deployOptions.owner = await promptOption("owner", userName());
  } else {
    deployOptions.owner = cmdOptions.owner.toString();
  }

  if (!cmdOptions.token) {
    //  try find in ENV

    if (process.env.GITHUB_TOKEN) {
      logger.debug("used GITHUB_TOKEN from ENVIRONMENT var");
      deployOptions.token = process.env.GITHUB_TOKEN;
    } else {
      deployOptions.token = await promptOption("token");
    }
  } else {
    deployOptions.token = cmdOptions.token.toString();
  }

  if (!cmdOptions.repository) {
    deployOptions.repository = await promptOption("repository");
  } else {
    deployOptions.repository = cmdOptions.repository.toString();
  }

  if (!cmdOptions.branch) {
    deployOptions.branch = await promptOption("branch", "gh-pages");
  } else {
    deployOptions.branch = cmdOptions.branch.toString();
  }

  if (!cmdOptions.directory) {
    deployOptions.directory = await promptOption("directory", "dist");
  } else {
    deployOptions.directory = cmdOptions.directory.toString();
  }

  const checkResult = validatePublishOption(deployOptions);

  if (checkResult.isError) {
    return new Error(checkResult.errMsg);
  }

  return deployOptions as DeployOptions;
}
