import { effect, signal } from '@preact/signals';
import DynamicIcon from '../custom/dynamic_icon';
import { showFormPopup, variableKeys, variableMap } from '../../states/global_state';
import { ActionExecutor, FunctionExecutor } from '../../states/common_actions';


const useDynamicConfig = (initialConfig, initialValue) => {
  const config = signal(initialConfig);
  const value = signal(initialValue);

  effect(() => {
    const keys = variableKeys.peek();
    let datamap = {};

    for (const key of keys) {
      const variableEntry = variableMap[key];
      if (variableEntry && variableEntry.value !== undefined) {
        datamap[key] = variableEntry.value;
      }
    }

    const newStyles = FunctionExecutor(datamap, config.value.styleCode);
    config.value.style = { ...config.value.style, ...newStyles };

    const newValue = FunctionExecutor(datamap, config.value.valueCode);
    if (newValue && newValue.value !== undefined && newValue.value !== null) {
      value.value = newValue.value;
    }
  });

  return { config, value };
};

// Reusable wrapper component
export const DynamicWrapper = ({ children, config, value }) => {
  const { config: dynamicConfig, value: dynamicValue } = useDynamicConfig(config, value);

  const handleAction = (actionType) => (e) => {
    // // e.stopPropagation();
    ActionExecutor(dynamicConfig.value.id, actionType);
    if (actionType === "onClick" && dynamicConfig.value.actions?.onClick) {
      const clickAction = FunctionExecutor({}, dynamicConfig.value.actions.onClick);
      if (clickAction?.show_form !== undefined) {
        showFormPopup.value = clickAction.show_form;
      }
    }
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

// Refactored Text Component
export function Text({ value, config }) {
  return (
    <DynamicWrapper config={config} value={value}>
    {(dynamicValue) => (
      <p style={config.style}>{dynamicValue}</p>
    )}
  </DynamicWrapper>
);
};

// Refactored Number Component
export const Number = ({ value, config }) => (
  <DynamicWrapper config={config} value={value}>
    {(dynamicValue) => (
      <span style={config.style}>{dynamicValue}</span>
    )}
  </DynamicWrapper>
);

// Refactored TextArea Component
export const TextArea = ({ value, config }) => (
  <DynamicWrapper config={config} value={value}>
    {(dynamicValue) => (
      <textarea style={config.style}>{dynamicValue}</textarea>
    )}
  </DynamicWrapper>
);


// Refactored IconButton Component
export const IconButton = ({ icon, config }) => (
  <DynamicWrapper config={config} value={icon}>
    {(dynamicValue) => (
      <button style={{...config["style"]}}>
        <DynamicIcon name={dynamicValue} size={config.style?.iconSize} />
      </button>
    )}
  </DynamicWrapper>
);

// Refactored Image Component
export const Image = ({ src, config }) => (
  <DynamicWrapper config={config} value={src}>
    {(dynamicValue) => (
      <img src={dynamicValue} alt="" style={config.style} />
    )}
  </DynamicWrapper>
);

// Refactored Avatar Component
export function Avatar({config }) {
    return (
      <DynamicWrapper config={config} value={config["value"]}>
    {(dynamicValue) => {
      return <img src={dynamicValue} alt="" style={{ ...config.style, borderRadius: "50%" }} />
    }}
  </DynamicWrapper>
    );
}
// Refactored Badge Component
export const Badge = ({ value, config }) => (
  <DynamicWrapper config={config} value={value}>
    {(dynamicValue) => (
      <span style={{...config["style"]}}>{dynamicValue}</span>
    )}
  </DynamicWrapper>
);


export const Dropdown = ({ value, config }) => {
  return (
    <DynamicWrapper config={config} value={value}>
    {(dynamicValue) => (
      <select
      style={config.style}
      onChange={(e) => {
        e.stopPropagation();
        value.value = e.target["value"];
        ActionExecutor(config.value.id, "onChange");
      }}
    >
      {config.options.map((option) => (
        <option value={option} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    )}
    </DynamicWrapper>
  );
};





/*
export const Text = ({ value, config }) => (
  <DynamicWrapper config={config} value={value}>
    {(dynamicValue) => (
      <p style={config.style}>{dynamicValue}</p>
    )}
  </DynamicWrapper>
);
*/


export const ProgressBar = ({ value, config }) => {
  return (
    <DynamicWrapper config={config} value={value}>
      {(dynamicValue) => (
        <div style={config.style}>
          <div
            style={{
              width: `${dynamicValue}%`,
              backgroundColor: config["style"]["color"] || "#76c7c0",
              height: "100%",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      )}
    </DynamicWrapper>
  );
};

export const Indicator = ({ active, config }) => {
  return (
    <DynamicWrapper config={config} value={active}>
      {({ style, value }) => (
        <span
          style={{
            ...style,
            backgroundColor: value ? style.activeColor || "green" : style.inactiveColor || "gray",
          }}
        />
      )}
    </DynamicWrapper>
  );
};

export const AvatarGroup = ({ avatars, config }) => {
  return (
    <DynamicWrapper config={config} value={avatars}>
      {(value , dynamicConfig) => {
        return (
        <div style={dynamicConfig["style"]}>
          {value.map((avatar, index) => (
            <img
              key={index}
              src={avatar.src}
              alt=""
              style={{
                width: dynamicConfig["style"].size || "40px",
                height: dynamicConfig["style"].size || "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: dynamicConfig["style"].border || "2px solid white",
                ...avatar.style,
              }}
            />
          ))}
        </div>);
      }}
    </DynamicWrapper>
  );
};

export const Icon = ({ name, config }) => {
  return (
    <DynamicWrapper config={config} value={name}>
      {(dynamicValue) => (
        <span style={config["style"]}>
          <DynamicIcon name={dynamicValue} size={config["style"].size} />
        </span>
      )}
    </DynamicWrapper>
  );
};
