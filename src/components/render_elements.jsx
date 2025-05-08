import { renderContainer } from "./containers/containers_mapper";
import { renderPrimitiveElement } from "./primitives/primitiveMapper";
import { renderTemplate } from "./templates/template_mapper";

function RenderElement(item, viewType, ElementsMap) {
    if (item.type === "container" || item.type === "modal") {
      return (
          renderContainer(item, ElementsMap)
      );
    } else if (item.type === "template") {
      return (
          renderTemplate(item)
      );
    } else if(item.type === "user_template") {
      return (
          renderContainer(item, ElementsMap)
      );
    }
    return renderPrimitiveElement(item);
  }
  

export {RenderElement};