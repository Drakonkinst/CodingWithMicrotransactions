// All buildings in the game
export const BUILDINGS = [
  {
    id: "variable",
    name: "Variable",
    singular: "variable",
    plural: "variables",
    basePrice: 0.04,
    baseBonus: 0.005,
    description: "A variable to store data with your code.",
    flavor:
      "Reusable 4-byte named objects in memory, great for keeping track of integers and 32-bit memory addresses.",
    upgrades: [
      "variable1",
      "variable2",
      "variableDebug",
      "variable3",
      "variable4",
      "variable5"
    ]
  },
  {
    id: "function",
    name: "Function",
    singular: "function",
    plural: "functions",
    basePrice: 0.32,
    baseBonus: 0.02,
    description: "A function to help you organize your code.",
    flavor:
      "Technically, these are variables too. But I won't tell the developer if you don't.",
    upgrades: [
      "function1",
      "function2",
      "functionDebug",
      "function3",
      "function4",
      "function5"
    ]
  },
  {
    id: "coffee",
    name: "Cup of Coffee",
    singular: "cup of coffee",
    plural: "cups of coffee",
    basePrice: 2.56,
    baseBonus: 0.1,
    description: "A cup of coffee to help you write more code.",
    flavor:
      "You know what they say about programmers: Caffeine goes in, code comes out.",
    upgrades: [
      "coffee1",
      "coffee2",
      "coffeeDebug",
      "coffee3",
      "coffee4",
      "coffee5"
    ]
  },
  {
    id: "html",
    name: "HTML Element",
    singular: "HTML element",
    plural: "HTML elements",
    basePrice: 20.48,
    baseBonus: 1,
    description: "An HTML element to give some structure to your code.",
    flavor:
      "Describes the structure and contents of all webpages, much to the glee of those just discovering Inspect Element.",
    upgrades: ["html1", "html2", "htmlDebug", "html3", "html4", "html5"]
  },
  {
    id: "css",
    name: "CSS Rule",
    singular: "CSS rule",
    plural: "CSS rules",
    basePrice: 163.84,
    baseBonus: 3,
    description: "A CSS rule to make your code look pretty.",
    flavor:
      "It might look unassuming at first, but ask any programmer to use it to center a div and they'll start crying.",
    upgrades: ["css1", "css2", "cssDebug", "css3", "css4", "css5"]
  },
  {
    id: "react",
    name: "React Component",
    singular: "React component",
    plural: "React components",
    basePrice: 1310.72,
    baseBonus: 5,
    description: "A React component to make your code more interactive.",
    flavor: "",
    upgrades: ["react1", "react2", "reactDebug", "react3", "react4", "react5"]
  }
];
