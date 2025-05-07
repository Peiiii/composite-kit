# Publishing Guide

This document outlines the process for publishing the Composite Kit component library.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Pre-release Checklist](#pre-release-checklist)
- [Publishing Steps](#publishing-steps)
- [Package Structure](#package-structure)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)
- [Security](#security)
- [Support](#support)

## Prerequisites

- Node.js 18+ installed
- pnpm 8+ installed
- Git configured with your credentials
- npm account with access to the package repository
- Access to the project's GitHub repository

## Pre-release Checklist

Before starting the release process, ensure:

1. **Code Quality**
   - [ ] All tests are passing
   - [ ] No linting errors
   - [ ] No TypeScript errors
   - [ ] Code coverage meets requirements
   - [ ] All TODOs are addressed

2. **Documentation**
   - [ ] README is up to date
   - [ ] API documentation is complete
   - [ ] Changelog is updated
   - [ ] Migration guide (if needed)

3. **Dependencies**
   - [ ] All dependencies are up to date
   - [ ] No security vulnerabilities
   - [ ] Peer dependencies are correctly specified

4. **Version Management**
   - [ ] Version number follows semantic versioning
   - [ ] Version is updated in all necessary files:
     - package.json
     - package-lock.json
     - CHANGELOG.md
     - README.md (if version is mentioned)

## Publishing Steps

### 1. Version Management

Before publishing, ensure you're following semantic versioning:

- `patch` (0.0.x): For backwards-compatible bug fixes
- `minor` (0.x.0): For new functionality in a backwards-compatible manner
- `major` (x.0.0): For breaking changes

Update the version in `package.json`:

```bash
# For patch version
pnpm version patch

# For minor version
pnpm version minor

# For major version
pnpm version major
```

### 2. Build Process

1. Clean the build directory:
```bash
rm -rf dist
```

2. Build the library:
```bash
pnpm run build:lib
```

3. Verify the build output:
- [ ] Check `dist/index.js` exists and is valid
- [ ] Check `dist/index.css` exists and is valid
- [ ] Check `dist/index.d.ts` exists and is valid
- [ ] Check `dist/tailwind.js` exists (if applicable)
- [ ] Verify all exports are correctly bundled

### 3. Testing

1. Run the test suite:
```bash
pnpm test
```

2. Test the build locally:
```bash
cd examples/test-app
pnpm install
pnpm run dev
```

3. Verify in a real project:
```bash
# 方法一：使用快捷命令
pnpm run test:app

# 方法二：手动执行步骤
cd examples/test-app-npm
pnpm install
pnpm add composite-kit@latest
pnpm run dev
```
- 打开浏览器访问本地地址（通常是 http://localhost:5173 或 http://localhost:5174）
- 手动验证以下内容：
  - 组件功能是否正常
  - 样式是否正确加载
  - 交互是否流畅
  - 控制台是否有错误信息

### 4. Publishing

1. Login to npm (if not already logged in):
```bash
npm login
```

2. Publish the package:
```bash
npm publish
```

3. Verify the published package:
```bash
npm view composite-kit
```

### 5. Post-Publishing

1. Create a git tag for the release:
```bash
git tag v<version>
git push origin v<version>
```

2. Update the changelog in `CHANGELOG.md`:
   - Add release date
   - List all changes
   - Include migration notes if needed

3. Push changes to the repository:
```bash
git push origin main
```

4. Create a GitHub release:
   - Use the tag as the release name
   - Copy changelog content
   - Add any additional release notes

## Package Structure

The published package includes:

- `dist/index.js`: Main library bundle
- `dist/index.css`: Styles bundle
- `dist/index.d.ts`: TypeScript declarations
- `dist/tailwind.js`: Tailwind configuration (if applicable)
- `README.md`: Documentation
- `LICENSE`: License file
- `CHANGELOG.md`: Version history

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check for TypeScript errors
   - Verify all dependencies are installed
   - Check Vite configuration
   - Check for circular dependencies

2. **Styles not working**
   - Verify CSS is properly exported
   - Check Tailwind configuration
   - Ensure proper CSS imports in consuming projects
   - Check for CSS conflicts

3. **TypeScript errors in consuming projects**
   - Verify type declarations are generated
   - Check for missing type dependencies
   - Update TypeScript configuration if needed
   - Check for type conflicts

### Getting Help

If you encounter issues during the publishing process:

1. Check the [GitHub Issues](https://github.com/your-repo/issues)
2. Review the [Documentation](https://your-docs-url)
3. Contact the maintainers
4. Check the [npm Status Page](https://status.npmjs.org/)

## Best Practices

1. **Before Publishing**
   - Always test the build locally
   - Run security audits
   - Check for common vulnerabilities
   - Verify all examples work

2. **Version Management**
   - Follow semantic versioning strictly
   - Document breaking changes
   - Keep changelog up to date
   - Use conventional commits

3. **Quality Assurance**
   - Write comprehensive tests
   - Maintain good code coverage
   - Document all APIs
   - Keep dependencies updated

4. **Security**
   - Never commit sensitive information
   - Use environment variables for credentials
   - Keep dependencies updated
   - Run security audits regularly

## CI/CD Integration

The publishing process can be automated using GitHub Actions. See `.github/workflows/publish.yml` for the configuration.

### Automated Checks

- [ ] Tests pass
- [ ] Build succeeds
- [ ] No security vulnerabilities
- [ ] Code coverage meets threshold
- [ ] Documentation is up to date

## Security

- Never commit sensitive information
- Use environment variables for credentials
- Keep dependencies updated
- Run security audits regularly
- Use npm audit
- Enable 2FA for npm account

## Support

For questions or issues related to publishing:

- Open a GitHub issue
- Contact the maintainers
- Check the documentation
- Join the community chat 