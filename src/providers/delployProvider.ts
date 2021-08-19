import { publish } from "gh-pages";

import { loggerFactory } from "../logger";
import { DeployOptions } from "../types";

const logger = loggerFactory("Main");

function deploy(
  directory: string,
  {
    token,
    owner,
    repo,
    branch,
    verbose = false,
  }: {
    token: string;
    owner: string;
    repo: string;
    verbose: boolean;
    branch: string;
  }
): Promise<boolean> {
  const params = {
    add: true,
    branch,
    repo: `https://${token}@github.com/${owner}/${repo}.git`,
    silent: !verbose,
  };

  logger.trace("params", params);

  publish(directory, params, () => Promise.resolve(false));
  return Promise.resolve(true);
}

export async function deployDirectory(
  deployOptions: DeployOptions
): Promise<boolean> {
  logger.info(deployOptions);

  return deploy(deployOptions.directory, {
    token: deployOptions.token,
    owner: deployOptions.owner,
    repo: deployOptions.repository,
    verbose: true,
    branch: deployOptions.branch,
  });
}
