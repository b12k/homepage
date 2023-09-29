export const funFunction = (args: FooBar) => alert(JSON.stringify(args));
export interface FooBar {
  foo: 'Foo';
  bar: 'Bar';
}
