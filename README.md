## Set up Environment

1. **Install Node**: go to [https://nodejs.org](https://nodejs.org/) and click on the Download button. You should install the LTS version. On Windows: you need to configure your PATH environmental variable.

2. **Verify the Node Installation**: type `node -v` or `npm -v` in your terminal to verify.

3. **Install VS Code and its extentions**: Install VS Code on https://code.visualstudio.com/. Install extentions including CSS Formatter, SCSS Formatter, vscode-author-generator, and TODO Highlight.

4. **Set up vscode-author-generator extentions**: Go to folder extensions/edwardhjp.vscode-author-generator-version/templates. Change all template files into 

   ```javascript
   /**
    * @author "Your Name"
    * @create date [date]
    * @modify date [date]
    */
   ```

5. **Install Yarn** (Optional): Use the instruction `yarn add`  instead of `npm i` to install libraries faster 

## Set up the Project

The first thing your should do after cloning the repository is to type the command `npm i` or `yarn add` in the root directory to install all node external libraries.

## Scripts

| Script    | Function                                                     |
| --------- | ------------------------------------------------------------ |
| npm start | Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console. |
| npm build | Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information. |

## Naming Convention

| Category                                      | Method                                                     |
| --------------------------------------------- | ---------------------------------------------------------- |
| Folder                                        | Lowercase + underline. E.g. "public_related"               |
| **.js .jsx** file                             | Pascal case. E.g. "MainComponent.js", "HeaderComponent.js" |
| Component variables in **.jsx**               | Pascal case. E.g. "HeaderFirstLayer", "Main"               |
| Function variables in **.js .jsx**            | Camel case. E.g. "handleSearch", "handleSubmit",           |
| Constant values in **.js .jsx**               | Lowercase + underline. E.g. "main_margin"                  |
| **.css .scss** file                           | Same as **.js .jsx** file                                  |
| id, class and all variables in **.css .scss** | Lowercase + "-", E.g. "header-border", "rank-btn"          |

## Coding Style

1. Javascript files which contain React components should be named with .jsx.

2. If the function is only used within the function component or the class component, it should be defined within that component

3. All constant variables should be defined in the `src/data/constants` folder.

4. The import parts of each .js file should be divided into two area by an empty line. One is to import library, the other one is to import our own files.

   E.g

   ```javascript
   import React, { Component } from 'react';
   import { connect } from "react-redux";
   										// division line
   import { setHeaderState } from '../../../redux/actions/creators/HeaderStateAction';
   import './SectionButtons.scss'
   ```

   