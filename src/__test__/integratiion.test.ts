import { exec } from "child_process";
import fs from "fs";
import path from "path";
import axios from "axios";
import exp from "constants";

describe("main integration test", () => {
  it("my main integration test", async () => {
    const dummyData = Math.random().toFixed(16);
    fs.writeFileSync(path.resolve("deploy_dir/", dummyData), dummyData);
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

    await new Promise((r) => setTimeout(r, 20_000));

    const data = await axios.get(
      `https://raw.githubusercontent.com/vasiliev-alexey/test_repo_for_publish/gh-pages/${dummyData}`
    );
    const body = await data;
    expect(+dummyData).toEqual(+body.data);
  }, 60000);
});
