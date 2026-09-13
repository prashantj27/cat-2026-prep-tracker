import { build } from 'esbuild'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const smokeDir = path.dirname(fileURLToPath(import.meta.url))

await build({
  entryPoints: [path.join(smokeDir, 'test-entry.jsx')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  jsx: 'automatic',
  outfile: path.join(smokeDir, 'bundle.mjs'),
  external: ['react', 'react/*', 'react-dom/*', 'recharts', 'node:*'],
  logLevel: 'silent',
})

execSync(`node "${path.join(smokeDir, 'bundle.mjs').replace(/\\/g, '/')}"`, { stdio: 'inherit' })