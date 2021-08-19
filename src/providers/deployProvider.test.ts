import { mocked } from "ts-jest/utils";
import * as gh from "gh-pages";
import { deployDirectory } from "./delployProvider";
import { DeployOptions } from "../types";

jest.mock("gh-pages");

describe("test for argument provider", () => {
  test("call deploy action", async () => {
    const mockedInquirer = mocked(gh, true);

    const pub = mockedInquirer.publish.mockImplementation();

    //  const mock = jest.spyOn(gh, "publish"); // spy on otherFn
    // mock.mockImplementation(() => 4);
    // const publisher = mockedInquirer.publish.mock;

    const opt: DeployOptions = {
      branch: "branch",
      repository: "repository",
      directory: "directory",
      token: "token",
      owner: "owner",
    };

    await deployDirectory(opt);

    expect(pub).toBeCalledWith(
      opt.directory,
      {
        add: true,
        branch: "branch",
        repo: "https://token@github.com/owner/repository.git",
        silent: false,
      },
      expect.any(Function)
    );
  });
});
