import inquirer from "inquirer";
import { mocked } from "ts-jest/utils";

import { provideArguments } from "./argumentProvider";
import { DeployOptions } from "../types";

jest.mock("inquirer");

function genCmdOpts(): Record<string, string> {
  return {
    repository: "repository",
    token: "token",
    directory: "src",
    branch: "branch",
    owner: "owner",
  };
}

describe("test for argument provider", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test("test call  prompt without param owner ", async () => {
    const mockedInquirer = mocked(inquirer, true);

    const rndValue = Math.random().toFixed(10);
    const m = mockedInquirer.prompt.mockResolvedValueOnce({
      owner: rndValue,
    });

    const deployOpts = await provideArguments({
      ...genCmdOpts(),
      owner: "",
    });

    expect(m).toBeCalledTimes(1);
    expect(deployOpts).not.toBeInstanceOf(Error);
    expect((deployOpts as DeployOptions).owner).toBe(rndValue);
  });

  test("test call  prompt without token ", async () => {
    const mockedInquirer = mocked(inquirer, true);

    const rndValue = Math.random().toFixed(10);
    const m = mockedInquirer.prompt.mockResolvedValueOnce({
      token: rndValue,
    });

    process.env.GITHUB_TOKEN = rndValue;
    const deployOpts = await provideArguments({
      ...genCmdOpts(),
      token: null,
    });

    expect(m).toBeCalledTimes(0);
    expect(deployOpts).not.toBeInstanceOf(Error);
    expect((deployOpts as DeployOptions).token).toBe(rndValue);
  });

  test("test call  prompt without error dir ", async () => {
    const deployOpts = await provideArguments({
      ...genCmdOpts(),
      directory: "error_dir",
    });
    expect(deployOpts).toBeInstanceOf(Error);
    expect((deployOpts as Error).message).toBe(
      "undefinedAbsent directory in repository for deploy"
    );
  });
});
