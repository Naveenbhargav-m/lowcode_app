

import { executeElementEvent } from "../../events_engine/events_class";
import { DynamicWrapper } from "../dynamic_wrappers";
import { Text, Number, TextArea, ProgressBar, Avatar, AvatarGroup, Dropdown, Button, Image, Badge, Icon, IconButton } from "./primitivies";
// primitiveMapper.js - Updated sections




// Updated renderPrimitiveElement function
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
    return <div>No element selected</div>;
  }

  // Pass the full element data to components
  const commonProps = {
    config: configObj,
    element: data // Pass the full element for event handling
  };

  switch (data.title) {
    case "text":
      return (
        <DynamicWrapper config={commonProps.config} value={data} element={commonProps.element}>
        {(dynamicValue) => (
          <span style={{...commonProps.config["style"]}}>{dynamicValue}</span>
        )}
      </DynamicWrapper>
      );
      
    case "number":
      return (
          <Number
            value={42}
            {...commonProps}
          />
      );

    case "text_area":
      return (
        <DynamicWrapper config={commonProps.config} value={data} element={commonProps.element}>
        {(dynamicValue) => (
          <textarea 
            style={{...commonProps.config["style"]}} 
            value={dynamicValue}
            onChange={(e) => executeElementEvent(commonProps.element, 'onChange', { 
              // @ts-ignore
              value: e.target.value, 
              originalEvent: e 
            })}
          />
        )}
      </DynamicWrapper>
      );

    case "progress_bar":
      return (
          <ProgressBar
            value={50}
            {...commonProps}
          />
      );

    case "avatar":
      return (
          <Avatar
            {...commonProps}
          />
      );

    case "avatar_group":
      return (
          <AvatarGroup
            avatars={[]}
            {...commonProps}
          />
      );

    case "drop_down":
      return (
          <Dropdown
            value=""
            config={{
              ...configObj, 
              "options": [
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]
            }}
          />
      );

    case "button":
      console.log("config for button:", commonProps, data);
      return (
        <DynamicWrapper config={commonProps.config} value={data} element={commonProps.element}>
        {(dynamicValue) => (
          <button style={{...commonProps.config["style"]}}>{dynamicValue.value}</button>
        )}
      </DynamicWrapper>
      );

    case "image":
      return (
          <Image
            src={data}
            {...commonProps}
          />
      );

    case "badge":
      return (
          <Badge
            value="Badge"
            {...commonProps}
          />
      );

    case "icon":
      return (
          <Icon
            name="menu"
            {...commonProps}
          />
      );

    case "icon_button":
      return (
          <IconButton
            icon="mouse-pointer"
            {...commonProps}
          />
      );

    default:
      return null;
  }
};
