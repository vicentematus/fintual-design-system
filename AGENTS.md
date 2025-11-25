- In all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision.
- Remember we re using pnpm workspaces. So you need to run pnpm commands in the root directory. Don't go to the packages/ folder to run things.
- If you want to run storybook, remember to check for the prefix ds in the @package.json file.

## Git

- When creating branches, prefix them with the following: define the type, context and description. For example:
  - feat: a new feature
  - fix: fix a bug.
  - docs: changes to documentation
  - style: changes that don't affect the functionality of the code (spaces, indentation, etc).
  - refactor: change to the code that doesn't affect the functionality of the code, or it doesn't fix a bug.
  - perf: changes to the code that affect only performances
  - test: add or fix tests.
  - chore: changes to the build system or complementary tools

## Plans

- At the end of each plan, give me a list of unresolved questions to answer, if any. Make the questions extremely concise. Sacrifice grammar for the sake of concision.
