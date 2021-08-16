import inquirer from "inquirer";
import { DeployOptions } from "../types";

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
    retValue.isError = true;
    retValue.errMsg += "Absent setting for repository";
  }

  if (!opt.directory) {
    retValue.isError = true;
    retValue.errMsg += "Absent directory for repository";
  }

  if (!opt.branch) {
    retValue.isError = true;
    retValue.errMsg += "Absent branch for repository";
  }

  return retValue;
}

export async function promptRepo(): Promise<string> {
  const rez = await inquirer.prompt([
    {
      name: "repo",
      message: "What is repository for deployment?",
      validate(repo: string) {
        return repo.length > 0;
      },
    },
  ]);

  return rez.repo;
}

export async function provideArguments(
  cmdOptions: Record<string, string>
): Promise<DeployOptions | Error> {
  const deployOptions: Partial<DeployOptions> = {};

  if (!cmdOptions.repository) {
    deployOptions.repository = await promptRepo();
  } else {
    deployOptions.repository = cmdOptions.repository.toString();
  }

  if (!cmdOptions.directory) {
    deployOptions.directory = await promptRepo();
  } else {
    deployOptions.directory = cmdOptions.directory.toString();
  }

  if (!cmdOptions.directory) {
    deployOptions.directory = await promptRepo();
  }

  const checkResult = validatePublishOption(deployOptions);

  if (checkResult) {
    return new Error(checkResult.errMsg);
  }

  return deployOptions as DeployOptions;
}
