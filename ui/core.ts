import * as T from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/pipeable";

import { configSet, usePackages } from "../lib";

const font = "monospace";
export const init = pipe(
  configSet('editor', {
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: false,
    cursorStyle: "line-thin",
    cursorSurroundingLines: 10,
    fontLigatures: true,
    fontWeight: "500",
    "hover.delay": 150,
    insertSpaces: true,
    lineHeight: 23,
    lineNumbers: "relative",
    "minimap.enabled": true,
    "minimap.maxColumn": 400,
    "minimap.renderCharacters": false,
    "minimap.scale": 2,
    "minimap.showSlider": "always",
    renderIndentGuides: true,
    renderLineHighlight: "all",
    renderWhitespace: "none",
    rulers: [80],
    showFoldingControls: "mouseover",
    smoothScrolling: true,
    suggestFontSize: 12,
    suggestLineHeight: 22,
    suggestSelection: "first"

  }),
  T.chain(() =>
    configSet('terminal.integrated',
      {
        cursorStyle: "line",
        drawBoldTextInBrightColors: false,
        experimentalRefreshOnResume: true,
        fontFamily: font,
        fontSize: 10

      }

    )
  ),
  T.chain(() => configSet('window', {
    "list.horizontalScrolling": true,
    titleBarStyle: "custom",
    "tree.indent": 8,
    zoomLevel: 3

  })),
  T.chain(() => configSet('workbench', {
    "editor.showTabs": true,
    "list.automaticKeyboardNavigation": true,
    "list.horizontalScrolling": true,
    "tree.indent": 8
  })),
  T.chain(() =>
    usePackages(
      "usernamehw.errorlens",
      "kruemelkatze.vscode-dashboard",
      "fabiospampinato.vscode-statusbar-debugger",
      "amos402.scope-bar",
      "natqe.reload",
      "ibm.output-colorizer"
    )
  )
);
