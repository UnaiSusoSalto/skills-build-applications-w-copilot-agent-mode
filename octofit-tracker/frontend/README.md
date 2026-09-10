# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Environment variables

This app calls the OctoFit API using `VITE_CODESPACE_NAME`. Define it in a `.env.local` file
(not committed to git) so the frontend can build the Codespaces API URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The API base URL is built as `https://${VITE_CODESPACE_NAME}-8000.app.github.dev`. If
`VITE_CODESPACE_NAME` is not set, the app falls back to `http://localhost:8000`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
