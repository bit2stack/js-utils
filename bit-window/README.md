# *Bit Window - draggable javascript window*

## Introduction
BitWindow is a component developed using pure JavaScript and CSS to create draggable pop-up windows in both web and mobile environments. It supports various configuration options, enabling developers to easily and quickly create JavaScript windows.

## Demo
For more information about **BitWindow**, please refer to the demo site below. You can easily explore the window's features without complex explanations through the control panel page.
- [www.bit-stack.com](http://www.bit-stack.com/)

## Install
1. Download the project.
2. Copy the `bit-window.min.css` and `bit-window.min.js` files from the `dist` folder to your desired location.
3. Place the CSS and JS files in the appropriate sections of the `<head>` and `<body>` of your HTML.
```html
<link rel="stylesheet" type="text/css" href="dist/snackbar.min.css" />
<script type="text/javascript" src="dist/snackbar.min.js"></script>
```
4. Implement the internal functionality of the window and assign the desired `id` to the respective area.
5. To hide the window when the page loads, add the `bw-window` class to the element.
```html
<div id="winContents" class="bw-window">
    ...
</div>
```

## Quick Start
**BitWindow** automatically adds the window's header section through option settings. Using global options and header options, users can configure the window's functionality as desired.
Before diving into the specific options for each section, you can quickly and easily implement a pop-up window in typical scenarios using the predefined features of **BitWindow**, as shown in the example below.
```js
BitWindow.show({target:'winContents'});
```
By using the `BitWindow.show` feature, a window is created with an automatically added header that includes a `notes` icon and a `close` icon. When the `close` icon is clicked or when the user clicks outside the window, the window will automatically disappear.


## Options

### Syntex
Options are set by connecting the option name and option value with a `:` inside `{}` (e.g., `{option-name: option-value}`). Multiple options can be used consecutively by separating them with a `,`. The configured options can then be applied by passing them as arguments to the `BitWindow.show()` function.  
The `target` option is required and must be specified.
```js
BitWindow.show({target:'winContents', isModal:false, headerLabel:'Information'})
```
### Global Options
The global options determine the basic behavior of **BitWindow**. With the global options, you can set the window's position, enable or disable dragging, and hide the header section.

|Opton name|Type |Default|Description|
|----------|:---:|:-----:|-----------|
|target|string|null|The ID of the window element to be displayed on the screen.|
|position|string|center| `center` or `around`. When set to `around`, the window will be positioned at the top-left of the clicked location. However, if the window extends beyond the left edge of the screen, it will automatically be positioned at the top-right instead.|
|clickEvent|event|null|This is a required value when the position is set to `around`. It refers to the user's click event.|
|isModal|boolean|true|Whether the window is modal.|
|isDrag|boolean|true|Whether the window is draggable. If set to `false`, the window cannot be dragged.|
|showHeader|boolean|true|Whether to display the header. If set to `false`, only the specified element will be shown as the window, without the header.|
|cornerRadius|string|5px|The corner radius value of the window.|

### Header Options
The header area is located at the top of the window and displays the window's title as text or an icon. It also supports interaction with the user through buttons to close the window or handle specific events defined by the user.  
In **BitWindow**, the header is created automatically and is included by default. If you don't want to include the header, you can specify the `showHeader: false` option.  
The options used in the header area are as follows:

|Opton name|Type |Default|Description|
|----------|:---:|:-----:|-----------|
|headerColor|string|#f1f3f4|The background color of the header area. You can apply colors in formats such as hex, rgb, etc.|
|headerIcon|string|notes|The built-in icon displayed on the left side of the header. <br> There are 10 built-in icons: arrow_down, close, danger, info, menu, notes, question, setting, success, and warning. For the four icons — info, success, warn, and danger — you can append _colored (e.g., `info_colored`) to insert predefined colored versions of the icons.|
|headerLabel|string|null|The text displayed on the left side of the header.|
|headerLabelColor|string|#5f6368|The color of the header label. You can apply colors in formats such as hex, rgb, etc.|
|actions|object|null|The icon displayed on the right side of the header and the action to be executed when the icon is clicked.<br> Please refer to the "Header Action" section at the bottom.|

## Header Action
The action icon is located on the right side of the header and responds to `BitWindow.close()` or a user-defined function. **BitWindow** does not limit the number of actions.  
If there is only one action, you can define it as shown in the example below, where the icon to be displayed and the function to be executed when clicked are specified inside the `{}`. The icon is the same as the one defined in the previous section under the `headerIcon` option.
```js
BitWindow.show({target:'winContents', actions:{icon: 'close', function:()=>BitWindow.close()}})
```
If you want to use more than one action, place all the actions inside `[]` and separate each action with a `,`.

```js
BitWindow.show({target:'winContents', actions:[{icon:'setting', function:()=>alert('setting action fired')},{icon: 'close', function:()=>BitWindow.close()}]})
```
The components that make up the action are as follows. Note that color and size do not apply to the icon.

|Opton name|Type |Default|Description|
|----------|:---:|:-----:|-----------|
|icon|string|close| There are 10 built-in icons: arrow_down, close, danger, info, menu, notes, question, setting, success, and warning. For the four icons — info, success, warn, and danger — you can append _colored (e.g., `info_colored`) to insert predefined colored versions of the icons.|
|function|function|BitWindow.close()|The function to be executed when the icon is clicked.|


## Event
Using the `BitWindow.close()` event, you can close the window that is displayed on the screen.
```js
BitWindow.show({target:'winContents', actions:{icon: 'close', function:()=>BitWindow.close()}})