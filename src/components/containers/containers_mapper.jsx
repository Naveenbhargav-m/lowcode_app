import { renderPrimitiveElement } from "../primitives/primitiveMapper";
import { Card, GridView, Row, Column, Container, ListView, ScrollArea, Carousel } from "./container_components";
import { effect, signal } from '@preact/signals';
import { renderTemplate } from "../templates/template_mapper";


function RenderChildren({ childrenElements, ElementsMap}) {
  
  return (
    <div>
     {
      childrenElements.map((child, ind) => {
        console.log("child:",child);
        return(
          <div>
          {(child.type === "container" || child.type === "modal") ? (
              renderContainer(child, ElementsMap)
          ) : child.type === "template"  ? (renderTemplate(child)) : 
          renderPrimitiveElement(child)}
        </div>
        );
      })
     }
     </div>
  );
}



export function renderContainer(layoutItem, ElementsMap) {
  console.log("in renderContainer", layoutItem);
  layoutItem.configs["id"] = layoutItem.id;
  const { title, children } = layoutItem;
  let childrenSignal = signal(children);
  let childElements = childrenSignal.value.map(childId => ElementsMap[childId]);
  switch (title) {
    case "card":
      return <Card {...layoutItem}>
              <RenderChildren 
              childrenElements={childElements}
              ElementsMap={ElementsMap}
              />
            </Card>;
    case "grid_view":
      return <GridView {...layoutItem}>
              <RenderChildren 
                    childrenElements={childElements}
                    ElementsMap={ElementsMap}
                    />
            </GridView>;
    case "container":
      return <Container {...layoutItem}>
           <RenderChildren 
              childrenElements={childElements}
              ElementsMap={ElementsMap}
              />
          </Container>;
    case "list_view":
      return <ListView {...layoutItem}>
         <RenderChildren 
              childrenElements={childElements}
              ElementsMap={ElementsMap}
              />
      </ListView>;
    case "row":
      return <Row {...layoutItem}>
         <RenderChildren 
              childrenElements={childElements}
              ElementsMap={ElementsMap}
              />
      </Row>;
    case "column":
      return <Column {...layoutItem}>
         <RenderChildren 
              childrenElements={childElements}
              ElementsMap={ElementsMap}
              />
      </Column>;
    case "scroll_area":
      return <ScrollArea {...layoutItem}>
         <RenderChildren 
              childrenElements={childElements}
              ElementsMap={ElementsMap}
              />
      </ScrollArea>;
    case "carousel":
      return <Carousel {...layoutItem}>
         <RenderChildren 
              childrenElements={childElements}
              ElementsMap={ElementsMap}
              />
      </Carousel>;
    case "user_template":
      console.log("came to user template:",layoutItem, childElements, ElementsMap);
      return (
          <Card {...layoutItem}>
          <RenderChildren 
            childrenElements={childElements}
            ElementsMap={ElementsMap}
          />
          </Card>
      );
    default:
      return <div>Unknown Container</div>;
  }
}
