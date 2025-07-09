declare namespace NodeJS {
  interface Global {
    $: JQueryStatic;
  }
}

declare var global: NodeJS.Global;
