# USWDS THEME
Last Updated: 11-05-2024 
Company: [IQ Solutions](https://www.iqsolutions.com/) 

>[!NOTE]
> This document is easier to read in the [GitHub Repo](https://github.com/IQ-Solutions/iq_uswds/blob/main/README.md) as it's a Markdown Document. Go read it there. 

___
## Contents

- [USWDS THEME](#uswds-theme)
  - [Contents](#contents)
  - [About](#about)
    - [Dependencies](#dependencies)
    - [Structure](#structure)
    - [SASS](#sass)
  - [Local Requirement Setup](#local-requirement-setup)
    - [Aquire Github Auth Token](#aquire-github-auth-token)
      - [Add Token to Local](#add-token-to-local)
  - [Installation](#installation)
    - [Create New Theme](#create-new-theme)
      - [Create theme directory](#create-theme-directory)
      - [Update theme files](#update-theme-files)
      - [Install Node Packages](#install-node-packages)
    - [Update Existing Theme](#update-existing-theme)
      - [Copy Files](#copy-files)
      - [Install Packages](#install-packages)
  - [Configuration](#configuration)
    - [Fractal Settings](#fractal-settings)
    - [IQ Tooling Settings](#iq-tooling-settings)
    - [USWDS Complier settings](#uswds-complier-settings)
  - [Usage](#usage)
    - [Other Node Scripts](#other-node-scripts)

---
## About
This package is meant to serve as the base tooling and architecture for IQ's USWDS site building effort.
IQ USWDS will install necessary tooling for compiling custom site code and USWDS code as one file, and for using Fractal to build and preview the site.

### Dependencies
* uswds_base
* components (Optional-- nice to have)

### Structure
Most of your work will be done in the **_src_** directory. In this directory we build/edit components, edit our SASS add theme images and create or edit js. The directory contains the following directories:
- **_src/components_**: as defined by the USWDS and edited to your themes style guide
- **_src/images_**: all theme images stored here
- **_src/js_**: all theme js resides here
- **_src/scss_**: all SASS resides here
 
You will notice that when you are working in these directories and Fractal is running, that the Fractal window will reload. This is because when Fractal is running, it is watching these directories for file edits. 

### SASS 
USWDS SASS works differently than what you might be accustomed to. The files structure of the SASS directory is as follows:
- **_src/scss/RENAME-ME**: houses all custom scss that is specific for the theme. Rename according to your requirments 
- **_src/scss/_uswds-theme-custom-styles.scss_**: In USWDS terms this is referred as a **SASS Entry Point** and is a location that you can reference any custom SCSS located in the `NIBIB` direcotry described above
- **_src/scss/_uswds-theme.scss_**: Here we can add any USWDS related settings as defined here: https://designsystem.digital.gov/documentation/settings/
- **_src/scss/styles.scss_**: This is the file that gets copied after SASS is compiled. In normal cercimstances you shouldn't have to touch this file. 
___

## Local Requirement Setup
There are the minimum requirements to successfully use IQ USWDS locally:
* WSL with Ubuntu 20.04 or equivalent.
* NVM
* Github Auth Tokens generated and available to your local terminal profile. If you do not have one set up already, follow the instructions below.

### Aquire Github Auth Token 
First start off by getting a Github Authentication Token. If you have one already, and stored the key, skip this step.
* Go to https://github.com/settings/tokens 
* Click generate new token (use the classic token) 
* Set the expiration (we don't currently have a recommendation on what it should be) 
* click repo to give all permissions for repo 
* click generate token 
* **COPY THE TOKEN**. You can only do this once or you will lose it and generate a new one. Make sure to COPY THE TOKEN. 

For the following instructions replace <!--auth_token_goes_here--> with your token

#### Add Token to Local 
Github Tokens need to be added to your lando/config.yml, and .bashrc files:
While in a WSL terminal (PC) or a terminal (Mac): 
In your **~/lando/config.yml**
* Type in `cd ~/.lando` 
* Open the config.yml file (use cmd line editor or whatever you want. e.g. `nano config.yml`) 
* Add the following  
    ```yml
    appEnv:
        GITHUB_AUTH_TOKEN: <!--token value here -->
        COMPOSER_AUTH: '{"github-oauth":{"github.com":"<!--token value here -->"}} 
    ```  
* Save and exit the editor

In your **~/.bashrc**
While in a WSL terminal (PC): 
* Type `cd ~/`
* `explorer.exe .bashrc`
* add the following to theh bottom of your .bashrc file
    ```bash
    export GITHUB_AUTH_TOKEN=<!--token value here -->`
    export COMPOSER_AUTH='{"github-oauth":{"github.com":"<!--token value here -->"}}' 
    ```
* save the file and close
* update the .bashrc file by typing 'source ~/.bashrc'

> [!TIP]
> If installing on a Mac you would use the equivalent of the .bashrc file, e.g. .zshrc...*
    
If you have any issues with this configeration, ask senior dev.

___

## Installation
Begin installation by installing the IQ USWDS via Composer.
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

You have installed the IQ_USWDS theme and have copied the required USWDS files needed. 

> [!IMPORTANT] 
> The next step is dependent on what you are trying to achieve. You can start a [Create New USWDS based theme](#create-new-theme) **OR** you can [Update an Existing Theme](#update-existing-theme). 
 
### Create New Theme
 This procedure will create a subtheme based off the IQ USWDS theme. Recomended for new website builds or complete overhauls. If you are wanting to update an existing theme skip this section and go to Update Existing Theme.

#### Create theme directory
* In your project, navigate to your **theme/custom/iq_uswds** and copy the **NEW-SITE-STARTERKIT** directory
* Go back to **theme/custom** and paste the **NEW-SITE-STARTERKIT** 
* Rename **NEW-SITE-STARTERKIT** with your new theme name, keep the name lower cased with no spaces. E.G. **nibib** or **nia**. You will need to use this name several times again throughout this procedure

#### Update theme files
Navigate to your new theme, all the files that contain **THEMENAME** need to be renamed with the name of your theme. E.G. **THEMENAME.info.yml** becomes **nia.info.yml**. The following files need to be renamed and edited. 
* **THEMENAME.info.yml** 
    * Rename file (e.g.nia.info.yml)
    * Edit lines 4, 5, 31 and 32 to your project’s specific information
* **THEMENAME.libraries.yml** 
    * Rename file (e.g.nia.libraries.yml)
* **THEMENAME.theme**
    * Rename file (e.g.nia.theme)
    * Edit theme preprocess hooks with your theme name
* **iq.tooling.yml**
    * Edit lines 4 & 11 to reflect that of your project. (More information of this config file is located below under [IQ Tooling Settings](#iq-tooling-settings))
* **src/scss/THEMENAME** Optional, if needing to add custom styles
    * Rename directory to project's specifications
* **src/scss/_uswds-theme-custom-styles.scss** Optional, if needing to add custom styles
    * Uncomment line 26 and edit to the name of the directory renamed in the step above.

#### Install Node Packages
Navigate to your theme folder and run:
  1. `nvm use` - This will install and switch to the necessary version of Node and NPM.
  2. `npm i` - This will install the necessary node modules and create a package.lock file 
    
> [!NOTE] 
> The theme has been successfully created and is ready for development. Skip Update Existing Theme and read more about the configuration under Configuration. 

### Update Existing Theme
If wanting to bring into an exsisting theme
#### Copy Files
Copy the following files and directories into your existing sub theme folder
  *  __subtheme.fractal.config.js__ - Rename this __*fractal.config.js* in your subtheme__.
  * You will need to modify the path pointing to the IQ USWDS base theme to match your directory structure.
  *  __subtheme.gulpfile.js__ - Rename this __*gulpfile.js* in your subtheme__
  * You will need to modify the path pointing to the IQ USWDS base theme to match your directory structure.
  * the __src__ directory and all files under it (*NOTE: You may not want to copy all of the components. Ideally you should point your components to the IQ USWDS component and only override it if necessary.*)
  * the __.nvmrc__, __.npmrc__, __package.json__ and __package-lock.json__ files
  * __iq.tooling.yml__ - this is your configuration file.
#### Install Packages
Navigate to your theme folder and run:
  1. `nvm use` - This will install and switch to the necessary version of Node and NPM.
  2. `npm ci` - This will install packages from the package.lock file 

> [!NOTE] 
> You should now be ready to start working with USWDS and Fractal. Before you do anything in your sub theme let's do some configuration.

___

## Configuration
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

> [!NOTE]
> The file sets values broken up into three sections. Fractal settings, IQ Tooling Settings and USWDS Compiler settings. 

### Fractal Settings
This table contains all the settings for Fractal that can be changed.
| Setting | Definition |
| ------- | ---------- |
| static_path |The fractal public path. This will generally be `fractal` or `public`. Do not add any slashes.
|themePath| The path to the current theme. This will generally be `./` or the current directory.|
|project_title| The theme title|
|assets_path|The theme assets folder, this is where the build assets will be placed. *Do not make this a folder where you don't want anything to be deleted.*|
|build_path| The folder where a static version of Fractal will be placed. This is used for clients/PM.|
|basePath| This is ALSO the theme path but is used for a different purpose. It should generally be the current directory or `./`.|
|uswds_path | This is the path to the uswds base theme. Normally this would be `../../contrib/uswds_base/templates`. Configure this appropriately.|
|template_path| The current theme template path|
|theme_name| The themes machine name|

### IQ Tooling Settings
This section constains setting specific to IQ USWDS tooling.
| Setting | Definition |
| ------- | ---------- |
|img_dest|Fractal my sometimes need the images you are using available to it, as such it is good practice to store the images in the theme `src` directory, then have them moved as build assets. This folder points to the destination folder.|
|img_source| Fractal my sometimes need the images you are using available to it, as such it is good practice to store the images in the theme `src` directory, then have them moved as build assets. This folder points to the source folder.|
|iq_uswds_path|The path to the IQ USWDS theme.|

### USWDS Complier settings
This section are specific to the USWDS complier.
| Setting | Definition |
| ------- | ---------- |
|version | Currently the complier can be used with USWDS 2.x and 3.x. The default is version 3.|
|dist_css_path| The USWDS complier css build path.|
|dist_theme| The USWDS complier scss source path. This is where styles.scss should be located.|

Using the information above, configure your subtheme with the appropriate paths relative to your theme.

> [!IMPORTANT] Acquia Hosted Sites
> Due to the file structure associated with Acquia you are going to need to edit the following in your theme directory to get Fractal to work properly.
> 1. Edit line 15 iq.tooling.yml
	- `../../../../themes/custom/iq_uswds` to `../../../../docroot/themes/custom/iq_uswds`

## Usage
Now that you've added the appropriate configuration for your subtheme. You can now get started.

First, you'll want to make sure your theme has the USWDS fonts and JS available to your theme Fractal.
If you copied the package.json you can run `npm run copy:uswds`. This will copy the USWDS files.

With those copied you get started setting up your components in the following structure in your theme:

```
Theme Root
├── src
│   ├── components
│   ├── images
│   ├── js
│   ├── scss
├── templates
```

If you follow the installation instructions earlier, you will likely already have that structure.

From here you can run `npm run start:fractal` and begin theming.

### Other Node Scripts
Use by running `npm run <!--script name goes here-->`:
* `start:fracal`: this starts Fractal locally, and will host the instance on localhost:
* `build:fratal`: Exports all components built in Fractal so that it can be viewed without running Fratal. The url for this is configured in the iq.tooling.yml file.
* `copy:uswds`: copies all USWDS node package assets from the uswds into the assets/* directory
* `copy:images`: Copies all theme images located in src/images to the assets/* directory
* `watch`: This starts a SASS watch which looks for any changes in the src/scss directory and compiles sass as files are changed. This will be the **most used script** during local development. 
* `assets:rebase`: This is a combo script that copies USWDS assets, copies theme images and compiles sass
* `optimize-images`: This has been added to ensure proper image copying and optimization of the images
* `theme-package-build`: This is a combo script uses for deployments. It copies USWDS assets, copies and optimizes theme images and compiles sass. 


> [!TIP]
> When developing locally all you may need to do is compile sass. In this case the best choice will be `npm run watch`


Live long and prosper. :metal:




