# IQ USWDS
This package is meant to serve as the base tooling and architecture for IQ's USWDS site building effort.

IQ USWDS will install necessary tooling for compiling custom site code and USWDS code as one file, and for using Fractal to build and preview the site.

## Expected Local Configuration
There are the minimum requirements to successfully use IQ USWDS locally:
* WSL with Ubuntu 20.04 or equivalent.
* NVM
* Github Auth Tokens generated and available to your local terminal profile.

If you are missing any of these configurations please speak with your project tech lead or a senior dev.

## How to use
### Installation
1. Add the package repo to the repositories section of your composer.json as seen here:
    ```json
        {
            "type": "git",
            "url": "git@github.com:IQ-Solutions/iq_uswds.git"
        }
    ```
2. Install IQ USWDS by using `lando composer require iq/iq_uswds`
3. Navigate to the IQ USWDS Folder and run
   1. `nvm use` - This will install and switch to the necessary version of Node and NPM.
   2. `npm ci` - This will install the necessary node modules
   3. `npm run copy:uswds` - This will copy the USWDS font, js, and icons to the base theme asset folder
4. Copy the following files and directories into your existing sub theme folder
    *  __subtheme.fractal.config.js__ - Rename this __*fractal.config.js* in your subtheme__.
      * You will need to modified the path pointing to the IQ USWDS base theme to match your directory structure.
    *  __subtheme.gulpfile.js__ - Rename this __*gulpfile.js* in your subtheme__
      * You will need to modified the path pointing to the IQ USWDS base theme to match your directory structure.
    * the __src__ directory and all files under it (*NOTE: You may not want to copy all of the components. Ideally you should point your components to the IQ USWDS component and only override it if necessary.*)
    * the __.nvmrc__, __.npmrc__, __package.json__ and __package-lock.json__ files
    * __iq.tooling.yml__ - this is your configuration file.
5. Navigate to your theme folder and run:
   1. `nvm use` - This will install and switch to the necessary version of Node and NPM.
   2. `npm ci` - This will install the necessary node modules

You should now be ready to start working with USWDS and Fractal. Before you do anything in your sub theme let's do some configuration.

### Configuration
IQ USWDS comes with a configuration file to simplify so parts of the process. The file is named `iq.tooling.yml`. Here is an example of the contents of the file:
```yaml
fractal:
  themePath: ./
  project_title: NIA
  component_path: ./src/components
  assets_path: ./assets
  build_path: ./build
  basePath: ./
  uswds_path: ../../contrib/uswds_base/templates
  template_path: templates
  theme_name: nia
iqTooling:
  img_dest: ./assets/img
  img_source: ./src/images/**
uswds:
  version: 3
  dist_css_path: ./assets/css
  dist_theme: ./src/scss
```

#### Settings
##### Fractal Settings
This section contains all of the settings for Fractal that can be changed.
__themePath__ - the path to the current theme. This will generall be `./` or the current directory.
__project_title__ - the theme title
__assets_path__ - the theme assets folder, this is were the build assets will be placed. *Do not make this a folder where you don't want anything to be deleted.*
__build_path__ - the folder where the a static version of Fractal will be placed. This is used for clients/PM.
__basePath__ - this is ALSO the theme path but is used for a different purpose. It should generally be the current directory or `./`.
__uswds_path__ - this is the path to the uswds base theme. Normally this would be `../../contrib/uswds_base/templates`. Configure this appropriately.
__template_path__ - the current theme template path
__theme_name__ - the themes machine name
##### IQ Tooling Settings
This section constains setting specific to IQ USWDS tooling.
__img_dest__ - Fractal my sometimes need the images you are using available to it, as such it is good practice to store the images in the theme `src` directory, then have them moved as build assets. This folder points to the destination folder.
__img_source__ - Fractal my sometimes need the images you are using available to it, as such it is good practice to store the images in the theme `src` directory, then have them moved as build assets. This folder points to the source folder.
##### USWDS Complier settings
This section are specific to the USWDS complier.
__version__ - Currently the complier can be used with USWDS 2.x and 3.x. The default is version 3.
__dist_css_path__ - The USWDS complier css build path
__dist_theme__ - The USWDS complier scss source path. This is where styles.scss should be located.

Using the information above, configure your subtheme with the appropriate paths relative to your theme.
#### Usage
Now that you've added the appropriate configuration for your subtheme. You can now get started.

First you'll want to make sure your theme has the USWDS fonts and JS available to your theme Fractal.
If you copied the package.json you can run `npm run copy:uswds`. This will copy the USWDS files.

With those copied you get started setting up your components in the following structure in your theme:
```
theme_root:
  src
    components
    images
    js
    scss
  templates
```

If you follow the installation instructions earlier, you will likely already have that structure.

From here you can run `npm run start:fractal` and begin theming.