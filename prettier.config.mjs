const config = {
    // printWidth: 120,
    printWidth: 11024,
    useTabs: false,
    tabWidth: 2,
    singleQuote: false,
    semi: true,
    trailingComma: "all",
  
    // Sort Imports
    plugins: [
      'prettier-plugin-organize-imports',
      "@trivago/prettier-plugin-sort-imports"
    ],
    importOrder: [
      "^\\.{1,2}/(?:.*?/)*lib/.*$",
      "^\\.{1,2}/(?:.*?/)*compat/.*$",
      "^\\.{1,2}/(?:.*?/)*config-loader/.*$",
      "^\\.{1,2}/(?:.*?/)*database/.*$",
  
      "^\\.{1,2}/(?:.*?/)*app/.*$",
  
      // 4. /commands/
      "^\\.{1,2}/(?:.*?/)*commandManager/.*$",
      "^\\.{1,2}/(?:.*?/)*commands/.*$",
  
      "^\\.{1,2}/(?:.*?/)*shared/.*$",
      "^\\.{1,2}/(?:.*?/)*client/.*$",
      "^\\.{1,2}/(?:.*?/)*server/.*$",
  
      // どのパターンにも当てはまらなかったものを最後に
      "^[./]",
    ],
    importOrderSeparation: false,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  };
  
  export default config;