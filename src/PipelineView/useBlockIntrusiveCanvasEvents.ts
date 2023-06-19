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

function blockIntrusiveCanvasEvents(e: Event) {
  e.stopPropagation();
}

function useBlockIntrusiveCanvasEvents() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    // Setting `capture` to `true` will capture the event before drilling
    // through the DOM nodes to our target. This is what allows us to block the
    // event. Since we are stoping propagation, we must have `passive` set to
    // `false`.
    const options = { passive: false, capture: true };
    el?.addEventListener("contextmenu", blockIntrusiveCanvasEvents, options);
    el?.addEventListener("wheel", blockIntrusiveCanvasEvents, options);

    // The canvas steals focus on mount, which causes a jarring scroll to the
    // element. Scrolling to (0, 0) seems to prevent that, but this is really
    // just a bandaid on the issue and could have unintended effects.
    window.scrollTo(0, 0);

    return () => {
      el?.removeEventListener("contextmenu", blockIntrusiveCanvasEvents);
      el?.removeEventListener("wheel", blockIntrusiveCanvasEvents);
    };
  }, []);

  return ref;
}

export default useBlockIntrusiveCanvasEvents;
