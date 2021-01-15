function getPipelineFromDOM(codeLines: HTMLCollectionOf<Element> | undefined) {
  if (codeLines === undefined) {
    return undefined;
  }

  let jsonString = "";
  for (const line of codeLines) {
    jsonString += line.textContent;
  }

  try {
    const pipelineJSON = JSON.parse(jsonString);
    if (
      pipelineJSON.doc_type === "pipeline" &&
      pipelineJSON.version === "3.0"
    ) {
      return pipelineJSON;
    }
  } catch {}

  return undefined;
}

export default getPipelineFromDOM;
