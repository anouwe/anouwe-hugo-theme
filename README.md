# anouwe-hugo-theme

Hugo theme from anouwe

## Description

`anouwe-hugo-theme` is a Hugo theme designed to be simple, elegant, and easy to use. It is ideal for blogs, portfolios, and personal websites.

## Features

- Responsive design
- Blog post support
- Easy social media integration
- Customizable colors and fonts
- Comments support via Disqus or Commento
- Built-in contact form

## Installation

### As a Hugo Module (recommended)

1. From the root directory of your project, initialize the Hugo module system if you haven't already:

```bash
hugo mod init github.com/<your_username>/<your_project>
```

1. Add the theme as a module dependency:

```bash
hugo mod get github.com/anouwe/anouwe-hugo-theme
```

1. Add the theme to your site's configuration file:

```toml
theme = "anouwe-hugo-theme"
```

### As a Git Submodule

1. Add the theme as a submodule:

```bash
git submodule add https://github.com/anouwe/anouwe-hugo-theme.git themes/anouwe
```

1. Add the theme to your site's configuration file:

```toml
theme = "anouwe"
```

## Usage

To use the theme, simply run Hugo as usual:

```bash
hugo server
```

Visit `http://localhost:1313` in your browser to see your site with the `anouwe-hugo-theme`.

## Theme Configuration

### Generating theme.json

The theme uses an automatic CSS variables and theme.json file generation system. To enable it, add the following section to your package.json:

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "scripts": {
    "dev": "hugo server",
    "build": "hugo --minify",
    "prebuild:theme": "node themes/anouwe/scripts/generateThemeVariables.mjs"
  },
  "dependencies": {
    "flowbite": "^1.6.5"
  },
  "devDependencies": {
    "@iarna/toml": "^2.2.5",
    "@tailwindcss/typography": "^0.5.9",
    "autoprefixer": "^10.4.14",
    "color": "^4.2.3",
    "cssnano": "^6.0.1",
    "js-yaml": "^4.1.0",
    "postcss": "^8.4.24",
    "postcss-cli": "^10.1.0",
    "tailwindcss": "^3.3.2"
  }
}
```

You can then generate the theme.json file by running:

```bash
npm run generate-theme
```

### Custom Configuration

You can customize the theme's appearance by adding these parameters to your `config.toml` file:

```toml
[params.theme]
  # Main colors
  primaryColor = "#007B79"   # Primary color (default: #007B79)
  secondaryColor = "#113946" # Secondary color (default: #113946)
  
  # Typography
  primaryFont = "Poppins"    # Primary font (options: "Poppins", "Roboto", "Inter")
```

## Homepage Configuration

The homepage is generated from the `content/_index.md` file. You can configure different sections to be displayed on the homepage.

### Front Matter Structure

```yaml
---
title: "Your Site Title"
description: "Description for search engines"
keywords:
  - keyword 1
  - keyword 2
layout: home
schema:
  type: "WebPage" # or "Organization", "Service", etc.
sections:
  - hero
  - services
  - content
  - pricing
  - testimonials
  - team
  - contact
---
```

You can customize each section with different options. See the complete documentation for more details on configuring each section.

## License

This theme is distributed under the GPL-3.0 license with an attribution clause. See the [LICENSE](LICENSE) file for more information.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request on GitHub.

## Acknowledgements

Special thanks to the Hugo community for their support and contributions.