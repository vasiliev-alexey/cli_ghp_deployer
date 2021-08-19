import cp, { ChildProcess, ExecException } from "child_process";
import { buildProject } from "./buildProvider";

jest.mock("child_process");
describe("test for argument provider", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test("if define build command - should by run npm script", () => {
    let execCallback: (
      error: ExecException | null,
      stdout: string,
      stderr: string
    ) => void;

    jest
      .spyOn(cp, "exec")
      // eslint-disable-next-line func-names
      .mockImplementation(function (
        this: ChildProcess,
        command: string,
        options: unknown,
        callback?: (
          error: ExecException | null,
          stdout: string,
          stderr: string
        ) => void
      ): ChildProcess {
        if (callback) {
          // eslint-disable-next-line    @typescript-eslint/no-unused-vars
          execCallback = callback;
        }
        return this;
      });

    buildProject("111");
    expect(cp.exec).toBeCalledTimes(1);
  });
});
