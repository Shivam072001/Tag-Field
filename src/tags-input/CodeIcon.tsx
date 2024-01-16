import Editor from "@monaco-editor/react";
import { useState } from "react";
import { appFile, codeIconFile, countriesFile, tagsInputFieldFile, tagsInputFieldTestFile, tagsInputFile, tagsInputTestFile, removeButtonFile, renderSuggestionFile, indexFile, indexHtmlFile, indexMainFile, indexcssFile } from "./Codes";

function CodeViewer() {
  const [showCode, setShowCode] = useState<boolean>(false);
  const Files = [indexHtmlFile, indexcssFile, indexMainFile, appFile, codeIconFile, countriesFile, tagsInputFieldFile, tagsInputFieldTestFile, tagsInputFile, tagsInputTestFile, removeButtonFile, renderSuggestionFile, indexFile]
  const FileName = ["index.html", "index.css", "index.tsx", "App.tsx", "CodeIcon.tsx", "Countries.json", "Tags-Input-Field.tsx", "Tags-Input-Field-Test.tsx", "Tags-Input.tsx", "Tags-Input-Test.tsx", "Remove-Button.tsx", "Render-Suggestion.tsx", "tags-input/index.ts"]

  const handleIconClick = () => {
    setShowCode(true);
  };
  
  const handleCloseEditor = () => {
    setShowCode(false);
  };

  return (
    <div className="code-viewer-container">
    <button type="button" className="btn btn-primary" onClick={handleIconClick}>Show Source Code</button>

    {showCode && (
        <div className="code-editor-container">
          {Files.map((File, index) => 
            <>
              <div className="FileName">{(index+1)+".\t"+FileName[index]}</div>
              {FileName[index].includes("json") ?
                <>
                  <Editor
                  height="500px"
                  language="json"
                  theme="vs-dark"
                  value={File}
                  className="editor"
                  />
                  <hr />
                </>
                :
                FileName[index].includes("css") ?
                <>
                  <Editor
                  height="500px"
                  language="css"
                  theme="vs-dark"
                  value={File}
                  className="editor"
                  />
                  <hr />
                </>
                  :
                  FileName[index].includes("html") ?
                  <>
                    <Editor
                    height="500px"
                    language="html"
                    theme="vs-dark"
                    value={File}
                    className="editor"
                    />
                    <hr />
                  </>
                    :
                  <>
                    <Editor
                    height="500px"
                    language="javascript"
                    theme="vs-dark"
                    value={File}
                    className="editor"
                    />
                    <hr />
                  </>
              }    

            </>)
          }
        <button type="button" className="btn btn-danger" onClick={handleCloseEditor}>Close Editor</button>
      </div>
    )}
  </div>
  );
}
export default CodeViewer;