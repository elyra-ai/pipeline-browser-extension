/*
 * Copyright 2018-2021 Elyra Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from "react";
import ReactDOM from "react-dom";

import PipelineView from "./PipelineView";
import samplePipeline from "./sample-pipeline";
import getPipelineFromDOM from "./utils/get-pipeline-from-dom";

import "../node_modules/@elyra/canvas/dist/styles/common-canvas.min.css";
import "./canvas-overrides.css";

interface Options {
  mode: "dev";
}

function run(options?: Options) {
  // If we are in dev mode we will just be rendering a sample pipeline with
  // dummy styles on a blank page. This will be servered at localhost:3000 with
  // hot reloading for quicker development.
  if (options?.mode === "dev") {
    ReactDOM.render(
      <React.StrictMode>
        <PipelineView pipeline={samplePipeline} />
      </React.StrictMode>,
      document.getElementById("root")
    );
    return;
  }

  // GitHub stores each line of the pipeline JSON across many table rows. We
  // don't have to query for both `.blob-wrapper` and `.blob-code`, but it makes
  // me more confortable that all the code lines are part of a group. This could
  // be beneficial if there are more than one `.blob-wrapper` on the page.
  // Additionally, we will store the rendered pipeline in the `.blob-wrapper`.
  //
  // NOTE: This relies on GitHub's class names so is a bit brittle and could
  // break in the future.
  const blobWrapper = document.getElementsByClassName("blob-wrapper")[0];
  const codeLines = blobWrapper?.getElementsByClassName("blob-code");

  // Extract the pipeline JSON from a list of DOM nodes.
  const pipeline = getPipelineFromDOM(codeLines);

  // If no pipeline was found, send a message to the chrome extension's
  // background service. The background service will set the icon to the
  // "deactivated" mode (dim b/w icon).
  if (pipeline === undefined) {
    chrome.runtime.sendMessage({ hasDetectedPipeline: false });
    return;
  }

  // Pipeline was found, send a message to the chrome extension's
  // background service. The background service will set the icon to the
  // "active" mode (bright primary color icon).
  chrome.runtime.sendMessage({ hasDetectedPipeline: true });

  // Render the pipeline into the `.blob-wrapper`
  ReactDOM.render(
    <React.StrictMode>
      <PipelineView pipeline={pipeline} />
    </React.StrictMode>,
    blobWrapper
  );
}

if (process.env.NODE_ENV === "development") {
  // Running `yarn start` will start in dev mode.
  run({ mode: "dev" });
} else {
  // Wait for the page to load. This message is sent from our background service
  // which listens from tab updates. This will also be triggered whenever a page
  // changes in an SPA (single page app), which isn't triggered in the
  // traditional `content_scripts` lifecycle.
  chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
    if (msg === "page-load-complete") {
      run();
    }
  });
}
