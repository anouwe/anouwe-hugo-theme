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

2. Add the theme as a module dependency:

  ```bash
  hugo mod get github.com/anouwe/anouwe-hugo-theme
  ```

3. Add the theme to your site's configuration file:

  ```toml
  theme = "anouwe-hugo-theme"
  ```

### As a Git Submodule

1. Add the theme as a submodule:

  ```bash
  git submodule add https://github.com/anouwe/anouwe-hugo-theme.git themes/anouwe
  ```

2. Add the theme to your site's configuration file:

  ```toml
  theme = "anouwe"
  ```

## Usage

To use the theme, simply run Hugo as usual:

```bash
hugo server
```

Visit `http://localhost:1313` in your browser to see your site with the `anouwe-hugo-theme`.

## License

This theme is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for more information.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## Acknowledgements

Special thanks to the Hugo community for their support and contributions.
