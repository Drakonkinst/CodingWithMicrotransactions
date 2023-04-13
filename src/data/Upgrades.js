const TYPING_ICON = "⌨️";
const VARIABLE_ICON = "💾";
const FUNCTION_ICON = "📈";
const COFFEE_ICON = "☕";
const HTML_ICON = "🖼️"; //"✏️";
const CSS_ICON = "🎨"; // "🖌️";
const REACT_ICON = "⚛️";

// Palette Option 1
//const COLOR_TIER_1 = "#aaaaaa";
const COLOR_TIER_2 = "#67de59";
const COLOR_TIER_3 = "#5e6ee2";
const COLOR_TIER_4 = "#de1ef6";
// const COLOR_TIER_5 = "#ffc611";
const COLOR_TIER_6 = "#ff033e";

// Palette Option 2
const COLOR_TIER_1 = "#eeeeee";
// const COLOR_TIER_2 = "#1dff00";
// const COLOR_TIER_3 = "#0070dd";
// const COLOR_TIER_4 = "#a335ed";
const COLOR_TIER_5 = "#ff8001";
// const COLOR_TIER_6 = "#ff033e";

const TIER_PRICES = {
  TYPING: [3, 15, 80, 475, 2560, 13500],
  BUG: [4, 16, 64, 512, 2048, 16384],
  BONUS: [4, 16, 64, 512, 2048, 16384],
  VARIABLE: [1, 5, 15, 40, 90, 30],
  FUNCTION: [3, 15, 45, 90, 200, 70],
  COFFEE: [10, 25, 65, 150, 350, 100],
  HTML: [50, 150, 350, 750, 1500, 500],
  CSS: [400, 850, 1800, 3700, 7500, 2000],
  REACT: [3000, 700, 15000, 24650, 49500, 20000]
};

const TYPING_DESCRIPTION = (
  <span>
    Increases your <strong>typing speed</strong>.
  </span>
);
const DEBUG_DESCRIPTION = (
  <span>
    Reduce bug penalties by <strong>5%</strong>.
  </span>
);
const BUG_DESCRIPTION = (
  <span>
    Code produces <strong>5%</strong> less bugs.
  </span>
);

