import sanitize from "sanitize-html";

export const sanitizeData = (data: any) => {
  if (!data || typeof data !== "object") {
    return false;
  }
  
  let hasScript = false;

  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "string") {
      data[key] = data[key].replace(/\$/g, "");
      const sanitizedValue = sanitize(data[key], {
        allowedTags: [],
        allowedAttributes: {},
        disallowedTagsMode: 'discard'
      });
      if (sanitizedValue.includes("<script>")) {
        hasScript = true;
      }
      data[key] = sanitizedValue;
    }
  });

  return hasScript;
};
