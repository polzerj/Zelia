let components: ComponentInfo[] = [
  {
    tagName: "test-component",
    type: Test,
    path: "/Test.html",
  },
  //...
];
initializeComponents(components).then(main);
