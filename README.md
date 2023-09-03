# Places App Frontend

## Requirements

An environment that supports Node.JS and a .env in the root app directory with the following options:

```
# Required to make API calls to Google APIs
# NOTE: This will be inserted into index.html at build, so make sure API key is
#       suitably restricted to your intended domain/IP/etc.
REACT_APP_API_KEY="some_api_key"

# Required to make API calls to the backend server
REACT_APP_BACKEND_TARGET="http://backend_host:some_port"
```

## Installation

### Base Installation

Install like any NPM app with:

`npm install`

Once the node_modules directory is populated and you have created a .env file as described in [Requirements](#requirements), you can start the development server with:

`npm run`

### Devcontainer

Requires a supported tool like Visual Studio Code, IntelliJ Idea, Dev Container CLI. Instructions vary per tool, but the devcontainer definition files live in the .devcontainer folder.
