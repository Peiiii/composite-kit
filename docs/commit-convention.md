# Commit Message Convention

## Language

All commit messages must be written in English. This ensures consistency and makes the commit history more accessible to all team members.

## English Message

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This helps maintain a clear and consistent commit history.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

### Examples

```
feat(nav): add new mobile navigation component
fix(button): correct hover state color
docs(readme): update installation instructions
style(theme): format color variables
refactor(nav): move config to demo page
perf(animation): optimize transition performance
test(button): add hover state test cases
chore(deps): update dependencies
```

### Notes

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end
- Keep the description concise and clear 