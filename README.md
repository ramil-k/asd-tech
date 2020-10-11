# Evaluation for ASD technology

This is the evaluation task to apply to ASD vacancy.

[Assignment text](https://docs.google.com/document/d/11-pV1Nl_1gXYjF241J_lWlWnvF33tSvBph0nsQno67o/edit)

## Preparation
```
npm i
```

## Running development environment
```
npm run start
```

## Creating a build
```
npm run build
```

## Specifications and clarifications

### Structure
Application based on Create React App.

### Code style
For code style I'm using default prettier with pre-commit hook for formatting.

### Technical decisions

#### Layout
Using SCSS and bem-notation.

#### Form management
Decided to use Formik to reduce boilerplate, handle errors and corner-cases.

#### State storage
In case of current application I considered:
- mobX
    + straightforward to use
    + requires little configuration
    - introduces new library into project
    - a lot happens under the hood
- redux
    + requires little configuration
    - adds a considerable amount of boilerplate, that is acceptable for complex app-level storage
    - introduces new library into project
- useReducer hook
    + does not require configuration
    - requires lots of pass-through boilerplate in case of complex app-level state
    - only works with function-based components 

Decided to go with useReducer, that way I don't need to introduce extra libs and will not introduce a lot of boilerplate. 

### Staff to improve

- Icons and logos
- All string constants should be moved to localisation files.
- Tests
- This readme can be clearer 