export const UPGRADES = {
  chatgpt: {
    name: "ChatGPT",
    icon: "🤖",
    color: COLOR_TIER_6,
    price: 6790,
    description: (
      <span>
        A general-purpose chatbot that{" "}
        <strong>doubles your typing speed</strong>, but has a
        <strong className="bug-text"> 10% chance to generate more bugs.</strong>
      </span>
    ),
    flavor:
      "After careful thought, you decide to let this new-fangled AI do most of the coding for you. What's the worst that could happen?"
  },
  typing1: {
    name: "Typing Practice",
    icon: TYPING_ICON,
    color: COLOR_TIER_1,
    price: TIER_PRICES.TYPING[0],
    description: TYPING_DESCRIPTION,
    flavor: ""
  },
  typing2: {
    name: "Autocomplete",
    icon: TYPING_ICON,
    color: COLOR_TIER_2,
    price: TIER_PRICES.TYPING[1],
    description: TYPING_DESCRIPTION,
    flavor: ""
  },
  typing3: {
    name: "Mechanical Keyboard",
    icon: TYPING_ICON,
    color: COLOR_TIER_3,
    price: TIER_PRICES.TYPING[2],
    description: TYPING_DESCRIPTION,
    flavor:
      "You know it doesn't really change anything, but it sure does make you feel fancy."
  },
  typing4: {
    name: "Copy-Paste Shortcuts",
    icon: TYPING_ICON,
    color: COLOR_TIER_4,
    price: TIER_PRICES.TYPING[3],
    description: TYPING_DESCRIPTION,
    flavor: "Ctrl-A, Ctrl-C, Ctrl-V Ctrl-V Ctrl-V Ctrl-V"
  },
  typing5: {
    name: "Vim",
    icon: TYPING_ICON,
    color: COLOR_TIER_5,
    price: TIER_PRICES.TYPING[4],
    description: TYPING_DESCRIPTION,
    flavor:
      "You decided to get into Vim to waste less time switching between your mouse and keyboard. After spending a long while practicing all the keybinds, you've become much faster! Now if only you could get back out again..."
  },
  typing6: {
    name: "Carpal Tunnel",
    icon: TYPING_ICON,
    color: COLOR_TIER_6,
    price: TIER_PRICES.TYPING[5],
    description: TYPING_DESCRIPTION,
    flavor: "You need to go faster. But at what cost?"
  },
  bug1: {
    name: "Syntax Highlighting",
    icon: "🖌️",
    color: COLOR_TIER_1,
    price: TIER_PRICES.BUG[0],
    description: BUG_DESCRIPTION,
    flavor: (
      <span>
        You can take my fancy tools
        <br />
        You can take my IDE
        <br />
        But oh please, do not take my
        <br />
        Syntax highlighting from me
      </span>
    )
  },
  bug2: {
    name: "Multi-Line Comments",
    icon: "💬",
    color: COLOR_TIER_2,
    price: TIER_PRICES.BUG[1],
    description: BUG_DESCRIPTION,
    flavor:
      "Code can only tell what it does, not what it's supposed to be doing."
  },
  bug3: {
    name: "Developer Console",
    icon: "🖥️",
    color: COLOR_TIER_3,
    price: TIER_PRICES.BUG[2],
    description: BUG_DESCRIPTION,
    flavor: ""
  },
  bug4: {
    name: "StackOverflow",
    icon: "📚",
    color: COLOR_TIER_4,
    price: TIER_PRICES.BUG[3],
    description: BUG_DESCRIPTION,
    flavor: ""
  },
  bug5: {
    name: "Documentation",
    icon: "📘",
    color: COLOR_TIER_5,
    price: TIER_PRICES.BUG[4],
    description: BUG_DESCRIPTION,
    flavor:
      "Remember: 6 hours of debugging can save you 5 minutes of reading the documentation."
  },
  bug6: {
    name: "Refactoring",
    icon: "🍝",
    color: COLOR_TIER_6,
    price: TIER_PRICES.BUG[5],
    description: BUG_DESCRIPTION,
    flavor:
      "All we can do is our best. And sometimes the best we can do is start over..."
  },
  bonus1: {
    name: "Accessibility",
    icon: "♿",
    color: COLOR_TIER_1,
    price: TIER_PRICES.BONUS[0],
    description: (
      <span>
        Programs longer than <strong>20 lines</strong> earn{" "}
        <strong>20% more.</strong>
      </span>
    ),
    flavor: ""
  },
  bonus2: {
    name: "Responsiveness",
    icon: "📲",
    color: COLOR_TIER_2,
    price: TIER_PRICES.BONUS[1],
    description: (
      <span>
        Programs longer than <strong>40 lines</strong> earn{" "}
        <strong>20% more.</strong>
      </span>
    ),
    flavor: ""
  },
  bonus3: {
    name: "User Testing",
    icon: "👨‍👩‍👦",
    color: COLOR_TIER_3,
    price: TIER_PRICES.BONUS[2],
    description: (
      <span>
        Programs longer than <strong>60 lines</strong> earn{" "}
        <strong>20% more.</strong>
      </span>
    ),
    flavor: ""
  },
  bonus4: {
    name: "Portfolio Website",
    icon: "👔",
    color: COLOR_TIER_4,
    price: TIER_PRICES.BONUS[3],
    description: (
      <span>
        Programs longer than <strong>80 lines</strong> earn{" "}
        <strong>20% more.</strong>
      </span>
    ),
    flavor: ""
  },
  bonus5: {
    name: "Personal Blog",
    icon: "🌐",
    color: COLOR_TIER_5,
    price: TIER_PRICES.BONUS[4],
    description: (
      <span>
        Programs longer than <strong>100 lines</strong> earn{" "}
        <strong>20% more.</strong>
      </span>
    ),
    flavor:
      "You know, you've started to learn quite a bit about this stuff. Maybe you should post about it on the Internet?"
  },
  bonus6: {
    name: "Educational Game",
    icon: "🎮",
    color: COLOR_TIER_6,
    price: TIER_PRICES.BONUS[5],
    description: (
      <span>
        Programs longer than <strong>120 lines</strong> earn{" "}
        <strong>20% more.</strong>
      </span>
    ),
    flavor: "...Wait a minute."
  },
  variable1: {
    name: "Data Types",
    icon: VARIABLE_ICON,
    color: COLOR_TIER_1,
    price: TIER_PRICES.VARIABLE[0],
    description: (
      <span>
        Variables are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      'TL;DR: Use triple equals. You don\'t need type checking, but when "3"+2 == 32 and "3"-2 == 1, you\'ll probably wish you did.'
  },
  variable2: {
    name: "Constants",
    icon: VARIABLE_ICON,
    color: COLOR_TIER_2,
    price: TIER_PRICES.VARIABLE[1],
    description: (
      <span>
        Variables are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "Protects variables from being overwritten, though arrays and objects can still be mutated. Just to keep you on your toes."
  },
  variable3: {
    name: "Truthy Expressions",
    icon: VARIABLE_ICON,
    color: COLOR_TIER_3,
    price: TIER_PRICES.VARIABLE[2],
    description: (
      <span>
        Variables are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: (
      <span>
        <span>'Wait, everything's a boolean?'</span>
        <br />
        <span>'Always has been'</span>
      </span>
    )
  },
  variable4: {
    name: "Destructuring",
    icon: VARIABLE_ICON,
    color: COLOR_TIER_4,
    price: TIER_PRICES.VARIABLE[3],
    description: (
      <span>
        Variables are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "The best part about building well-defined structures is tearing them apart again."
  },
  variable5: {
    name: "Regular Expressions",
    icon: VARIABLE_ICON,
    color: COLOR_TIER_5,
    price: TIER_PRICES.VARIABLE[4],
    description: (
      <span>
        Variables are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "After many long hours spent fiddling with nonsensical patterns, you're not sure if you've actually understood anything you learned. At least your string operations are faster now!"
  },
  variableDebug: {
    name: "Naming Conventions",
    icon: VARIABLE_ICON,
    color: COLOR_TIER_6,
    price: TIER_PRICES.VARIABLE[5],
    description: DEBUG_DESCRIPTION,
    flavor:
      "Be descriptive and consistent, and your future self will thank you...or just name it 'x' again."
  },

  function1: {
    name: "Arrow Functions",
    icon: FUNCTION_ICON,
    color: COLOR_TIER_1,
    price: TIER_PRICES.FUNCTION[0],
    description: (
      <span>
        Functions are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "Less characters to type is always good, right? What was 'this' referring to, again?"
  },
  function2: {
    name: "Function Scope",
    icon: FUNCTION_ICON,
    color: COLOR_TIER_2,
    price: TIER_PRICES.FUNCTION[1],
    description: (
      <span>
        Functions are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "Wait, you've been using global variables this entire time? You monster."
  },
  function3: {
    name: "Recursion",
    icon: FUNCTION_ICON,
    color: COLOR_TIER_3,
    price: TIER_PRICES.FUNCTION[2],
    description: (
      <span>
        Functions are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: "Fun fact: PHP stands for PHP Hypertext Preprocessor."
  },
  function4: {
    name: "Callbacks",
    icon: FUNCTION_ICON,
    color: COLOR_TIER_4,
    price: TIER_PRICES.FUNCTION[3],
    description: (
      <span>
        Functions are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "Here, take this function. Just call it to let me know when you're done...please?"
  },
  function5: {
    name: "Closure",
    icon: FUNCTION_ICON,
    color: COLOR_TIER_5,
    price: TIER_PRICES.FUNCTION[4],
    description: (
      <span>
        Functions are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "Nesting functions within each other allows the inner function to access variables in the outer function, even after the outer function is called. When your brain is done spinning, we can talk about IIFEs."
  },
  functionDebug: {
    name: "Pure Functions",
    icon: FUNCTION_ICON,
    color: COLOR_TIER_6,
    price: TIER_PRICES.FUNCTION[5],
    description: DEBUG_DESCRIPTION,
    flavor:
      "You've gotten tired of all of these side effects. Perhaps it's time for a more functional approach?"
  },

  coffee1: {
    name: "Caffeine Addiction",
    icon: COFFEE_ICON,
    color: COLOR_TIER_1,
    price: TIER_PRICES.COFFEE[0],
    description: (
      <span>
        Coffee is <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "The answer is to drink coffee. And if that doesn't work, drink more coffee."
  },
  coffee2: {
    name: "Personal Espresso Machine",
    icon: COFFEE_ICON,
    color: COLOR_TIER_2,
    price: TIER_PRICES.COFFEE[1],
    description: (
      <span>
        Coffee is <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "When working from home, there's only one thing you missed from your office."
  },
  coffee3: {
    name: "Sleepless Nights",
    icon: COFFEE_ICON,
    color: COLOR_TIER_3,
    price: TIER_PRICES.COFFEE[2],
    description: (
      <span>
        Coffee is <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: "You don't need sleep. You need answers."
  },
  coffee4: {
    name: "Chronic Insomnia",
    icon: COFFEE_ICON,
    color: COLOR_TIER_4,
    price: TIER_PRICES.COFFEE[3],
    description: (
      <span>
        Coffee is <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "You find that your debugging skills are at its best before the dawn."
  },
  coffee5: {
    name: "Biological Dependency",
    icon: COFFEE_ICON,
    color: COLOR_TIER_5,
    price: TIER_PRICES.COFFEE[4],
    description: (
      <span>
        Coffee is <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: "Is it really an addiction if you're a caffeine-based life form?"
  },
  coffeeDebug: {
    name: "Late Night Debugging",
    icon: COFFEE_ICON,
    color: COLOR_TIER_6,
    price: TIER_PRICES.COFFEE[5],
    description: DEBUG_DESCRIPTION,
    flavor:
      "Nothing productive is ever done past 1AM — but you've got deadlines to meet, and these bugs won't fix themselves."
  },

  html1: {
    name: "Document Structure",
    icon: HTML_ICON,
    color: COLOR_TIER_1,
    price: TIER_PRICES.HTML[0],
    description: (
      <span>
        HTML Elements are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: (
      <span>
        In the begining, there was darkness. Then Tim said,{" "}
        <span
          style={{
            fontStyle: "normal",
            fontWeight: "bold"
          }}
        >
          &lt;!DOCTYPE html&gt;
        </span>
        .
      </span>
    )
  },
  html2: {
    name: "HTML Attributes",
    icon: HTML_ICON,
    color: COLOR_TIER_2,
    price: TIER_PRICES.HTML[1],
    description: (
      <span>
        HTML Elements are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "Space-separated name-value pairs in your opening tags. There's quite a lot of them, so best start looking them up."
  },
  html3: {
    name: "Site Metadata",
    icon: HTML_ICON,
    color: COLOR_TIER_3,
    price: TIER_PRICES.HTML[2],
    description: (
      <span>
        HTML Elements are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "Data that describes data. Useful for getting your apps onto search engines, as well as other knick-knacks like page titles and Twitter embeds."
  },
  html4: {
    name: "External File Linking",
    icon: HTML_ICON,
    color: COLOR_TIER_4,
    price: TIER_PRICES.HTML[3],
    description: (
      <span>
        HTML Elements are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: "Ah, that's why my scripts weren't working."
  },
  html5: {
    name: "Input Elements",
    icon: HTML_ICON,
    color: COLOR_TIER_5,
    price: TIER_PRICES.HTML[4],
    description: (
      <span>
        HTML Elements are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "Lets your users inject all kinds of fun stuff if not validated properly."
  },
  htmlDebug: {
    name: "Semantic HTML",
    icon: HTML_ICON,
    color: COLOR_TIER_6,
    price: TIER_PRICES.HTML[5],
    description: DEBUG_DESCRIPTION,
    flavor:
      "Maybe we shouldn't be using <div> and <span> for everything. If only there was some better way..."
  },

  css1: {
    name: "Box Model",
    icon: CSS_ICON,
    color: COLOR_TIER_1,
    price: TIER_PRICES.CSS[0],
    description: (
      <span>
        CSS Rules are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "To CSS, everything is a box: margins, borders, padding, and content, all stacked within each other like nesting dolls."
  },
  css2: {
    name: "Selector Specificity",
    icon: CSS_ICON,
    color: COLOR_TIER_2,
    price: TIER_PRICES.CSS[1],
    description: (
      <span>
        CSS Rules are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: ".be-more-specific.be-more-specific.be-more-specific"
  },
  css3: {
    name: "Pseudo-classes",
    icon: CSS_ICON,
    color: COLOR_TIER_3,
    price: TIER_PRICES.CSS[2],
    description: (
      <span>
        CSS Rules are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: ""
  },
  css4: {
    name: "Flexboxes",
    icon: CSS_ICON,
    color: COLOR_TIER_4,
    price: TIER_PRICES.CSS[3],
    description: (
      <span>
        CSS Rules are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: ""
  },
  css5: {
    name: "Keyframe Animations",
    icon: CSS_ICON,
    color: COLOR_TIER_5,
    price: TIER_PRICES.CSS[4],
    description: (
      <span>
        CSS Rules are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: ""
  },
  cssDebug: {
    name: "Custom Properties",
    icon: CSS_ICON,
    color: COLOR_TIER_6,
    price: TIER_PRICES.CSS[5],
    description: DEBUG_DESCRIPTION,
    flavor: ""
  },

  react1: {
    name: "Conditional Rendering",
    icon: REACT_ICON,
    color: COLOR_TIER_1,
    price: TIER_PRICES.REACT[0],
    description: (
      <span>
        React Components are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: ""
  },
  react2: {
    name: "Styled Components",
    icon: REACT_ICON,
    color: COLOR_TIER_2,
    price: TIER_PRICES.REACT[1],
    description: (
      <span>
        React Components are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: ""
  },
  react3: {
    name: "State Update Reducers",
    icon: REACT_ICON,
    color: COLOR_TIER_3,
    price: TIER_PRICES.REACT[2],
    description: (
      <span>
        React Components are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: ""
  },
  react4: {
    name: "Custom Hooks",
    icon: REACT_ICON,
    color: COLOR_TIER_4,
    price: TIER_PRICES.REACT[3],
    description: (
      <span>
        React Components are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor: ""
  },
  react5: {
    name: "Effects",
    icon: REACT_ICON,
    color: COLOR_TIER_5,
    price: TIER_PRICES.REACT[4],
    description: (
      <span>
        React Components are <strong>20%</strong> more efficient.
      </span>
    ),
    flavor:
      "Offers an escape hatch from the safety of React into the dangerous JavaScript jungle, where side effects roam free. I hope you know what you're doing."
  },
  reactDebug: {
    name: "Shared Context",
    icon: REACT_ICON,
    color: COLOR_TIER_6,
    price: TIER_PRICES.REACT[5],
    description: DEBUG_DESCRIPTION,
    flavor: ""
  }
};
