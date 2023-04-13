import styled from "styled-components";
import { PROGRAMS } from "../data/Programs";

export default function Code({ codeDisplay, typingSpeed, onType }) {
  const editorLines = codeDisplay.contents.split("\n").length;
  const lineNumbers = [];
  for (let i = 1; i <= editorLines; ++i) {
    const lineNumber = i + codeDisplay.linesOffScreen;
    lineNumbers.push(<li key={lineNumber}>{lineNumber}</li>);
  }
  return (
    <Wrapper>
      <Container>
        <LineNumbersContainer>
          <LineNumbers>{lineNumbers}</LineNumbers>
        </LineNumbersContainer>
        <CodeEditor
          codeDisplay={codeDisplay}
          onType={onType}
          typingSpeed={typingSpeed}
        ></CodeEditor>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  min-height: 200px;
  overflow-y: scroll;
`;
const Container = styled.div`
  display: flex;
  height: 100%;

  .code-editor {
    flex: 1;
    padding: 5px;
    white-space: pre;
    background-color: inherit;
    color: inherit;
    resize: none;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    word-break: break-all;
  }

  .code-editor::placeholder {
    color: lime;
    opacity: 0.5;
    font-weight: bold;
  }

  /* https://stackoverflow.com/questions/1457849/how-to-remove-the-border-highlight-on-an-input-text-element */
  .code:focus {
    outline: none;
    outline-width: 0;
    -webkit-appearance: none;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
`;

const LineNumbersContainer = styled.div`
  height: 100%;
  width: 65px;
  position: relative;
  overflow: hidden;
  display: none;

  @media (min-width: 800px) {
    display: block;
  }
`;

const LineNumbers = styled.ul`
  /* When contents go beyond height, align to the bottom
  since this is the most recent line number */
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 100%; /* Ensures initial elements start at the top */

  border-right: 1px solid var(--light-color);
  text-align: right;
  padding-top: 5px;
  padding-right: 25px;
  padding-left: 0;
  margin: 0;
  list-style-type: none;
`;

function CodeEditor({ codeDisplay, typingSpeed, onType }) {
  const MAX_LINES = 32;
  const currentProgram = PROGRAMS[codeDisplay.programIndex].trim();

  return (
    <textarea
      value={codeDisplay.contents}
      placeholder="Type some code here..."
      className="code-editor"
      spellCheck="false"
      onKeyDown={(e) => {
        let toAppend = "";
        let nextProgramIndex = codeDisplay.programIndex;
        let nextProgramCharacterIndex = codeDisplay.programCharacterIndex;

        // Add the next characters of a program
        if (codeDisplay.programCharacterIndex >= currentProgram.length) {
          // Finished current program, switch to a new one
          // Ensure that the program is not the same as the current one
          do {
            nextProgramIndex = Math.floor(Math.random() * PROGRAMS.length);
          } while (nextProgramIndex === codeDisplay.programIndex);
          nextProgramCharacterIndex = 0;
          // Output newline between programs
          toAppend = "\n\n";
        } else {
          // Print more characters of the program
          let charsRemaining = parseInt(typingSpeed, 10);
          let lastChar = null;
          while (nextProgramCharacterIndex < currentProgram.length) {
            let char = currentProgram[nextProgramCharacterIndex];
            // Consecutive spaces are only counted as one character
            const isConsecutiveSpace = char === " " && lastChar === char;
            if (!isConsecutiveSpace && charsRemaining-- <= 0) {
              break;
            }
            lastChar = char;
            nextProgramCharacterIndex += 1;
            toAppend += char;
          }
        }

        // Calculate new lines of code
        let newContents = codeDisplay.contents + toAppend;
        let lines = newContents.split("\n");
        let linesTruncated = 0;

        // Truncate visible lines
        if (lines.length > MAX_LINES) {
          linesTruncated = lines.length - MAX_LINES;
          lines = lines.slice(linesTruncated);
          newContents = lines.join("\n");
        }

        // Calculate new values
        // Do not count blank lines
        const newCodeDisplay = {
          contents: newContents,
          linesOffScreen: codeDisplay.linesOffScreen + linesTruncated,
          programIndex: nextProgramIndex,
          programCharacterIndex: nextProgramCharacterIndex
        };

        // Call handler
        onType(e, newCodeDisplay);
      }}
      onChange={() => {}}
    ></textarea>
  );
}
