# Web Component Practice.

## Concepts and usage

As developers, we all know that reusing code as much as possible is a good idea. This has traditionally not been so easy for custom markup structures — think of the complex HTML (and associated style and script) you've sometimes had to write to render custom UI controls, and how using them multiple times can turn your page into a mess if you are not careful.

Web Components aims to solve such problems — it consists of three main technologies, which can be used together to create versatile custom elements with encapsulated functionality that can be reused wherever you like without fear of code collisions.

**Custom elements:** A set of JavaScript APIs that allow you to define custom elements and their behaviour, which can then be used as desired in your user interface.

**Shadow DOM:** A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an element — which is rendered separately from the main document DOM — and controlling associated functionality. In this way, you can keep an element's features private, so they can be scripted and styled without the fear of collision with other parts of the document.

**HTML templates:** The `<template>` and `<slot>` elements enable you to write markup templates that are not displayed in the rendered page. These can then be reused multiple times as the basis of a custom element's structure.
The basic approach for implementing a web component generally looks something like this:

1. Create a class or a function in which you specify your web component functionality. If using a class, use the ECMAScript 2015 class syntax (see Classes for more information).
2. Register your new custom element using the CustomElementRegistry.define() method, passing it the element name to be defined, the class or function in which its functionality is specified, and optionally, what element it inherits from.
3. If required, attach a shadow DOM to the custom element using Element.attachShadow() method. Add child elements, event listeners, etc., to the shadow DOM using regular DOM methods.
4. If required, define an HTML template using `<template>` and `<slot>`. Again use regular DOM methods to clone the template and attach it to your shadow DOM.
5. Use your custom element wherever you like on your page, just like you would any regular HTML element.

[Read MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
