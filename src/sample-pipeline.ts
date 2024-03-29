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
const pipeline: IPipeline = {
  doc_type: "pipeline",
  version: "3.0",
  json_schema:
    "http://api.dataplatform.ibm.com/schemas/common-pipeline/pipeline-flow/pipeline-flow-v3-schema.json",
  id: "f667f909-35de-468d-a87d-be030ed4998f",
  primary_pipeline: "405ee603-c87e-4658-bf72-9b5afa0b7dfc",
  pipelines: [
    {
      id: "405ee603-c87e-4658-bf72-9b5afa0b7dfc",
      nodes: [
        {
          id: "c88d9c0b-a5d5-45ab-88d6-eb6ce24ffdbb",
          type: "execution_node",
          op: "execute-notebook-node",
          app_data: {
            filename: "load_data.ipynb",
            runtime_image: "amancevice/pandas:1.0.3",
            env_vars: [
              "DATASET_URL=https://dax-cdn.cdn.appdomain.cloud/dax-noaa-weather-data-jfk-airport/1.1.4/noaa-weather-data-jfk-airport.tar.gz",
            ],
            include_subdirectories: false,
            outputs: ["data/noaa-weather-data-jfk-airport/jfk_weather.csv"],
            invalidNodeError: null,
            ui_data: {
              label: "load_data",
              image:
                "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20viewBox%3D%220%200%2022%2022%22%3E%0A%20%20%3Cg%20class%3D%22jp-icon-warn0%20jp-icon-selectable%22%20fill%3D%22%23EF6C00%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M18.7%203.3v15.4H3.3V3.3h15.4m1.5-1.5H1.8v18.3h18.3l.1-18.3z%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M16.5%2016.5l-5.4-4.3-5.6%204.3v-11h11z%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A",
              x_pos: 60.70574951171875,
              y_pos: 230.04904174804688,
              description: "Notebook file",
            },
          },
          inputs: [
            {
              id: "inPort",
              app_data: {
                ui_data: {
                  cardinality: {
                    min: 0,
                    max: 1,
                  },
                  label: "Input Port",
                },
              },
            },
          ],
          outputs: [
            {
              id: "outPort",
              app_data: {
                ui_data: {
                  cardinality: {
                    min: 0,
                    max: -1,
                  },
                  label: "Output Port",
                },
              },
            },
          ],
        },
        {
          id: "e07e1b7f-568b-4bc3-9fc6-da372fd58daf",
          type: "execution_node",
          op: "execute-notebook-node",
          app_data: {
            filename: "Part 1 - Data Cleaning.ipynb",
            runtime_image: "amancevice/pandas:1.0.3",
            env_vars: [],
            include_subdirectories: false,
            outputs: [
              "data/noaa-weather-data-jfk-airport/jfk_weather_cleaned.csv",
            ],
            dependencies: [],
            invalidNodeError: null,
            ui_data: {
              label: "Part 1 - Data Cleaning",
              image:
                "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20viewBox%3D%220%200%2022%2022%22%3E%0A%20%20%3Cg%20class%3D%22jp-icon-warn0%20jp-icon-selectable%22%20fill%3D%22%23EF6C00%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M18.7%203.3v15.4H3.3V3.3h15.4m1.5-1.5H1.8v18.3h18.3l.1-18.3z%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M16.5%2016.5l-5.4-4.3-5.6%204.3v-11h11z%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A",
              x_pos: 331.4868469238281,
              y_pos: 299.0490417480469,
              description: "Notebook file",
            },
          },
          inputs: [
            {
              id: "inPort",
              app_data: {
                ui_data: {
                  label: "",
                },
              },
              links: [
                {
                  id: "d2a3bd2c-fc0c-47e2-a343-6ae74d76b891",
                  node_id_ref: "c88d9c0b-a5d5-45ab-88d6-eb6ce24ffdbb",
                  port_id_ref: "outPort",
                },
              ],
            },
          ],
          outputs: [
            {
              id: "outPort",
              app_data: {
                ui_data: {
                  label: "",
                },
              },
            },
          ],
        },
        {
          id: "982e672a-4ae5-4608-bcb0-ce309868415a",
          type: "execution_node",
          op: "execute-notebook-node",
          app_data: {
            filename: "Part 2 - Data Analysis.ipynb",
            runtime_image: "amancevice/pandas:1.0.3",
            env_vars: [],
            include_subdirectories: false,
            dependencies: [],
            invalidNodeError: null,
            ui_data: {
              label: "Part 2 - Data Analysis",
              image:
                "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20viewBox%3D%220%200%2022%2022%22%3E%0A%20%20%3Cg%20class%3D%22jp-icon-warn0%20jp-icon-selectable%22%20fill%3D%22%23EF6C00%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M18.7%203.3v15.4H3.3V3.3h15.4m1.5-1.5H1.8v18.3h18.3l.1-18.3z%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M16.5%2016.5l-5.4-4.3-5.6%204.3v-11h11z%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A",
              x_pos: 645,
              y_pos: 221.78109741210938,
              description: "Notebook file",
            },
          },
          inputs: [
            {
              id: "inPort",
              app_data: {
                ui_data: {
                  label: "",
                },
              },
              links: [
                {
                  id: "45c53974-acbb-4782-a8ff-96c5b37f8db6",
                  node_id_ref: "e07e1b7f-568b-4bc3-9fc6-da372fd58daf",
                  port_id_ref: "outPort",
                },
              ],
            },
          ],
          outputs: [
            {
              id: "outPort",
              app_data: {
                ui_data: {
                  label: "",
                },
              },
            },
          ],
        },
        {
          id: "b00e4654-a2b0-417c-8f93-8a03bec95945",
          type: "execution_node",
          op: "execute-notebook-node",
          app_data: {
            filename: "Part 3 - Time Series Forecasting.ipynb",
            runtime_image: "amancevice/pandas:1.0.3",
            env_vars: [],
            include_subdirectories: false,
            dependencies: [],
            invalidNodeError: null,
            ui_data: {
              label: "Part 3 - Time Series Forecasting",
              image:
                "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20viewBox%3D%220%200%2022%2022%22%3E%0A%20%20%3Cg%20class%3D%22jp-icon-warn0%20jp-icon-selectable%22%20fill%3D%22%23EF6C00%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M18.7%203.3v15.4H3.3V3.3h15.4m1.5-1.5H1.8v18.3h18.3l.1-18.3z%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M16.5%2016.5l-5.4-4.3-5.6%204.3v-11h11z%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A",
              x_pos: 639.7548217773438,
              y_pos: 372.5849304199219,
              description: "Notebook file",
            },
          },
          inputs: [
            {
              id: "inPort",
              app_data: {
                ui_data: {
                  label: "",
                },
              },
              links: [
                {
                  id: "b73a2229-4c84-40a5-93c0-f22c7a778a8a",
                  node_id_ref: "e07e1b7f-568b-4bc3-9fc6-da372fd58daf",
                  port_id_ref: "outPort",
                },
              ],
            },
          ],
          outputs: [
            {
              id: "outPort",
              app_data: {
                ui_data: {
                  label: "",
                },
              },
            },
          ],
        },
      ],
      app_data: {
        ui_data: {
          comments: [
            {
              id: "3dbedb9d-0dc2-438d-aefe-08819755d00f",
              x_pos: 49,
              y_pos: 101,
              width: 199,
              height: 47,
              class_name: "d3-comment-rect",
              content:
                "Download the JFK Weather dataset archive and extract it",
              associated_id_refs: [
                {
                  node_ref: "c88d9c0b-a5d5-45ab-88d6-eb6ce24ffdbb",
                  class_name: "d3-comment-link",
                },
              ],
            },
            {
              id: "74f3d44b-fef4-4d8c-98ef-6c24876c61ef",
              x_pos: 386,
              y_pos: 119,
              width: 175,
              height: 45,
              class_name: "d3-comment-rect",
              content: "Clean the dataset",
              associated_id_refs: [
                {
                  node_ref: "e07e1b7f-568b-4bc3-9fc6-da372fd58daf",
                  class_name: "d3-comment-link",
                },
              ],
            },
            {
              id: "2fcbdf51-2462-4866-96f5-5275b4d0ada1",
              x_pos: 715,
              y_pos: 150,
              width: 175,
              height: 42,
              class_name: "d3-comment-rect",
              content: " Analyze the dataset",
              associated_id_refs: [
                {
                  node_ref: "982e672a-4ae5-4608-bcb0-ce309868415a",
                  class_name: "d3-comment-link",
                },
              ],
            },
            {
              id: "1682fab5-137e-40d2-a841-27f91692ae48",
              x_pos: 645,
              y_pos: 473,
              width: 175,
              height: 55,
              class_name: "d3-comment-rect",
              content: "Explore approaches to predicting future temperatures ",
              associated_id_refs: [
                {
                  node_ref: "b00e4654-a2b0-417c-8f93-8a03bec95945",
                  class_name: "d3-comment-link",
                },
              ],
            },
          ],
        },
        version: 3,
      },
      runtime_ref: "",
    },
  ],
  schemas: [],
};

export default pipeline;
