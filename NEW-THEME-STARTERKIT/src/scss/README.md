# IQ-USWDS SASS
This directory is where all the SASS magic happens. It is comprised of 3 scss files that serve different purposes. Note the purposes of the following files.

- `_uswds-theme.scss`
    All USWDS settings are stored here. All you need to do is uncomment the setting which you choose to change and add your value. Further reading on USWDS Settings can be found here: [USWDS Settings](https://designsystem.digital.gov/documentation/settings/)

- `THEMENAME`
    Included in this direcory is a folder called THEMENAME. You can use this file for any custom SASS needed for your project. To include it you must add it to _uswds-theme-custom-styles.scss

- `_uswds-theme-custom-styles.scss`
    This serves as an additional project CSS for customizing or adding to what USWDS provides. If custom syles needed, rename the THEMENAME directory to your theme name and uncomment and edit line 26 in this file.

- `styles.scss`
    This is the Sass entry point. This is the primary Sass file that you’ll compile. It collects theme settings, USWDS source files, and custom CSS. 

[Further reeding](https://designsystem.digital.gov/documentation/developers/#sass-and-theme-settings-2)

*Last Updated: 7-1-24*