# Code of conduct

## Purpose

This document references and comments on rules to efficiently contribute to this project. Any contribution MUST follow all rules listed in this document, or it will be discarded.

## Separation of concerns

### Logic components vs Presentational components

All components must fall into one of two categories : logical components, and presentational components. It can be in either of them, but it CANNOT be in both of them. Categories are quickly defined as follow :
* A logical component receives events from other logical components it embeds in its slots, or presentational components it embeds in its slots. It prrocesses events, triggering the necessary features, or using the necessary composables. A logical component SHOULD NOT contain presentation, ie a full hierarchy of tags, or any CSS style. It should only be containers and slots, receiving and processing events.
* A presentational component gets its data from props and emits events to be caught by its parent container. The events SHOULD concern only "pure" events, and have no logic behind them. The best practice is to mimic default events (click, mouseup, etc.).

__R1.0 :__ A component MUST be either a logical component, or a presentational component, not both.
__R1.1 :__ A presentational component MUST only interactivity-related internal events, it MUST NOT emit business events.
__R1.2 :__ A logical component SHOULD NOT contain any more tag than necessary to define its slots, and use its children's events.

### Features and components

Components SHOULD NOT define business related code in them. It makes it not reusable and should be avoided at all cost. As a matter of fact, components SHOULD NOT define much functions, only syntaxic sugar ones, for example wrapping calls to composables that have many arguments. Business code SHOULD be defined in features (or sometimes in composable when there is a need for a global state, more on that later).

A feature is a function (with dependency injection, more on that later) that takes the minimum arguments to execute a whole process (saving a record, instanciating a list of entities, etc.) from beginning to end, handling asynchronous parts, notifications, etc. It orchestrates other functions, or other features if needed. It CAN use composables when needed.

__R2.1 :__ Feature functions MUST use dependency injections as defined further in this document.
__R2.2 :__ Feature functions MUST only accept native types, and business types as parameters.

A feature MUST NOT have any knowledge on how it will be displayed, or what events are managed in the interface. It's a purely logical piece of code.

### Business types and common types

__warning :__ These categories are still a bit shady and there should be stricter separation between them when they are completely thought through and designed.

Types are loosely separated into two categories : business types, and common types. A business type is a type representing a direct business object, for example "a synthesizer" or "a module". These types are the core of the application and represents "what we do", and "with what" we do it. Any other types are considered "common types", sometimes useful, but NOT representing business objects.

__R3.1 :__ Business types MUST be placed in `core/business` or one of its subfolder.
__R3.2 :__ Common types MUST NOT be placed in the folder referenced in R3.1 or one of its subfolder.
__R3.3 :__ Common types SHOULD be placed in `core/types` or one of its subfolder.

## Dependency injections

### Why ?

We try to never use "magic" dependencies. A magic dependency is a global variable, used in a function without passing it as parameter. It forces us to mock a lot of things in tests, and make them a bit harder to write and read. To ensure tests are easy to do, and objects easy to stub and manipulate, we inject dependencies whenever possible.

### How ?

Lets say you want to create a function _F1_ that uses another function _F2_. The classic way to do such a thing would probably be something like :

```javascript
export function F1() {
  F2();
}
```

This code is correct, and would run. Now imagine that you're _F2_ function does something like asynchronous processing, network requests, database update, etc. Any action that you don't want to run during tests, because it slows them down, because it has side effects, or because instead of its return value, you want to mock a return value of your own. With a simple "magic" dependency like this it's harder as you'll have to mock all calls to _F2_, then reset mocks, etc. Now lets imagine we pass the function as a parameter of _F1_ and instanciate _F1_ instead like this :

```javascript
export function F1Template(callback) {
  return () => {
    callback();
  } How to behave as a developer
}

export const F1 = F1Template(F2)
```

This will produce the exact same function as the first example, but now you can pass a dummy function to the template when testing it, without any side-effect that you would have when using mocks.

__R4.1 :__ A function using the dependencies injection MUST be a closure accepting dependencies in parameter of the first function.
__R4.2 :__ When using dependencies injections, all dependencies MUST be passed as parameter of the first function.