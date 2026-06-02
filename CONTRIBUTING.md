# Contributing to NEURAL AURORA

First off, thank you for considering contributing to **NEURAL AURORA** — *The Synaptic Portfolio*. This is an open-source portfolio project built with React, Vite, Three.js, and Supabase. Whether you're fixing a bug, adding a feature, improving docs, or supporting financially — every contribution matters.

---

## Ways to Contribute

- **Code** — Bug fixes, new features, performance improvements, refactoring.
- **Financial Support** — Donations via the [/support](https://neural-aurora.vercel.app/support) page help cover hosting, APIs, and contributor compensation.
- **Documentation** — Improve README, fix typos, add examples, or write guides.
- **Bug Reports & Feature Requests** — Open an issue with a clear description, steps to reproduce, and expected vs. actual behavior.

---

## Getting Started

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/NEURAL-AURORA.git
   ```
3. Follow the [Quick Start](README.md#neural-aurora--setup) instructions in the README to set up the project locally.
4. Create a new branch (see branch naming below).

---

## Development Workflow

### Branch Naming

Use descriptive kebab-case names with a prefix:

| Prefix     | Example                          |
|------------|----------------------------------|
| `feature/` | `feature/particle-system-refactor` |
| `fix/`     | `fix/mobile-nav-overflow`        |
| `chore/`   | `chore/update-tailwind-config`   |

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

feat(admin): add donation preset editor
fix(navbar): correct mobile menu overflow on iOS
docs(readme): update environment variable table
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `chore`.

### Pull Request Process

1. Ensure your branch is up to date with `main`.
2. Run `npm run build` to verify the project builds without errors.
3. Open a PR with a clear title and description linking to any related issues.
4. Maintainers will review and may request changes. Please keep discussions constructive.

---

## Code Standards

- **React / JSX** — Use functional components and hooks. Avoid class components.
- **Tailwind** — Use utility classes directly in JSX. Keep custom CSS in `index.css` only when Tailwind utilities are insufficient.
- **Component Patterns** — Place reusable UI components in `src/components/ui/` and admin components in `src/components/admin/`. Each component in its own file.
- **Imports** — Prefer named exports. Group imports by: React/external libraries → project modules → assets/styles.
- **Formatting** — Use the project's existing style. There is no strict linter config, so match surrounding code.

---

## Contributor Recognition

### Current Project Founder

| Name | Role | GitHub |
|------|------|--------|
| **Amit Kumar (Techhackontime999)** | Founder & Lead Developer | [@Techhackontime999](https://github.com/Techhackontime999) |

### How Contributors Are Listed

All contributors — whether through code, documentation, or financial support — are managed via the **Admin Dashboard → Payment Settings → Contributors** section. Anyone added there will appear:

1. On the live site's **Contributors Section** (public-facing grid)
2. In the project README credits

### Becoming a Contributor

- **Code Contributors** — Submit a PR. Once merged, the maintainer will add you to the contributors list.
- **Financial Donors** — Make a donation via the [/support](https://neural-aurora.vercel.app/support) page. Donors contributing ₹99+ are automatically eligible for listing.
- **Future Expansion** — This system is designed to scale. As the project grows, automated recognition via GitHub API and blockchain-verified donations may be added.

---

## Financial Contributions

If you'd like to support NEURAL AURORA financially, visit the [/support](https://neural-aurora.vercel.app/support) page.

100% of contributions go toward:
- **Development costs** — hosting (Vercel/Supabase), API subscriptions (OpenRouter, Jamendo), and domain renewal.
- **Compensating contributors** — contributors who add features or fix bugs may receive compensation from the support fund.

Every rupee is transparently accounted for. There are no paywalls, no premium tiers — just pure open-source value for the entire community.

---

## Community Guidelines

- Be respectful and inclusive. Harassment, discrimination, or toxic behavior will not be tolerated.
- Provide constructive feedback. Assume good intent.
- Help others learn — this project is a portfolio and a learning resource.
- If you see a problem, speak up respectfully or submit a fix.

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

*Built with synapses, not just syntax.*
