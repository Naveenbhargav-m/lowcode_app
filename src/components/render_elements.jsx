import { useSignal } from "@preact/signals";
import { renderContainer } from "./containers/containers_mapper";
import { renderPrimitiveElement } from "./primitives/primitiveMapper";
import { renderTemplate } from "./templates/template_mapper";
import { useEffect, useState } from "preact/hooks";
import { ActiveScreen, ActiveScreenView, ScreenRendererFlag } from "../state/screen_state";

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



export function RendererComponent() {
  const [elements , setElements] = useState({});
  let style = {};
  let outerDivStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#f9f9f9",
    border: "1px solid #e0e0e0",
    overflow: "auto",
    padding: "10px",
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
  };


  // Reactive: Compute items from `screenElements` - Same as MobileView
  const items = useSignal([]);
  useEffect(() => {
    console.log("Desktop rerendering:", ActiveScreen.value);
    let screenConfig = ActiveScreen.value || {};
    let screenElements = screenConfig[ActiveScreenView.value] || {};
    const elementsArray = Object.values(screenElements);
    const filteredItems = elementsArray.filter((item) => !item.parent);
    const sortedItems = filteredItems.sort((a, b) => {
                          const orderA = a.order ?? Infinity;
                          const orderB = b.order ?? Infinity;
                          return orderA - orderB;});
    console.log("Desktop sorted Items before rendering:", sortedItems);
    items.value = sortedItems;
    setElements(screenElements);
  }, [ActiveScreen.value, ActiveScreenView.value, ScreenRendererFlag.value]);

  function SortItems(items, newItems) {
    const itemMap = new Map(items.map((item) => [item.id, item]));
    let sortedItems = newItems.map(({ id }) => itemMap.get(id)).filter(Boolean);
    console.log("Desktop sorted Items after first sort:", sortedItems);
    return sortedItems;
  }

  return (
      <div style={{ ...outerDivStyle }} className="scrollbar-hide">
        {
           items.value.map((item) => {
            if (!item.parent) {
              return (<div key={item.id}>
                {RenderElement(item, item.type, elements)}
                </div>);
            }
          })
        }
      </div>
  );
}
  

export {RenderElement};