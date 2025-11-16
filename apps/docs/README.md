# Propery Connect Documentation

This directory contains the Mintlify-powered developer documentation for Propery Connect.

## Getting Started

### Prerequisites

Install the Mintlify CLI globally:

```bash
npm install -g mintlify
```

### Running Locally

From the project root:

```bash
npm run dev --workspace=@propery-connect/docs
```

Or from this directory:

```bash
mintlify dev
```

The documentation will be available at `http://localhost:3001`.

## Project Structure

```
apps/docs/
├── mint.json                   # Mintlify configuration
├── introduction.mdx            # Home page
├── quickstart.mdx              # Getting started guide
├── architecture.mdx            # Architecture overview
├── development/                # Development guides
│   ├── setup.mdx
│   ├── monorepo.mdx
│   ├── patterns.mdx
│   └── database.mdx
├── frontend/                   # Frontend docs
├── backend/                    # Backend docs
└── api-reference/              # API documentation
    ├── introduction.mdx
    └── endpoint/
        ├── auth.mdx
        ├── listings.mdx
        ├── payments.mdx
        └── whatsapp.mdx
```

## Writing Documentation

### Creating a New Page

1. Create an `.mdx` file in the appropriate directory
2. Add frontmatter:

```mdx
---
title: 'Page Title'
description: 'Page description for SEO'
icon: 'icon-name' # Optional: FontAwesome icon
---

Your content here...
```

3. Add the page to `mint.json` navigation:

```json
{
  "group": "Group Name",
  "pages": ["path/to/your-page"]
}
```

### Available Components

Mintlify provides rich components:

- `<Card>` - Feature cards
- `<CardGroup>` - Grid of cards
- `<Accordion>` - Collapsible sections
- `<AccordionGroup>` - Multiple accordions
- `<CodeGroup>` - Tabbed code blocks
- `<Steps>` - Step-by-step guides
- `<Tabs>` - Content tabs
- `<Note>` - Information callouts
- `<Warning>` - Warning callouts
- `<Tip>` - Tip callouts

See [Mintlify docs](https://mintlify.com/docs) for full component reference.

## Deployment

The documentation is automatically deployed via Mintlify when pushed to the repository.

To configure deployment:

1. Go to [Mintlify Dashboard](https://dashboard.mintlify.com)
2. Connect your GitHub repository
3. Set the documentation directory to `apps/docs`
4. Configure your custom domain (optional)

## Contributing

When adding new features to the codebase:

1. Document the feature in the appropriate section
2. Update code examples if API changes
3. Add to the quickstart guide if it's a core feature
4. Keep the documentation in sync with the code

## Mintlify CLI Commands

```bash
# Start development server
mintlify dev

# Check for broken links
mintlify broken-links

# Install CLI globally
npm install -g mintlify
```

## Resources

- [Mintlify Documentation](https://mintlify.com/docs)
- [Mintlify Components](https://mintlify.com/docs/create/text)
- [OpenAPI Integration](https://mintlify.com/docs/api-playground/openapi-setup)
