import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Exercise the shipped pure helpers without a second browser/test dependency.
export async function loadTypeScript(file) {
  const source = await readFile(file, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
  });
  return import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
}
