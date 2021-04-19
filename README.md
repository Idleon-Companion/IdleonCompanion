# [Idleon Companion](https://idleoncompanion.com)

A companion website for the game [Legends of Idleon](https://www.legendsofidleon.com).

Test website updated with this repo can be found [here](https://Musimaniac.github.io/IdleonCompanion)

## Features

- Create characters for your Idleon characters
- Use tasks to keep track of various repeating goals, such as daily tasks or boss fights
- Track your progress for chests, cards, bags, pouches, and more
- See bonuses earned from cards, stamps, statues, etc.
- Calculate resources needed for the Picnic Stowaway quest "King of Food"
- Browse custom builds and card sets for maximum efficiency

# Contributing

Find an issue posted in the issues tab in the repository, and then write a comment that you will be working on the feature/changes. Once you are finished, make sure that your branch is up to date with the `master` branch, and create a new Pull Request (PR). Your PR will be reviewed before merge!

### Vue 3 + Typescript + Vite

To run the project, download yarn with `npm install -g yarn`

and then run the following:  
`yarn` - install dependencies  
`yarn dev` - run in localhost

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"
