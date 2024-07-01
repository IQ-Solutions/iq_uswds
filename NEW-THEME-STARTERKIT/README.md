# IQ-USWDS Starterkit installation
This file contains the installation procedure for implementation of a stand alone IQ-USWDS theme. For configuration and use, please refer to the README.md file located in IQ_USWDS contributed theme https://github.com/IQ-Solutions/iq_uswds/blob/main/README.md. 

## Expected Local Configuration
There are the minimum requirements to successfully use IQ USWDS locally:
* WSL with Ubuntu 20.04 or equivalent.
* NVM
* Github Auth Tokens generated and available to your local terminal profile. If you do not have one set up already, follow the instructions below.

##### Github Auth Token
* Go to https://github.com/settings/tokens 
* Click generate new token (use the classic token) 
* Set the expiration (we don't currently have a recommendation on what it should be) 
* click repo to give all permissions for repo 
* click generate token 
* **COPY THE TOKEN**. You can only do this once or you will lose it and generate a new one. Make sure to COPY THE TOKEN. 

For the following instructions replace **<auth_token_goes_here>** with your token

##### Add a Git Auth Token to Lando 
While in a WSL terminal (PC) or a terminal (Mac): 
* Type in `cd ~/.lando` 
* Open the config.yml file (use cmd line editor or whatever you want. e.g. `nano config.yml`) 
* Add the following  
    ```
    appEnv: 
        GITHUB_AUTH_TOKEN: <auth_token_goes_here> 
            COMPOSER_AUTH: '{"github-oauth": {"github.com": "<auth_token_goes_here>"}}'  
    ```
* Save and exit the editor

##### Add a Git Auth Token to .bashrc
While in a WSL terminal (PC): 
* Type `cd ~/`
* `explorer.exe .bashrc`
* add the following to theh bottom of your .bashrc file
    ```
    export GITHUB_AUTH_TOKEN=<auth_token_goes_here>
    export COMPOSER_AUTH='{"github-oauth": {"github.com": <auth_token_goes_here> "}}’
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