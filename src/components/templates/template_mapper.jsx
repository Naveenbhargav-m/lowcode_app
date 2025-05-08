import { effect, signal } from "@preact/signals";
import { FunctionExecutor } from "../../states/common_actions";
import { variableKeys, variableMap } from "../../states/global_state";
import { activeElement, handleDrop, screenElements } from "../../screen_builder/screen_state";
import { Drop } from "../custom/Drop";
import { renderPrimitiveElement } from "../primitives/primitiveMapper";
import { renderContainer } from "../containers/containers_mapper";
import DataTable from "./table";


export function renderTemplate(layoutItem, dropCallBack, activeSignal) {

    layoutItem.configs["i"] = layoutItem.i;
    const { title, children } = layoutItem;
    let childrenSignal = signal(children);
    effect(() => {
      const keys = variableKeys.peek();
      let datamap = {};
  
      for (const key of keys) {
        const variableEntry = variableMap[key];
        if (variableEntry && variableEntry.value !== undefined) {
          datamap[key] = variableEntry.value;
        }
      }
      datamap["children"] = children;
      const newValue = FunctionExecutor(datamap, layoutItem.childrenCode);
      if(newValue !== undefined && newValue.children !== undefined && newValue.children !== null) {
        childrenSignal.value = newValue.children;
      }
    });
    let childElements = childrenSignal.value.map(childId => screenElements[childId]?.value);
    const renderChildren = (children) =>
      children.map((child, ind) => (
          <div style={{ display: "contents" }} onClick={() => { activeElement.value = child.i }}>
            {(child.type === "container" || child.type === "modal") ? (
              <Drop onDrop={(data) => dropCallBack(data, child.i)} dropElementData={{ element: child.i }}>
                {renderContainer(child, dropCallBack, activeSignal)}
              </Drop>
            ) : (
              renderPrimitiveElement(child, activeSignal)
            )}
          </div>
      ));
  
    switch (title) {
      case "table":
        return <DataTable />;
    default:
        return <div>Unknown Container</div>;
    }
  }