/*
 * Copyright 2018-2023 Elyra Authors
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
import { useEffect, useRef } from "react";

import { CommonCanvas, CanvasController } from "@elyra/canvas";
import { IntlProvider } from "react-intl";

import useBlockIntrusiveCanvasEvents from "./useBlockIntrusiveCanvasEvents";
import classes from "./styles.module.css";

interface Props {
  pipeline: IPipeline;
}

const NODE_SVG_PATH =
  "M 0 0 h 160 a 6 6 0 0 1 6 6 v 28 a 6 6 0 0 1 -6 6 h -160 a 6 6 0 0 1 -6 -6 v -28 a 6 6 0 0 1 6 -6 z";

function PipelineView({ pipeline }: Props) {
  const controller = useRef(new CanvasController());

  useEffect(() => {
    controller.current.setPipelineFlow(pipeline);
  }, [pipeline]);

  const ref = useBlockIntrusiveCanvasEvents();

  return (
    <div className={classes.root} ref={ref}>
      <IntlProvider locale="en">
        <CommonCanvas
          canvasController={controller.current}
          contextMenuHandler={() => {}}
          editActionHandler={() => {
            controller.current.setPipelineFlow(pipeline);
          }}
          toolbarConfig={[]}
          config={{
            enableInternalObjectModel: false,
            enablePaletteLayout: "None",
            enableNodeFormatType: "Horizontal",
            enableToolbarLayout: "None",
            enableNodeLayout: {
              bodyPath: NODE_SVG_PATH,
              selectionPath: NODE_SVG_PATH,
            },
          }}
        />
      </IntlProvider>
    </div>
  );
}

export default PipelineView;
