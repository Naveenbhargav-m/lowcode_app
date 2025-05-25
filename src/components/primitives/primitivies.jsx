import { effect, signal } from '@preact/signals';
import DynamicIcon from '../custom/dynamic_icon';
import { DynamicWrapper } from '../dynamic_wrappers';





// Refactored Button Component
export const Button = ({ value, config }) => (
  <DynamicWrapper config={config} value={value} element={config}>
    {(dynamicValue) => (
      <button style={{...config["style"]}}>{dynamicValue}</button>
    )}
  </DynamicWrapper>
);

// Refactored Text Component
export function Text({ value, config }) {
  return (
    <DynamicWrapper config={config} value={value} element={config}>
    {(dynamicValue) => (
      <p style={config.style}>{dynamicValue}</p>
    )}
  </DynamicWrapper>
);
};

// Refactored Number Component
export const Number = ({ value, config }) => (
  <DynamicWrapper config={config} value={value} element={config}>
    {(dynamicValue) => (
      <span style={config.style}>{dynamicValue}</span>
    )}
  </DynamicWrapper>
);

// Refactored TextArea Component
export const TextArea = ({ value, config }) => (
  <DynamicWrapper config={config} value={value} element={config}>
    {(dynamicValue) => (
      <textarea style={config.style}>{dynamicValue}</textarea>
    )}
  </DynamicWrapper>
);


// Refactored IconButton Component
export const IconButton = ({ icon, config }) => (
  <DynamicWrapper config={config} value={icon} element={config}>
    {(dynamicValue) => (
      <button style={{...config["style"]}}>
        <DynamicIcon name={dynamicValue} size={config.style?.iconSize} />
      </button>
    )}
  </DynamicWrapper>
);

// Refactored Image Component
export const Image = ({ src, config }) => (
  <DynamicWrapper config={config} value={src} element={config}>
    {(dynamicValue) => (
      <img src={dynamicValue} alt="" style={config.style} />
    )}
  </DynamicWrapper>
);

// Refactored Avatar Component
export function Avatar({config }) {
    return (
      <DynamicWrapper config={config} value={config["value"]} element={config}>
    {(dynamicValue) => {
      return <img src={dynamicValue} alt="" style={{ ...config.style, borderRadius: "50%" }} />
    }}
  </DynamicWrapper>
    );
}
// Refactored Badge Component
export const Badge = ({ value, config }) => (
  <DynamicWrapper config={config} value={value} element={config}>
    {(dynamicValue) => (
      <span style={{...config["style"]}}>{dynamicValue}</span>
    )}
  </DynamicWrapper>
);


export const Dropdown = ({ value, config }) => {
  return (
    <DynamicWrapper config={config} value={value} element={config}>
    {(dynamicValue) => (
      <select
      style={config.style}
      onChange={(e) => {
        e.stopPropagation();
        value.value = e.target["value"];
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

export const ProgressBar = ({ value, config }) => {
  return (
    <DynamicWrapper config={config} value={value} element={config}>
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
    <DynamicWrapper config={config} value={active} element={config}>
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
    <DynamicWrapper config={config} value={avatars} element={config}>
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
    <DynamicWrapper config={config} value={name} element={config}>
      {(dynamicValue) => (
        <span style={config["style"]}>
          <DynamicIcon name={dynamicValue} size={config["style"].size} />
        </span>
      )}
    </DynamicWrapper>
  );
};
