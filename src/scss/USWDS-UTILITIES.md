# USWDS Utility Cheat Sheet
Updated 12-11-2023
USWDS Version: 3.7.0

## USWDS Utilities
Utilities are simple HTML classes typically scoped to a single CSS property, like `border-style` or `background-color`.Utilities can be used additively to style an object from scratch or to override a style defined in component CSS. Utilities allow designers and developers to build and test new designs and components without abstracting their work into traditional semantic names or altering production CSS.

There are two basic ways you can use these utilities:
-   Add them to your HTML elements as classes
-   Use them as mixins in your Sass

Below are the utility mixins that are available to you from the USWDS. You can find details here: https://designsystem.digital.gov/utilities/ 

### Layout Grid
Mixins can be used in conjunction with grid variables to add grid functionality to semantic component Sass.
Trust me you want to read this: https://designsystem.digital.gov/utilities/layout-grid/#sass-mixins-2


### COLOR
Color tokens: https://designsystem.digital.gov/design-tokens/color/overview/
*Note: Must use tokens designated in USWDS Settings if defined. If not defined you can use regular tokens.*

- text color: 			`@include u-text('color-token')`
- Background color: 	`@include u-bg('color-token')`


### Height and Width
Units are defined here: https://designsystem.digital.gov/design-tokens/spacing-units/

- Height:		`@include u-height(units)`
- Width:		`@include u-width(units)`
- Max Height:	`@include u-maxh(units)`
- Max Width:	`@include u-maxw(units)`
- Min Height:	`@include u-minh(units)`
- Min Width:	`@include u-minw(units)`
- Aspect Ratio: `@include add-aspect('ratio')`
- Circle:		`@include u-circle(units)`
- Square: 		`@include u-saquare(units)`

*Note: Ratio is not a token, just use your own logic*


### Margin and Padding
Units token: https://designsystem.digital.gov/design-tokens/spacing-units/

- margin-modifier-units: `@include u-margin-modifier(units)`
- padding-modifier-units: `@include u-padding-modifier(units)`


### Border
Units token: https://designsystem.digital.gov/design-tokens/spacing-units/
Color token: https://designsystem.digital.gov/design-tokens/color/overview/

- border-units: `@include u-border(units)`
- border-modifier-units: `@include u-border-modifier(units)`
- border-color: `@include u-border('color')`
- border-style: `@include u-border('modifier')`
- radius-radius: `@include u-radius(radius)`
- radius-modifier-radius: `@include u-radius-modifier(radius)`


### Outline
Units token: https://designsystem.digital.gov/design-tokens/spacing-units/
Color token: https://designsystem.digital.gov/design-tokens/color/overview/

- outline-units: `@include u-outline(units)`
- outline-color-color: `@include u-outline-color('color')`


### Font Size and Family
Font Family tokens: https://designsystem.digital.gov/design-tokens/typesetting/font-family/
Font Sizes tokens: https://designsystem.digital.gov/design-tokens/typesetting/font-size/

- Font family and size: 	`@include u-font('family', 'size')`
- Font family:				`@include u-font-family('family')`


### Text Styles
Weight token: https://designsystem.digital.gov/design-tokens/typesetting/font-weight/
Color token: https://designsystem.digital.gov/design-tokens/color/overview/

- text-style: `@include u-text('style')`
- text-weight: `@include u-text('weight')`
- text-tabular: `@include u-text('tabular')`
- text-decoration: `@include u-text('decoration')`
- underline-color: `@include u-underline('color')`
- text-case: u-text('case')
- text-vertical-align: u-text('vertical-align')
- multiple text utilities: `@include u-text(token, token, token...)`


## Paragraph Styles
Family token: https://designsystem.digital.gov/design-tokens/typesetting/font-family/
Line Height token: https://designsystem.digital.gov/design-tokens/typesetting/line-height/
Measure token: https://designsystem.digital.gov/design-tokens/typesetting/measure/
Units token: https://designsystem.digital.gov/design-tokens/spacing-units/

- line-height-family-line-height: `@include u-line-height('family', 'line-height')`
- measure: `@include u-measure('measure')`
- text-alignment: `@include u-text('alignment')`
- text-indent-units: `@include u-text-indent(units)`


### Display
Opacity token: https://designsystem.digital.gov/design-tokens/opacity/
Units token: https://designsystem.digital.gov/design-tokens/spacing-units/

- display-value: `@include u-display('value')`
- opacity: `@include u-opacity(opacity)`
- overflow-modifier-value: `@include u-overflow-modifier('value')`
- position-value: `@include u-position('value')`
- bottom-units: `@include u-bottom(units)`
- left-units: `@include u-left(units)`
- right-units: `@include u-right(units)`
- top-units: `@include u-top(units)`
- pin-value: `@include u-pin-x`


### Flex
Flex values: https://designsystem.digital.gov/design-tokens/flex/
Order tokens: https://designsystem.digital.gov/design-tokens/order/

- flex-flex: `@include u-flex(flex)`
- flex-direction: `@include u-flex(direction)`
- flex-wrap: `@include u-flex(wrap)`
- flex-align: `@include u-flex(align)`
- flex-align-self: `@include u-flex('align-self-value')`
- flex-justify: `@include u-flex('justify-value')`
- order-order: `@include u-order(order)`


### Shadow
Shadow tokens: https://designsystem.digital.gov/design-tokens/shadow/

- shadow: `@include u-shadow('shadow')`


### Float
Float values: if you don't know... do better... `right`, `left`, `none`

- float-value: `@include u-float('value')`


### Clearfix
Clearfix is just a standard mixin that clears your floated element. It's not a token... it's just a mixin.

- clearfix: `@include clearfix`


### List Reset
List reset is just a standard mixin that resets your list. It's not a token... it's just a mixin.

- list-reset: `@include add-list-reset`

