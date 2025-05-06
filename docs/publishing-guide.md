# Publishing Guide

This document outlines the process for publishing the Composite Kit component library.

## Prerequisites

- Node.js 18+ installed
- pnpm 8+ installed
- Git configured with your credentials
- npm account with access to the package repository

## Publishing Steps

### 1. Version Management

Before publishing, ensure you're following semantic versioning:

- `patch`: For backwards-compatible bug fixes
- `minor`: For new functionality in a backwards-compatible manner
- `major`: For breaking changes

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
- Check `dist/index.js` exists
- Check `dist/index.css` exists
- Check `dist/index.d.ts` exists

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

### 4. Publishing

1. Login to npm (if not already logged in):
```bash
npm login
```

2. Publish the package:
```bash
npm publish
```

### 5. Post-Publishing

1. Create a git tag for the release:
```bash
git tag v<version>
git push origin v<version>
```

2. Update the changelog in `CHANGELOG.md`

3. Push changes to the repository:
```bash
git push origin main
```

## Package Structure

The published package includes:

- `dist/index.js`: Main library bundle
- `dist/index.css`: Styles bundle
- `dist/index.d.ts`: TypeScript declarations
- `dist/tailwind.js`: Tailwind configuration (if applicable)

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check for TypeScript errors
   - Verify all dependencies are installed
   - Check Vite configuration

2. **Styles not working**
   - Verify CSS is properly exported
   - Check Tailwind configuration
   - Ensure proper CSS imports in consuming projects

3. **TypeScript errors in consuming projects**
   - Verify type declarations are generated
   - Check for missing type dependencies
   - Update TypeScript configuration if needed

### Getting Help

If you encounter issues during the publishing process:

1. Check the [GitHub Issues](https://github.com/your-repo/issues)
2. Review the [Documentation](https://your-docs-url)
3. Contact the maintainers

## Best Practices

1. Always test the build locally before publishing
2. Keep the changelog up to date
3. Follow semantic versioning strictly
4. Document breaking changes
5. Test the package in a real project before publishing

## CI/CD Integration

The publishing process can be automated using GitHub Actions. See `.github/workflows/publish.yml` for the configuration.

## Security

- Never commit sensitive information
- Use environment variables for credentials
- Keep dependencies updated
- Run security audits regularly

## Support

For questions or issues related to publishing:

- Open a GitHub issue
- Contact the maintainers
- Check the documentation 