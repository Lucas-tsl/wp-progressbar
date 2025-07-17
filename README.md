# LSG Progressive Bar

## Description
LSG Progressive Bar is a WordPress plugin that adds a customizable progress bar to the mini cart. It visually indicates how close the user is to qualifying for free shipping.

## Features
- Displays a progress bar in the mini cart.
- Dynamically updates based on the cart subtotal.
- Customizable block for free shipping progress bar.
- Includes separate CSS and JavaScript files for better organization.

## Installation
1. Download the plugin files.
2. Place the `progressbar` folder in your WordPress `wp-content/plugins` directory.
3. Activate the plugin from the WordPress admin dashboard.

## Usage
1. Add the block `custom/freeshiping` to your page or post.
2. The progress bar will automatically update based on the cart subtotal.

## Development
### Enqueue Scripts and Styles
- JavaScript files are located in `assets/js/`.
- CSS files are located in `assets/css/`.

### JavaScript Files
- `progress-bar.js`: Handles DOM manipulation and updates the progress bar dynamically.
- `block-registration.js`: Registers the custom block for the progress bar.

### CSS File
- `style.css`: Contains styles for the progress bar and its container.

## Support
If you encounter any issues, feel free to open an issue on the repository or contact the author.

## Author
Lucas Troteseil



GitHub Copilot
README.md
Create a README.md file to document the plugin.



## License
This plugin is licensed under the [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html).
