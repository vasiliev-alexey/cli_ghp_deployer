/* eslint consistent-return: "off" */
import { exec } from "child_process";

export function buildProject(buildCommand: string): boolean | never {
  exec(`npm run ${buildCommand}`, (err, stdout, stderr): void | never => {
    if (err) {
      console.error("Build Error:", stderr);
      process.exit(-1);
    }
    console.info(
      "********** Build started *********",
      stdout,
      "********** Build finished **********"
    );
  });

  return true;
}
