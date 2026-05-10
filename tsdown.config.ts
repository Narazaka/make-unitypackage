import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./index.ts'],
  format: ['cjs', 'esm'],
  outDir: '.',
  clean: false,
  attw: true,
  publint: true,
})
