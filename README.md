# [EncoderDecoder](https://nandhu-44.github.io/EncoderDecoder/)

This project is a simple utility _(web and command-line)_ for encrypting and decrypting text using the `cipher-guard` library. It uses the `chalk` library for colored console output.

## Installation

To install the necessary dependencies, run:

```sh
bun install
```

## Usage

To start the application, run:

```sh
bun run start
```
<h3 align="center">OR</h3>


```sh
bun run index.js
```
This will start the application in the terminal. You will be prompted with a menu to choose between encrypting and decrypting text.

If you choose to encrypt, you will be asked to enter the text to encrypt, the key rounds (0-127), and the salt. If these values are provided in the environment variables `cipherGuardKeyRounds` and `cipherGuardSalt`, they will be used by default.

If you choose to decrypt, you will be asked to enter the text to decrypt, the key rounds (0-127), and the salt. Again, if these values are provided in the environment variables `cipherGuardKeyRounds` and `cipherGuardSalt`, they will be used by default.

## Building

To build the project, run:

```sh
bun run build
```

This will create a bundled JavaScript file in the `dist` directory.

To compile the project into an executable, run:

```sh
bun run compile
```

This will create an executable file in the `dist` directory.

## Webview

The code for website is in the [`web`](/web/) directory. To start the website;

```sh
cd web && npm install && npm run dev
```

This will start the website on `localhost:5173`.

The app is also viewable from [here](https://nandhu-44.github.io/EncoderDecoder/).
