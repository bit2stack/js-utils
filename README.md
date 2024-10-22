# *BitSnackbar*

## Introduction
The **BitSnackbar** is a message component developed using pure JavaScript and CSS, designed to provide more suitable notification functionality for users by adding various options based on the traditional snackbar format.

<!--[![snackbar](http://www.demo.com/img/snackbar_logo.png)](http://www.demo.com/snackbar)-->

## Demo
For more information about the **BitSnackbar**, please refer to the demo site below. You can quickly see the functionality of the snackbar through the control panel page without complex explanations.
<!--- [www.demo.com](www.demo.com)-->
- [www.bit-stack.com/control-panel](http://www.bit-stack.com/)

## Install
1. Download the project.
2. Copy the bit-snackbar.css and bit-snackbar.js files from the dist folder to your desired location.
3. Place the CSS and JS files appropriately in the head and body sections for use.
```html
<link rel="stylesheet" type="text/css" href="dist/bit-snackbar.min.css" />
<script type="text/javascript" src="dist/bit-snackbar.min.js"></script>
```

## Quick Start
The **BitSnackbar** is divided into three areas: header, message, and action, allowing users to configure the snackbar's functionality through options for each area. Before taking a closer look at the specific options for each area, you can easily and quickly implement notification functionality in typical situations using the predefined features of the **BitSnackbar**, as shown in the example below.

```js
BitSnackbar.tiny({message:'I got a message!', position:'top-center'});
BitSnackbar.info({message:'I got a message!', position:'top-center'});
BitSnackbar.success({message:'I got a message!', position:'top-center'});
BitSnackbar.warning({message:'I got a message!', position:'top-center'});
BitSnackbar.danger({message:'I got a message!', position:'top-center'});
```
In this case, the message must be provided, and if the position is not specified, it will default to `top-center`. If no message is entered, the snackbar will display the default message, `No Message`.


## Options

### Syntex
Options are set using the format `{option-name:option-value}` by connecting the option name and value with a `:` inside the `{}`. You can use `,` to apply multiple options in succession. The configured option values can be passed as arguments to the `BitSnackbar.show()` function to apply the options. Additionally, the basic functions introduced in the previous paragraph, such as `tiny()` and `info()`, can also apply the desired options.
```js
BitSnackbar.show({showHeader:true, headerColor:'info', headerIcon:'info'})
```

### Global Options
Global options are settings that determine the basic behavior of the **BitSnackbar**. In the global options, you can configure the background color and position of the snackbar, as well as hide the header and action areas.

|Opton name|Type |Default|Description|
|----------|:---:|:-----:|-----------|
|bgColor|string|#323232|Snackbar background color. Color options such as hex and rgb|
|position|string|top-center| Combinations of `top` or `bottom` with `left`, `right`, or `center` values to set the snackbar's position<br> eg. `top-center`, `bottom-right`|
|opacity|number|1|Snackbar opacity. Decimal values between 0 and 1|
|margin|string|10px|Snackbar margin. px, Size elements like px, em, rem|
|width|string|auto|Snackbar width|
|duration|number|35000|Snackbar presentation time on the screen. 10000 = 1s|
|showHeader|boolean|false|Visibility of the header area|
|showAction|boolean|true|Visibility of the action area|
|autoHide|boolean|true|Whether to automatically dismiss the snackbar after the duration time |
|customClass|string or css class|null|Additional CSS styles to apply to the snackbar container|


### Header Options
The header area conveys the message through color and icons. By default, the snackbar does not include a header. To include a header, you must specify the `showHeader: true` option. The options used in the header area are as follows.

|Opton name|Type |Default|Description|
|----------|:---:|:-----:|-----------|
|headerBgColor|string|null|Background color of the header area <br> Four predefined colors: info, success, warn, and danger<br>Additionally, colors such as hex and rgb can be applied.|
|headerLabel|string|null|Text to be displayed in the header|
|headerLabelColor|string|#FFFFFF|Header label color <br> Four predefined colors: info, success, warn, and danger<br>Additionally, colors such as hex and rgb can be applied.|
|headerLabelBgColor|string|null|Background color of the header label <br> Four predefined colors: info, success, warn, and danger<br>Additionally, colors such as hex and rgb can be applied.|
|headerIcon|string|null|Built-in icons displayed in the header area. <br> There are four icons: info, success, warn, and danger. By adding _colored (e.g., info_colored), you can insert icons in predefined colors. <br>The default icons without color are white.|

### Message Options
The message area displays the message in text form. Depending on the situation, a title can be included. To include a title, you need to input the `title` option. By default, the title is not included, and its initial value is `null`.

|Opton name|Type |Default|Description|
|----------|:---:|:-----:|-----------|
|title|string|null|Title text. The default setting is not to display. |
|titleFontColor|string|#FFFFFF|Colors such as hex and rgb can be applied.|
|titleFontSize|string|17px| Size elements like px, em, rem|
|titleAlign|string|left|Title horizontal alignment. There are three options: left, center, and right.|
|message|string|Default Text|Main snackbar message.|
|messageFontColor|string|#FFFFFF|Colors such as hex and rgb can be applied.|
|messageFontSize|string|14px| Size elements like px, em, rem|
|messageAlign|string|left|Message horizontal alignment. There are three options: left, center, and right.|


### Action Options
The action area supports user interaction through buttons or text, allowing users to close the snackbar or handle specific events designated by them. In a typical snackbar, the number of actions is usually limited to two or fewer; however, the **BitSnackbar** does not impose any limits on the number of actions.


If there is only one action, as shown in the example below, specify the icon or text to be displayed, along with the function to execute when the user clicks it.
```js
{label:'ACTION', function:()=>alert('Action Function')}
{icon: 'close', function:()=>alert('ACTION Function')}
```
If you want to use two or more actions, place all the actions inside `[]` and connect each action using a `,`.

```js
[
    {label:'ACTION', function:()=>alert('Action Function')},
    {icon: 'close', function:()=>alert('ACTION Function')}
]
```
The items that will be configured to execute the action are as follows. When using a label, you can additionally specify the color and font size of the label. The color and font size options do not apply to icons.

|Opton name|Type |Default|Description|
|----------|:---:|:-----:|-----------|
|label|string|null|Action label |
|color|string|null|Action label font color. Colors such as hex and rgb can be applied.|
|fontSize|string|null|Action label font size. Size elements like px, em, rem|
|icon|string|close|Two built-in icons are available: `close` and `arrow_down`.|
|function|function|Snackbar.close()|The actual function to be executed when the label or icon is clicked.|


## Event
You can use the `onClose` event to define an event that will execute after the **BitSnackbar** has closed (disappeared from the screen).  
Below is an example that shows a simple alert box after the snackbar closes.
```js
Snackbar.show({message:'onClose option demo', onClose:()=>{alert('AFTER CLOSE ACTION');}})
```

## Inspired by
- [www.polonel.com/snackbar/](https://www.polonel.com/snackbar/)
- [www.michaelmickelson.com/js-snackbar/](https://www.michaelmickelson.com/js-snackbar/)