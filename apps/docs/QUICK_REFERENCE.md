# Mintlify Documentation - Quick Reference

## 🚀 Quick Start

```bash
# Install Mintlify CLI globally (one-time setup)
npm install -g mintlify

# Run documentation site locally
npm run dev --workspace=@propery-connect/docs

# Or from docs directory
cd apps/docs && mintlify dev
```

Access at: **http://localhost:3001**

## 📁 File Structure

```
apps/docs/
├── mint.json               # Configuration (navigation, colors, settings)
├── *.mdx                   # Documentation pages
├── development/            # Dev guides
├── frontend/              # Frontend docs
├── backend/               # Backend docs
├── api-reference/         # API docs
└── logo/                  # Brand assets (add your logos here)
```

## ✏️ Creating Pages

### 1. Create `.mdx` File

```mdx
---
title: 'Page Title'
description: 'SEO description'
icon: 'rocket' # Optional: FontAwesome icon name
---

# Your Content Here

Use markdown and Mintlify components...
```

### 2. Add to Navigation

Edit `mint.json`:

```json
{
  "navigation": [
    {
      "group": "Group Name",
      "pages": [
        "path/to/your-page" // Relative to docs directory, no .mdx
      ]
    }
  ]
}
```

## 🎨 Common Components

### Cards

```mdx
<Card title="Title" icon="icon-name" href="/link">
  Content
</Card>

<CardGroup cols={2}>
  <Card title="Card 1" icon="rocket">
    Content 1
  </Card>
  <Card title="Card 2" icon="star">
    Content 2
  </Card>
</CardGroup>
```

### Code Blocks

````mdx
<CodeGroup>
```bash Terminal
npm install
````

```javascript JavaScript
const x = 10;
```

</CodeGroup>
```

### Accordions

```mdx
<AccordionGroup>
  <Accordion title="Question 1">Answer 1</Accordion>
  <Accordion title="Question 2">Answer 2</Accordion>
</AccordionGroup>
```

### Steps

```mdx
<Steps>
  <Step title="First Step">Do this first</Step>
  <Step title="Second Step">Then do this</Step>
</Steps>
```

### Callouts

```mdx
<Note>Informational message</Note>

<Warning>Warning message</Warning>

<Tip>Helpful tip</Tip>

<Info>Additional information</Info>
```

### Tabs

```mdx
<Tabs>
  <Tab title="Option 1">Content for option 1</Tab>
  <Tab title="Option 2">Content for option 2</Tab>
</Tabs>
```

## 🎯 Configuration Tips

### Colors (mint.json)

```json
{
  "colors": {
    "primary": "#0D9373",
    "light": "#07C983",
    "dark": "#0D9373"
  }
}
```

### Logo (mint.json)

```json
{
  "logo": {
    "dark": "/logo/dark.svg",
    "light": "/logo/light.svg"
  }
}
```

### API Playground (mint.json)

```json
{
  "api": {
    "baseUrl": "http://localhost:3005/api",
    "auth": {
      "method": "bearer"
    }
  }
}
```

## 📝 Markdown Features

```mdx
# Heading 1

## Heading 2

### Heading 3

**Bold text**
_Italic text_
`inline code`

[Link text](https://example.com)

- Bullet list
- Item 2

1. Numbered list
2. Item 2

> Blockquote

| Column 1 | Column 2 |
| -------- | -------- |
| Data     | Data     |
```

## 🔍 Icons

Use FontAwesome icon names (without `fa-` prefix):

- `rocket`, `star`, `code`, `terminal`
- `database`, `server`, `shield`
- `book`, `file`, `folder`

Full list: [FontAwesome Icons](https://fontawesome.com/icons)

## 🚀 Deployment

### Mintlify Cloud (Recommended)

1. Visit [dashboard.mintlify.com](https://dashboard.mintlify.com)
2. Connect GitHub repository
3. Set docs directory: `apps/docs`
4. Auto-deploys on push

### Custom Domain

Configure in Mintlify dashboard settings.

## 📚 Resources

- [Mintlify Docs](https://mintlify.com/docs)
- [Components Reference](https://mintlify.com/docs/create/text)
- [OpenAPI Integration](https://mintlify.com/docs/api-playground/openapi-setup)

## 🆘 Troubleshooting

### Mintlify CLI not found

```bash
npm install -g mintlify
# or
npm run install:mintlify --workspace=@propery-connect/docs
```

### Port 3001 in use

Mintlify will auto-select another port (usually 3002).

### Changes not showing

1. Stop dev server (Ctrl+C)
2. Restart: `mintlify dev`
3. Hard refresh browser (Ctrl+Shift+R)

---

**Happy documenting! 📚**
