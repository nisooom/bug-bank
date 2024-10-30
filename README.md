# Bug Bank

> A simple bug tracking system for developers.

Developers can sign up and log in to our hosted system and create projects. They will get API keys for each project they create.

We have created an npm package that developers can use to report bugs in their projects. We have decieded to export a fucntion from our package to prevent inhibiting the developers' creativity in the way they want to report bugs.
![Bug Bank](/github/bb_2.jpeg)

![Bug Bank](/github/bb_3.jpeg)

Check out the [API documentation]() for more information.

Our npm package is available [here](https://www.npmjs.com/package/bugbank) and the source code is available [here](https://github.com/TejasBhovad/bugbank-package)

## Installation

```bash
npm install bugbank
```

## Usage

```javascript
import bugbankClient from "bugbank";
```

```javascript
bugbankClient.setKey(process.env.BUGBANK_SECRET);
```

```javascript
bugbankClient.sendReport(title, description, image_urls);
```

# Features

### AI powered Summary

we use Ollama (locally running) to generate a summary of the bug report on demand.
