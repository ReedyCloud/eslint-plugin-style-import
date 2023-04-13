/**
 * @fileoverview  
 * @author rdy
 */
"use strict";

const rule = require("../../../lib/rules/vanilla-extract-styles"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2022, sourceType: "module" } });
ruleTester.run("vanilla-extract-styles", rule, {
  valid: [
    "import * as styles from '.Foo.css';",
    "import { sprinkles } from 'styles/sprinkles.css'",
    "import 'normalize.css';",
    "import { themes } from '../src/styles/theme.css';"
  ],

  invalid: [
    {
      code:"import os from \"./Image.css\";",
      errors: [{ message: "you should import styles as namespace - `* as styles`" }],
    },
    {
      code:"import { test } from \"./Image.css\";",
      errors: [{ message: "you should import styles as namespace - `* as styles`" }],
    },
    {
      code:"import * as something from \"./Image.css\";",
      errors: [{ message: "imported namespace should be named `styles`" }],
    },{
      code:"import Foo, {checkboxRoot,checkedCheckboxBorder,checkedCheckboxFill,checkedVar,emptyCheckboxFill,sizeVariants,} from './Checkbox.css';",
      errors: [{ message: "you should have only 1 import specifier" }],
    }
  ],
});
