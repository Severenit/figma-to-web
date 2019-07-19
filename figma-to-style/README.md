# Figma to Style
## Introduction

First, you have to put your access token key in `.env `

Token key you can take in [this](https://www.figma.com/developers/docs#authentication).
You can create a temporary access token by clicking right there on `Get personal access token` or read how to make permanent access token.

## Install

Run this command:

```
yarn install
```

Then, you should run the script and you will need a file key.
The file key can be parsed from any Figma file url: `https://www.figma.com/file/${file_key}/${title}`.

Run command in terminal

```
node main.js ${file_key}
```
Wait for the script to finish...

In root directory you can see folder `build` where are the generated `css` and `scss` files.

## Options

If you work in Figma with a big team, and you have team styles, you can take them.
The teams key can be parsed from any Figma team url: `https://www.figma.com/files/team/${teams_key}/${title}`

```
node main.js ${teams_key} teams
```

If your Figma file has a "node element" with "spacers geometry", you can also add them to generate styles.

```
node main.js ${file_key} file spacers=${node_id}
```

> The node_id key can be parsed from any Figma team url: `https://www.figma.com/file/${file_key}/${title}?node-id=${node_id}`

If you want to customize more accurate style generation and not only on `Web` but also `iOS` and `Android`.

Change the configuration in the file `config.json`

Read more about all possible settings here in [Style Dictionary](https://amzn.github.io/style-dictionary/#/README)

#### Version
```
yarn -v 1.16.0

node -v 10.16.0
```