# Lodash Is Bullshit

1. JavaScript has come a long way since the days of JQuery and Underscore. Most of the problems they were designed to solve have been solved "natively" by the language itself, or associated APIs.

1. Due to the historic mistake that is CommonJS, you have to be fairly cautious not to include the whole library in your bundle, despite not using the vast majority of its utilities.

1. Lodash is generic. To an extreme degree. Have a look at its approach to a problem, but 99 % of the time, you'll be better of writing your own implementation, because you know which cases you'll have to deal with.

1. Lodash is written in a particularly defensive style, ensuring that it will transparently deal with any value you happen to give it, at the cost of introducing a vast amount of runtime checks that are mostly redundant if you're calling it from typed code.

1. You don't actually want to write functional-style JavaScript. There is a couple of concepts you'll do well to borrow, but JavaScript has some pretty serious limitations and runtime penalties for Haskell imitations — functions are expensive, object allocation is expensive, tail call elimination doesn't exist, etc.

Here's the distilled (Lodash usage remains untouched) code that sparked this article:

```ts
function (values: T[] | T) {
  chain([values])
    .flatten()
    .filter(value => !value.property)
    .forEach(value => effect(value))
    .value();
}
```

Beautiful! I'm not interested in whether this is a good application of Lodash. Based on my experience it exhibits the general approach to problem solving with Lodash, i.e. using Lodash and only Lodash to solve any particular problem. Because Lodash makes it so easy! So easy, in fact, that you don't even question the API design of your functions, accepting that `values` must necessarily be a superposition of Many and One (despite it being trivial in JS to write an array literal).  
Writing the same function in pure JavaScript yields fewer lines of easily debuggable imperative code, higher performance, and reveals the cost of using the `Many | One` union, prompting us to maybe rethink and refine the API:

```ts
function (values: T[] | T) {
  values = Array.isArray(values) ? values : [values];
  for (const value of values) {
    if (!value.property) effect(value);
  }
}
```

Naturally, I also prefer to not have to learn additional frameworks and pseudo-standard-libraries that aren't actually necessary or useful.
