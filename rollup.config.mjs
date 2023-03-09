import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import postcss from "rollup-plugin-postcss";

import packageJson from "./package.json" assert { type: 'json' };

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
      },
      {
        file: packageJson.module,
        format: "esm",
      },
    ],
    external: [
      "react", "react-dom"
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*stories.tsx"]
      }),
      postcss(),
    ],
  },
  {
    input: "lib/esm/types/index.d.ts",
    output: [{ file: "lib/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/]
  },
];
