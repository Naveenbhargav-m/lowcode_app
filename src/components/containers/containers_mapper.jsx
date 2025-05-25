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
    // case "model":
    //   return <PopupModal {...layoutItem}>
    //      <RenderChildren 
    //           childrenElements={childElements}
    //           ElementsMap={ElementsMap}
    //           />
    //   </PopupModal>;
    // case "hover_card":
    //   return <HoverModal {...layoutItem}>
    //      <RenderChildren 
    //           childrenElements={childElements}
    //           ElementsMap={ElementsMap}
    //           />
    //   </HoverModal>;
    // case "side_drawer":
    //   return <Drawer {...layoutItem}>
    //      <RenderChildren  
    //           childrenElements={childElements}
    //           ElementsMap={ElementsMap}
    //           />
    //   </Drawer>
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




/*

{
    "children": [],
    "configs": {
        "events": {
            "childrenCode": {
                "actions": [],
                "code": ""
            },
            "onClick": {
                "actions": [
                    {
                        "description": "",
                        "formId": "",
                        "modal": false,
                        "type": "show_form",
                        "value": [
                            "forms.1"
                        ]
                    }
                ],
                "code": ""
            },
            "onDoubleClick": {
                "actions": [],
                "code": ""
            },
            "onHover": {
                "actions": [],
                "code": ""
            },
            "onHoverEnter": {
                "actions": [],
                "code": ""
            },
            "onHoverLeave": {
                "actions": [],
                "code": ""
            },
            "valueCode": {
                "actions": [],
                "code": ""
            }
        },
        "style": {
            "alignItems": "center",
            "backgroundColor": "#007BFF",
            "border": "none",
            "borderRadius": "4px",
            "color": "#fff",
            "cursor": "pointer",
            "display": "inline-flex",
            "fontSize": "0.9em",
            "justifyContent": "center",
            "padding": "8px 16px"
        }
    },
    "id": "nE8Ai9fFmN",
    "order": 2,
    "parent": "OYi6xxL0gW",
    "parent_container": {
        "height": 0,
        "width": 0
    },
    "template": "element",
    "title": "button",
    "type": "primitive",
    "value": "Cick meee"
}

see this is part of lowcode tool , that allowes dynamic ui etc.
i want a events engine , that takes the events from config . 
and exectutes the actions, if code is there then executes the code , using function constructor. 
and takes the actions out of it and execute. 
actions can be show_form, show_drawer, navigate_page, refresh_element, trigger_workflow etc.

it should call the appropriate functions based on the actions , give me end to end code. 
it should be very light weight  , performant , easy to maintain, extend and very efficient.

you understood?

here is the ui engine for reference:

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



import { Text, Number, TextArea, ProgressBar, Avatar, AvatarGroup, Dropdown, Button, Image, Badge, Icon, IconButton } from "./primitivies";


// Function to map drop data to the correct primitive component


function ActiveWrapper({data ,children }) {
  return (
        <div style={{display:"contents"}} onClick={(e) => {
          e.stopPropagation();
        }}>
          {children}
        </div>);
}
export const renderPrimitiveElement = (data) => {
  let configs = { ...data.configs };
  let configObj = {};
  for (let key of Object.keys(data)) {
    if (key === "configs") {
      continue;
    }
    configObj[key] = data[key];
  }
  configObj = { ...configObj, ...configs };
  
  if (!data || !data.title) {
    // Return a fallback UI or null if data is missing
    return <div>No element selected</div>;
  }

  switch (data.title) {
    case "text":
      return (
       <ActiveWrapper data={data} >
        <Text
          value={"Sample Text " + data.id}
          config={{...configObj}}
        />
      </ActiveWrapper>
      );
      
    case "number":
      return (
        <ActiveWrapper data={data}>
        <Number
          value={42}
          config={{...configObj}}
        />
        </ActiveWrapper>
      );

    case "text_area":
      return (
        <ActiveWrapper data={data} >
        <TextArea
          value="Sample Text Area"
          config={{...configObj}}

        />
        </ActiveWrapper>
      );

    case "progress_bar":
      return (
        <ActiveWrapper data={data}>
        <ProgressBar
          value={50}
          config={{...configObj}}

        />
        </ActiveWrapper>
      );

    case "avatar":
      return (
        <ActiveWrapper data={data}>
        <Avatar
          // @ts-ignore
          src={data}
          config={{...configObj}}

        />
        </ActiveWrapper>
      );

    case "avatar_group":
      return (
        <ActiveWrapper data={data}>
        <AvatarGroup
          avatars={[]}
          config={{...configObj}}
        />
        </ActiveWrapper>
      );

    case "drop_down":
      return (
        <ActiveWrapper data={data}>
        <Dropdown
          value=""
          config={{...configObj, "options":[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
          ]}}
        />
        </ActiveWrapper>
      );

    case "button":
      return (
        <ActiveWrapper data={data}>
       <Button
          value="Click Me"
          config={{...configObj}}

        />
        </ActiveWrapper>
      );

    case "image":
      return (
        <ActiveWrapper data={data} >
        <Image
          src={data}
          config={{...configObj}}

        />
        </ActiveWrapper>
      );

    case "badge":
      return (
        <ActiveWrapper data={data} >
        <Badge
          value="Badge"
          config={{...configObj}}

        />
        </ActiveWrapper>
      );

    case "icon":
      return (
        <ActiveWrapper data={data} >
        <Icon
          name="menu"
          config={{...configObj}}

        />
        </ActiveWrapper>
      );

    case "icon_button":
      return (
        <ActiveWrapper data={data} >
        <IconButton
          icon="mouse-pointer"
          config={{...configObj}}

        />
        </ActiveWrapper>
      );

    default:
      return null;
  }
};


const useDynamicConfig = (initialConfig, initialValue) => {
  const config = signal(initialConfig);
  const value = signal(initialValue);

  effect(() => {
    // const keys = variableKeys.peek();
    // let datamap = {};

    // for (const key of keys) {
    //   const variableEntry = variableMap[key];
    //   if (variableEntry && variableEntry.value !== undefined) {
    //     datamap[key] = variableEntry.value;
    //   }
    // }

    // const newStyles = FunctionExecutor(datamap, config.value.styleCode);
    // config.value.style = { ...config.value.style, ...newStyles };

    // const newValue = FunctionExecutor(datamap, config.value.valueCode);
    // if (newValue && newValue.value !== undefined && newValue.value !== null) {
    //   value.value = newValue.value;
    // }
  });
  return { config, value };
};

// Reusable wrapper component
export const DynamicWrapper = ({ children, config, value }) => {
  const { config: dynamicConfig, value: dynamicValue } = useDynamicConfig(config, value);

  const handleAction = (actionType) => (e) => {
    // // e.stopPropagation();
    // ActionExecutor(dynamicConfig.value.id, actionType);
    // if (actionType === "onClick" && dynamicConfig.value.actions?.onClick) {
    //   const clickAction = FunctionExecutor({}, dynamicConfig.value.actions.onClick);
    //   if (clickAction?.show_form !== undefined) {
    //     showFormPopup.value = clickAction.show_form;
    //   }
    // }
  };
  return (
      <div
        // style={{ display: "contents" }}
        onClick={handleAction("onClick")}
        onDblClick={handleAction("onDoubleClick")}
        onMouseEnter={handleAction("onHoverEnter")}
        onMouseLeave={handleAction("onHoverLeave")}
      >
        {children(dynamicValue?.value ?? {}, dynamicConfig?.value ?? {})}
      </div>
    );
};


// Refactored Button Component
export const Button = ({ value, config }) => (
  <DynamicWrapper config={config} value={value}>
    {(dynamicValue) => (
      <button style={{...config["style"]}}>{dynamicValue}</button>
    )}
  </DynamicWrapper>
);

just give me the parts in ui renderer to edit not needed reimplementing everything.
and the executor engine .

and is my ui engine fine or it can vbe optimized?

*/