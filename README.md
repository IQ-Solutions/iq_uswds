# IQ USWDS
This package is meant to serve as the base tooling and architecture for IQ's USWDS
site building effort.

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
4. Copy the following files and directories into your existing sub theme folder
    *  __subtheme.fractal.config.js__ - Rename this __*fractal.config.js* in your subtheme__.
    *  __subtheme.gulpfile.js__ - Rename this __*gulpfile.js* in your subtheme__
    * the __src__ directory and all files under it
    * the __.nvmrc__, __.npmrc__, __package.json__ and __package-lock.json__ files
    * __iq.tooling.yml__ - this is your configuration file.
5. Follow the instructions in step 3 above in your theme folder.

You should now be ready to start working with USWDS and Fractal.

### Configuration
*** CONFIGURATION NOTES COMING SOON ***