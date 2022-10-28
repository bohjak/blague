export let translations = {
  general: {
    text: "Hello, World!",
  },
};

export function update() {
  translations = {
    general: {
      text: "Goodbye!",
    },
  };
}
