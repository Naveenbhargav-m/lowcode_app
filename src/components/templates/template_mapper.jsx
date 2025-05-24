import { effect, signal } from "@preact/signals";
import { renderPrimitiveElement } from "../primitives/primitiveMapper";
import { renderContainer } from "../containers/containers_mapper";
import DataTable from "./table";


export function renderTemplate(layoutItem, dropCallBack, activeSignal) {

    const renderChildren = (children) =>
      children.map((child, ind) => (
          <div style={{ display: "contents" }}>
            {(child.type === "container" || child.type === "modal") ? (
                renderContainer(child, dropCallBack)
            ) : (
              renderPrimitiveElement(child)
            )}
          </div>
      ));
  
    switch (layoutItem["type"]) {
      case "table":
        return <DataTable />;
    default:
        return <div>Unknown Container</div>;
    }
  }