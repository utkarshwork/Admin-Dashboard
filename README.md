# NYC2025

# Coding Standards

## TypeScript

- **Use `const` and `let`**: Prefer `const` over `let` wherever possible to ensure immutability.
- **Arrow Functions**: Use arrow functions over regular functions for concise and clear syntax.
- **Interfaces**: Prefer `interface` over `type` wherever applicable to define object shapes.
- **Type Inference**: Rely on TypeScript’s type inference as much as possible to reduce redundant type annotations and improve code readability. Don't use type `any` unless absolutely necessary. Every variable and function parameter should be typed.

## Code Style

- **General**:
  - Unused code should be removed from project.
  - Remove the console logs that were added for debugging/testing when pushing the code.
- **Consistent Naming Convention**: Enforce a consistent naming convention throughout the codebase.
  - **PascalCase for Components**: Name components using PascalCase to distinguish them from regular HTML elements.
  - **camelCase for Variables and Functions**: Use camelCase for variables and functions to maintain consistency and readability.
  - **snake_case or kebab-case for File Names**: Use either snake_case or kebab-case for file names to ensure uniformity across the project.
- **Comments**:
  - Use comments to explain the code where you think a new developer who hasn't worked on that part of code might get confused.
  - Unused code shouldn't be commented. If a function or an api etc is not being used, just remove it.

## Linting and Formatting

- **Prettier**: Use Prettier for code formatting to enforce consistent code style and formatting conventions.
  - Ensure your code is formatted by running `npm run format` before committing.
- **ESLint**: Follow the ESLint rules specified in `.eslintrc.json` to catch potential errors, enforce code style, and maintain code quality.
  - To lint the codebase, run: `npm run lint`

## Frontend

- **Naming Convention**:
  - **Components**: Each component name should be in pascal case.
  - **Functions**: Function names used inside/outside components should be in camel case.
  - **Variables**: Variables/properties should be named according to camel case.
  - **Styled Components**: Styled component name should be prefixed by the string `Styled`. For example you create a specially styled save button, instead of naming it as `SaveButton`, use `StyledSaveButton`.

## [Back to Main README](/README.md)
