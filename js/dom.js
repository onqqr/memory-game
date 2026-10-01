export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) {
      continue;
    }

    if (key === "className") {
      node.className = String(value);
      continue;
    }

    if (key === "text") {
      node.textContent = String(value);
      continue;
    }

    if (key === "dataset" && typeof value === "object") {
      for (const [dataKey, dataValue] of Object.entries(value)) {
        node.dataset[dataKey] = String(dataValue);
      }
      continue;
    }

    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      node.addEventListener(eventName, value);
      continue;
    }

    if (key in node && key !== "list") {
      try {
        node[key] = value;
        continue;
      } catch(error) {
        console.error(error);
        throw error;
      }
    }

    node.setAttribute(key, value === true ? "" : String(value));
  }

  for (const child of children) {
    if (child == null || child === false) {
      continue;
    }
    node.append(typeof child === "string" ? document.createTextNode(child) : child);
  }

  return node;
}

export function clearChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
