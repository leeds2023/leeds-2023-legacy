# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure 

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg 
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).


## Getting the Storyblok Preview to work locally
Storyblok provides a visual editor alongside there CMS API. To set it up to work correctly with your local enviroment you will first need to make an SSL certificate as Storybloks visual editor will only work over https:// protocol. To setup your SSL follow the below instructions.

### Method 1
Start a development server with https proxy:

```
// Install mkcert for creating a valid certificate (Mac OS):

          $ brew install mkcert
          $ mkcert -install
          $ mkcert localhost
        
// Then install and run the proxy

          $ npm install -g local-ssl-proxy
          $ local-ssl-proxy --source 4320 --target 4321 --cert localhost.pem --key localhost-key.pem
        
// https is now running on port 4320 and forwarding requests to http 4321

This script has already been setup in this projects package.json so you can also just run npm run sslproxy
```

### Method 2
Create a static html page editor.html in your project with the following content:

```
<!DOCTYPE html>
<html>
    <head>
        <title>Storyblok Admin</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript">
            STORYBLOK_PREVIEW_URL = 'http://localhost:3000/'
        </script>
        <script src="https://app.storyblok.com/f/app-latest.js" type="text/javascript"></script>
    </body>
</html>
```
