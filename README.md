# USWDS THEME README
Last Updated: 11-05-2024 
Company: [IQ Solutions](https://www.iqsolutions.com/) 

>[!NOTE]
> This document is easier to read in the [GitHub Repo](https://github.com/IQ-Solutions/iq_uswds/blob/main/README.md) as it's a Markdown Document. Go read it there. 

___
## Contents

- [About](#about)
  - [Dependencies](#dependencies)
  - [Decide how you want to approach this tast](#decide-how-you-want-to-approach-this-tast)
  - [Structure](#structure)
  - [SASS](#sass)
- [Local Setup](#local-setup)
  - [Github Auth Token](#github-auth-token)
    - [Aquire Token](#aquire-token)
    - [Add Token to Local](#add-token-to-local)     
  - [Expected Local Configuration](#expected-local-configuration)
  - [Set up your local environment](#set-up-your-local-environment)
  - [Installation of packages](#installation-of-packages)
  - [Important Node scripts](#important-node-scripts)
  - [Updating Node Packages](#updating-node-packages)
  - [Configuration](#configuration)
  - [Fractal Settings](#fractal-settings)
  - [IQ Tooling Settings](#iq-tooling-settings)

---
## About
This package is meant to serve as the base tooling and architecture for IQ's USWDS site building effort.
IQ USWDS will install necessary tooling for compiling custom site code and USWDS code as one file, and for using Fractal to build and preview the site.

### Dependencies
* uswds_base
* components (Optional-- nice to have)

### Decide how you want to approach this tast
Think about the project as a whole. Are you only going to be working on this theme and not on any general request that pop up during this build? Or are you going to be building the new theme WHILE maintaining the current site? Due to the length of time needed to build this new theme, you may want to read the  [README-ENVIORMET-SETUP.md](https://github.com/IQ-Solutions/iq_uswds/blob/main/README-ENVIORMET-SETUP.md) in this repo to see what you will need to do if you are using one enviorment or two separate enviorments.

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
## Local Setup
There are the minimum requirements to successfully use IQ USWDS locally:
* WSL with Ubuntu 20.04 or equivalent.
* NVM
* Github Auth Tokens generated and available to your local terminal profile. If you do not have one set up already, follow the instructions below.

### Github Auth Token
#### Aquire Token
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

*Note: If installing on a Mac you would use the equivalent of the .bashrc file, e.g. .zshrc...*
    
If you have any issues with this configeration, ask senior dev.

## Install IQ USWDS theme
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

You have installed the IQ_USWDS theme and have copied the required USWDS files needed. The next step is dependent on whether on what you are trying to achieve. You can start a completely new USWDS based theme **OR** you can update an existing theme.
 
## Create New Theme
 If you are wanting to create a new theme, follow the instructions below. This procedure will create a new standalone theme that will be independent of the IQ-USWDS. This does mean that you will be responsible for updates in your theme. If you are wanting to update an existing theme skip this section and go to Update Existing Theme.

##### Create theme directory
* In your project, navigate to your **theme/custom/iq_uswds** and copy the **NEW-SITE-STARTERKIT** directory
* Go back to **theme/custom** and paste the **NEW-SITE-STARTERKIT** 
* Rename **NEW-SITE-STARTERKIT** with your new theme name, keep the name lower cased with no spaces. E.G. **nibib** or **nia**. You will need to use this name several times again throughout this procedure

##### Update theme files
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
    * Edit lines 4 & 11 to reflect that of your project. (More information of this config file is located below under IQ Tooling Settings)
* **src/scss/THEMENAME** Optional, if needing to add custom styles
    * Rename directory to project's specifications
* **src/scss/_uswds-theme-custom-styles.scss** Optional, if needing to add custom styles
    * Uncomment line 26 and edit to the name of the directory renamed in the step above.

##### Install Node Packages
Navigate to your theme folder and run:
    1. `nvm use` - This will install and switch to the necessary version of Node and NPM.
    2. `npm i` - This will install the necessary node modules and create a package.lock file 
    
The theme has been successfully created and is ready for development. Skip Update Existing Theme and read more about the configuration under Configuration. 

## Update Existing Theme
 
1. Copy the following files and directories into your existing sub theme folder
    *  __subtheme.fractal.config.js__ - Rename this __*fractal.config.js* in your subtheme__.
      * You will need to modify the path pointing to the IQ USWDS base theme to match your directory structure.
    *  __subtheme.gulpfile.js__ - Rename this __*gulpfile.js* in your subtheme__
      * You will need to modify the path pointing to the IQ USWDS base theme to match your directory structure.
    * the __src__ directory and all files under it (*NOTE: You may not want to copy all of the components. Ideally you should point your components to the IQ USWDS component and only override it if necessary.*)
    * the __.nvmrc__, __.npmrc__, __package.json__ and __package-lock.json__ files
    * __iq.tooling.yml__ - this is your configuration file.
2. Navigate to your theme folder and run:
   1. `nvm use` - This will install and switch to the necessary version of Node and NPM.
   2. `npm ci` - This will install the necessary node modules

You should now be ready to start working with USWDS and Fractal. Before you do anything in your sub theme let's do some configuration.

#### Configuration
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
This section contains all the settings for Fractal that can be changed.

__static_path__ - the fractal public path. This will generally be `fractal` or `public`. Do not add any slashes.
__themePath__ - the path to the current theme. This will generally be `./` or the current directory.
__project_title__ - the theme title
__assets_path__ - the theme assets folder, this is where the build assets will be placed. *Do not make this a folder where you don't want anything to be deleted.*
__build_path__ - the folder where a static version of Fractal will be placed. This is used for clients/PM.
__basePath__ - this is ALSO the theme path but is used for a different purpose. It should generally be the current directory or `./`.
__uswds_path__ - this is the path to the uswds base theme. Normally this would be `../../contrib/uswds_base/templates`. Configure this appropriately.
__template_path__ - the current theme template path
__theme_name__ - the themes machine name

##### IQ Tooling Settings
This section constains setting specific to IQ USWDS tooling.

__img_dest__ - Fractal my sometimes need the images you are using available to it, as such it is good practice to store the images in the theme `src` directory, then have them moved as build assets. This folder points to the destination folder.

__img_source__ - Fractal my sometimes need the images you are using available to it, as such it is good practice to store the images in the theme `src` directory, then have them moved as build assets. This folder points to the source folder.

__iq_uswds_path__ - The path to the IQ USWDS theme.
##### USWDS Complier settings
This section are specific to the USWDS complier.

__version__ - Currently the complier can be used with USWDS 2.x and 3.x. The default is version 3.

__dist_css_path__ - The USWDS complier css build path.

__dist_theme__ - The USWDS complier scss source path. This is where styles.scss should be located.

Using the information above, configure your subtheme with the appropriate paths relative to your theme.

##### Acquia Hosted Sites
Due to the file structure associated with Acquia you are going to need to edit the following in your theme directory to get Fractal to work properly.
1. Edit line 15 iq.tooling.yml
	- `../../../../themes/custom/iq_uswds` to `../../../../docroot/themes/custom/iq_uswds`

#### Usage
Now that you've added the appropriate configuration for your subtheme. You can now get started.

First, you'll want to make sure your theme has the USWDS fonts and JS available to your theme Fractal.
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

##### Theme Building notes
- Non-USWDS Images relating to your theme should be placed in the `src/images` folder. These images will need to be copied over to the assets directory in order for them to render properly in your theme. To copy your images to the `assets` directory you will need to run `npm run copy:images`.
- If you need to leave your USWDS development git branch to work on something else, you can run `npm run assets:rebase` when you re-enter the USWDS development git branch. Doing so will compile the USWDS assets, copy theme images and compile sass.
- 

Updated: 07/1/2024
