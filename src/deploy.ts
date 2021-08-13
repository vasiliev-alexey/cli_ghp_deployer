import { Logger } from "tslog";
import { Command } from "commander";
import ghPages from "gh-pages";
import inquirer from "inquirer";
import { exec } from "child_process";
import { DeployOptions } from "./types";

const log: Logger = new Logger({ name: "deploy" });

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

const cmd = new Command("ss")
  .arguments("[repo]")
  .arguments("[directory]")
  .option("-b, --buildCommand <command>", "set command to build project")
  // .arguments("<token>")
  .action(
    async (
      repo: string,
      directory: string,
      options: Record<string, unknown>
    ) => {
      log.debug("action - repo:", repo);
      log.debug("action - directory:", directory);
      log.debug("action options:", options);

      if (!repo || !directory) {
        const t = await promptRepo();
      }

      if (options.buildCommand) {
        exec(`npm run ${options.buildCommand}`, (err, stdout, stderr) => {
          if (err) {
            console.error(err, { color: "red" });
          }
          console.info("********** Build started *********");
          console.info(stdout);
          console.info("********** Build finished **********");
        });
      }

      // const params = {
      //   add: true,
      //   repo: `https://${token}@github.com/${owner}/${repo}.git`,
      //   silent: !verbose,
      //   dotfiles,
      // };
    }
  );
export default cmd;
