import { exec } from "child_process";
import fs from "fs";
import path from "path";

describe("main integration test", () => {
  it("my main integration test", async () => {
    fs.writeFileSync(
      path.resolve("deploy_dir/ww.w"),
      Math.random().toFixed(100)
    );

    let isErr = false;
    exec(`npm run deploy`, (err, stdout, stderr): void | never => {
      if (err) {
        console.error(
          "********** deploy stderr *********",
          stderr,
          "********** stderr stderr **********"
        );
        isErr = true;
      }
      console.info(
        "********** deploy started *********",
        stdout,
        "********** Build deploy **********"
      );
    });
    expect(isErr).toBeFalsy();
  }, 10000);
});
