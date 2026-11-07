# Client

Create the app here (run from the repo root):

```bash
npm create vite@latest client -- --template react-ts
cd client
npm install
```

Then follow the current shadcn Vite guide (https://ui.shadcn.com/docs/installation/vite)
to add Tailwind and run `npx shadcn@latest init`.

The client talks to the server at http://localhost:5000/api
(the server allows http://localhost:5173, Vite's default port).
