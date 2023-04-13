/**
 * @fileoverview  
 * @author rdy
 */
"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'layout', 
    messages: {
      wrongNamespaceName: 'imported namespace should be named `styles`',
      tooManyImports: 'you should have only 1 import specifier',
      badImport: 'you should import styles as namespace - `* as styles`'
    },
    docs: {
      description: "",
      recommended: false,
      url: null, 
    },
    fixable: null, 
    schema: [], 
  },

  create(context) {
/**
 * @param { ImportDeclaration } node 
 * @returns {undefined} undefined if everything is alright
 * @returns {string}  `messageId` if import fails to satisfy rule 
 */
    function checkDeclaration(node) {
      const source = node.source;
      const specifiers = node.specifiers;

      const styleImport = /[A-Z].*\.css/;

      // exit if we are not importing from *PascalCaseNamedFile.css files
      if (!styleImport.test(source.value)) {
        return undefined
      }

      // there can be only one namespace import i guess
      if (specifiers.length > 1) {
        return 'tooManyImports'
      }

      if (specifiers[0].type !== 'ImportNamespaceSpecifier') {
        return 'badImport'
      }

      //TODO  add configurability 
      if (specifiers[0].local.name !== "styles") {
        return 'wrongNamespaceName'
      }

      return undefined
    }

    return {
      ImportDeclaration(node) {
        const result = checkDeclaration(node)
        if (result) {
          context.report({ node: node.source, messageId: result });
        }
      }
    }
  },
};
