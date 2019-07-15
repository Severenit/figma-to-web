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
The file key can be parsed from any Figma file url: `https://www.figma.com/file/${key}/${title}`.

Run command in terminal

```
node main.js ${key}
```
Wait for the script to finish...

In root directory you can see file `variables.css`

## Options

If you work in Figma with a big team, and you have team styles, you can take them.
The teams key can be parsed from any Figma file url: `https://www.figma.com/files/team/${teams_key}/${title}`

```
node main.js ${key} teams
```

#### Version
```
yarn -v 1.16.0

node -v 10.16.0
```
