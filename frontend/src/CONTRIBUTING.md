# Contributing to Rakta Sanjivini

Thank you for your interest in contributing to Rakta Sanjivini! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/rakta-sanjivini.git
   cd rakta-sanjivini
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow existing component structure and naming conventions
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Ensure responsive design for all components
- Use semantic HTML elements

### Component Guidelines
- Create reusable components in the `components/` directory
- Use the existing shadcn/ui components when possible
- Implement proper TypeScript interfaces for props
- Include proper error handling and loading states

### Testing
- Test your changes across different screen sizes
- Verify functionality works for all user types (Patient, Donor, Blood Bank)
- Ensure accessibility standards are met

## 📝 Commit Guidelines

Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example:
```
feat: add blood request tracking for patients
fix: resolve mobile navigation menu issue
docs: update installation instructions
```

## 🔄 Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Screenshots for UI changes
   - List of changes made
   - Any breaking changes noted

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser and device information
- Screenshots if applicable

## 💡 Feature Requests

For feature requests, please:
- Check if the feature already exists or is planned
- Provide clear use case and benefits
- Consider implementation complexity
- Discuss with maintainers before starting work

## 🏥 Healthcare Considerations

This is a healthcare-related application. Please consider:
- **Patient Privacy**: Never commit real patient data
- **Data Security**: Follow security best practices
- **Accessibility**: Ensure features work for users with disabilities
- **Emergency Use**: Critical features should be reliable and fast

## 🎨 Design Guidelines

- Follow the existing color scheme (red for blood-related elements)
- Maintain consistent spacing and typography
- Use appropriate icons from Lucide React
- Ensure good contrast ratios for accessibility
- Test dark mode compatibility

## 📚 Documentation

Help improve documentation by:
- Updating README.md for new features
- Adding inline code comments for complex logic
- Creating examples for new components
- Improving setup and deployment guides

## 🤝 Community

- Be respectful and inclusive
- Help other contributors
- Share knowledge and best practices
- Follow the code of conduct

## 📞 Questions?

If you have questions about contributing:
- Open an issue for discussion
- Check existing issues and discussions
- Review the guidelines and documentation

## 🙏 Recognition

All contributors will be recognized in our contributor list. Thank you for helping save lives through technology!

---

By contributing to Rakta Sanjivini, you're helping create a better blood bank management system that can save lives. Every contribution matters! 🩸