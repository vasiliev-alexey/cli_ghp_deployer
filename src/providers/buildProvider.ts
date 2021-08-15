/* eslint consistent-return: "off" */
import { exec } from "child_process";

export function buildProject(buildCommand: string): boolean | never {
  if (
    exec(`npm run ${buildCommand}`, (err, stdout, stderr): void | never => {
      if (err) {
        console.error(stderr, { color: "red" });
        process.exit(-1);
      }
      console.info("********** Build started *********");
      console.info(stdout);
      console.info("********** Build finished **********");
    })
  )
    return true;
}
