// Reusable Button Component
// export const Button = ({ value, config }) => {
//   const buttonConfig = signal(config);
//   const buttonValue = signal(value);

//   buttonConfig.value.style = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//     width: "100%",
//     height: "100%",
//     fontSize: "clamp(8px, 2vw, 14px)",
//     whiteSpace: "nowrap",
//     ...buttonConfig.value.style,
//   };

//   function ExecuteOnClick() {
//     const clickAction = FunctionExecutor( {},config["actions"]["onClick"]);
//     if(clickAction !== undefined) {
//       if(clickAction["show_form"] !== undefined) {
//         console.log("setting show_form from button:",clickAction);
//         showFormPopup.value = clickAction["show_form"];
//       }
//     }
//   }

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }
//     const newStyles = FunctionExecutor(datamap, config.styleCode);
//     buttonConfig.value.style = { ...buttonConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       buttonValue.value = newValue.value;
//     }
//   });

//   return (
//     <button
//       style={buttonConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(buttonConfig.value.i, "onClick"); ExecuteOnClick(); }}
//       onDblClick={(e) => { e.stopPropagation(); ActionExecutor(buttonConfig.value.i, "onDoubleClick"); }}
//       onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(buttonConfig.value.i, "onHoverEnter"); }}
//       onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(buttonConfig.value.i, "onHoverLeave"); }}
//     >
//       {buttonValue.value}
//     </button>
//   );
// };

// // Reusable Text Component
// export const Text = ({ value, config }) => {
//   console.log("text configs:",config);
//   const textConfig = signal(config);
//   const textValue = signal(value);

//   textConfig.value.style = {
//     color: textConfig.value.textColor,
//     padding: textConfig.value.padding,
//     fontSize: textConfig.value.size,
//     ...textConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, textConfig.value.styleCode);
//     textConfig.value.style = { ...textConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       textValue.value = newValue.value;
//     }
//   });

//   return (
//     <div
//       style={textConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(textConfig.value.i, "onClick"); }}
//     >
//       <p>{textValue.value}</p>
//     </div>
//   );
// };

// // Reusable Number Component
// export const Number = ({ value, config }) => {
//   const numberConfig = signal(config);
//   const numberValue = signal(value);

//   numberConfig.value.style = {
//     color: numberConfig.value.textColor,
//     padding: numberConfig.value.padding,
//     fontSize: numberConfig.value.size,
//     ...numberConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, numberConfig.value.styleCode);
//     numberConfig.value.style = { ...numberConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       numberValue.value = newValue.value;
//     }
//   });

//   return (
//     <span
//       style={numberConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(numberConfig.value.i, "onClick"); }}
//     >
//       {numberValue.value}
//     </span>
//   );
// };

// // Reusable TextArea Component
// export const TextArea = ({ value, config }) => {
//   const textAreaConfig = signal(config);
//   const textAreaValue = signal(value);

//   textAreaConfig.value.style = {
//     border: `1px solid ${textAreaConfig.value.primary}`,
//     padding: textAreaConfig.value.padding,
//     width: textAreaConfig.value.w,
//     height: textAreaConfig.value.h,
//     ...textAreaConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, textAreaConfig.value.styleCode);
//     textAreaConfig.value.style = { ...textAreaConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       textAreaValue.value = newValue.value;
//     }
//   });

//   return (
//     <textarea
//       style={textAreaConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(textAreaConfig.value.i, "onClick"); }}
//       onDblClick={(e) => { e.stopPropagation(); ActionExecutor(textAreaConfig.value.i, "onDoubleClick"); }}
//       onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(textAreaConfig.value.i, "onHoverEnter"); }}
//       onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(textAreaConfig.value.i, "onHoverLeave"); }}
//     >
//       {textAreaValue.value}
//     </textarea>
//   );
// };

// Reusable Dropdown Component
// export const Dropdown = ({ value, config, options }) => {
//   const dropdownConfig = signal(config);
//   const dropdownValue = signal(options);

//   dropdownConfig.value.style = {
//     border: `1px solid ${dropdownConfig.value.primary}`,
//     padding: dropdownConfig.value.padding,
//     ...dropdownConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, dropdownConfig.value.styleCode);
//     dropdownConfig.value.style = { ...dropdownConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       dropdownValue.value = newValue.value;
//     }
//   });

//   return (
//     <select
//       style={dropdownConfig.value.style}
//       onChange={(e) => {
//         e.stopPropagation();
//         dropdownValue.value = e.target["value"];
//         ActionExecutor(dropdownConfig.value.i, "onChange");
//       }}
//     >
//       {dropdownValue.value.map((option) => (
//         <option value={option} key={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// Reusable IconButton Component
// export const IconButton = ({ icon, config }) => {
//   const iconButtonConfig = signal(config);
//   const iconValue = signal(icon);
//   iconButtonConfig.value.style = {
//     backgroundColor: iconButtonConfig.value.primary,
//     color: iconButtonConfig.value.textColor,
//     padding: iconButtonConfig.value.padding,
//     ...iconButtonConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, iconButtonConfig.value.styleCode);
//     iconButtonConfig.value.style = { ...iconButtonConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       iconValue.value = newValue.value;
//     }
//   });

//   return (
//     <button
//       style={iconButtonConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(iconButtonConfig.value.i, "onClick"); }}
//       onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(iconButtonConfig.value.i, "onHoverEnter"); }}
//       onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(iconButtonConfig.value.i, "onHoverLeave"); }}
//     >
//       <DynamicIcon name={iconValue.value} size={iconButtonConfig.value.style.iconSize} />
//     </button>
//   );
// };

// // Reusable Image Component
// export const Image = ({ src, config }) => {
//   const imageConfig = signal(config);
//   const imageValue = signal(src);
//   imageConfig.value.style = {
//     width: imageConfig.value.w || "100px",
//     height: imageConfig.value.h || "100px",
//     objectFit: "cover",
//     ...imageConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, imageConfig.value.styleCode);
//     imageConfig.value.style = { ...imageConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       imageValue.value = newValue.value;
//     }
//   });
  
//   console.log("called image:", src, config);
//   return (
//     <img
//       src={imageValue.value}
//       alt=""
//       style={imageConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(imageConfig.value.i, "onClick"); }}
//       onDblClick={(e) => { e.stopPropagation(); ActionExecutor(imageConfig.value.i, "onDoubleClick"); }}
//       onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(imageConfig.value.i, "onHoverEnter"); }}
//       onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(imageConfig.value.i, "onHoverLeave"); }}
//     />
//   );
// };

// // Reusable Avatar Component
// export const Avatar = ({ src, config }) => {
//   const avatarConfig = signal(config);
//   const avatarValue = signal(src);
//   avatarConfig.value.style = {
//     borderRadius: "50%",
//     objectFit: "cover",
//     ...avatarConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, avatarConfig.value.styleCode);
//     avatarConfig.value.style = { ...avatarConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       avatarValue.value = newValue.value;
//     }
//   });

//   return (
//     <img
//       src={avatarValue.value}
//       alt=""
//       style={avatarConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(avatarConfig.value.i, "onClick"); }}
//       onDblClick={(e) => { e.stopPropagation(); ActionExecutor(avatarConfig.value.i, "onDoubleClick"); }}
//       onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(avatarConfig.value.i, "onHoverEnter"); }}
//       onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(avatarConfig.value.i, "onHoverLeave"); }}
//     />
//   );
// };

// // Reusable Badge Component
// export const Badge = ({ value, config }) => {
//   const badgeConfig = signal(config);
//   const badgeValue = signal(value);
//   badgeConfig.value.style = {
//     display: "inline-block",
//     padding: badgeConfig.value.padding || "4px 8px",
//     borderRadius: "12px",
//     backgroundColor: badgeConfig.value.backgroundColor || "#eee",
//     color: badgeConfig.value.textColor || "#333",
//     fontSize: badgeConfig.value.size || "12px",
//     ...badgeConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, badgeConfig.value.styleCode);
//     badgeConfig.value.style = { ...badgeConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       badgeValue.value = newValue.value;
//     }
//   });

//   return (
//     <span
//       style={badgeConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(badgeConfig.value.i, "onClick"); }}
//       onDblClick={(e) => { e.stopPropagation(); ActionExecutor(badgeConfig.value.i, "onDoubleClick"); }}
//       onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(badgeConfig.value.i, "onHoverEnter"); }}
//       onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(badgeConfig.value.i, "onHoverLeave"); }}
//     >
//       {badgeValue.value}
//     </span>
//   );
// };

// Reusable ProgressBar Component
// export const ProgressBar = ({ progress, config }) => {
//   const progressConfig = signal(config);
//   const progressValue = signal(progress);
//   progressConfig.value.style = {
//     backgroundColor: progressConfig.value.backgroundColor || "#e0e0e0",
//     borderRadius: "8px",
//     overflow: "hidden",
//     height: progressConfig.value.height || "10px",
//     width: progressConfig.value.width || "100%",
//     ...progressConfig.value.style,
//   };

//   const progressBarInnerStyle = {
//     width: `${progressValue.value}%`,
//     backgroundColor: progressConfig.value.primary || "#76c7c0",
//     height: "100%",
//     transition: "width 0.3s ease",
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, progressConfig.value.styleCode);
//     progressConfig.value.style = { ...progressConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       progressValue.value = newValue.value;
//     }
//   });

//   return (
//     <div
//       style={progressConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(progressConfig.value.i, "onClick"); }}
//       onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(progressConfig.value.i, "onHoverEnter"); }}
//       onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(progressConfig.value.i, "onHoverLeave"); }}
//     >
//       <div style={progressBarInnerStyle} />
//     </div>
//   );
// };

// // Reusable Indicator Component
// export const Indicator = ({ active, config }) => {
//   const indicatorConfig = signal(config);
//   const indicatorValue = signal(active);
//   indicatorConfig.value.style = {
//     display: "inline-block",
//     width: indicatorConfig.value.size || "8px",
//     height: indicatorConfig.value.size || "8px",
//     borderRadius: "50%",
//     backgroundColor: indicatorValue.value ? indicatorConfig.value.activeColor || "green" : indicatorConfig.value.inactiveColor || "gray",
//     ...indicatorConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, indicatorConfig.value.styleCode);
//     indicatorConfig.value.style = { ...indicatorConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       indicatorValue.value = newValue.value;
//     }
//   });

//   return (
//     <span
//       style={indicatorConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(indicatorConfig.value.i, "onClick"); }}
//       onDblClick={(e) => { e.stopPropagation(); ActionExecutor(indicatorConfig.value.i, "onDoubleClick"); }}
//       onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(indicatorConfig.value.i, "onHoverEnter"); }}
//       onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(indicatorConfig.value.i, "onHoverLeave"); }}
//     />
//   );
// };

// // Reusable AvatarGroup Component
// export const AvatarGroup = ({ avatars, config }) => {
//   const avatarGroupConfig = signal(config);
//   const avatarsValue = signal(avatars);
//   avatarGroupConfig.value.style = {
//     display: "flex",
//     gap: avatarGroupConfig.value.gap || "8px",
//     alignItems: "center",
//     ...avatarGroupConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, avatarGroupConfig.value.styleCode);
//     avatarGroupConfig.value.style = { ...avatarGroupConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       avatarsValue.value = newValue.value;
//     }
//   });

//   return (
//     <div
//       style={avatarGroupConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(avatarGroupConfig.value.i, "onClick"); }}
//       onDblClick={(e) => { e.stopPropagation(); ActionExecutor(avatarGroupConfig.value.i, "onDoubleClick"); }}
//       onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(avatarGroupConfig.value.i, "onHoverEnter"); }}
//       onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(avatarGroupConfig.value.i, "onHoverLeave"); }}
//     >
//       {avatarsValue.value.map((avatar, index) => (
//         <img
//           key={index}
//           src={avatar.src}
//           alt=""
//           style={{
//             width: avatarGroupConfig.value.size || "40px",
//             height: avatarGroupConfig.value.size || "40px",
//             borderRadius: "50%",
//             objectFit: "cover",
//             border: avatarGroupConfig.value.border || "2px solid white",
//             ...avatar.style,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // Reusable Icon Component (with Lucide icons)
// export const Icon = ({ name, config }) => {
//   const iconConfig = signal(config);
//   const iconValue = signal(name);
//   iconConfig.value.style = {
//     fontSize: iconConfig.value.size || "24px",
//     color: iconConfig.value.color || "#333",
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",
//     ...iconConfig.value.style,
//   };

//   effect(() => {
//     const keys = variableKeys.peek();
//     let datamap = {};

//     for (const key of keys) {
//       const variableEntry = variableMap[key];
//       if (variableEntry && variableEntry.value !== undefined) {
//         datamap[key] = variableEntry.value;
//       }
//     }

//     const newStyles = FunctionExecutor(datamap, iconConfig.value.styleCode);
//     iconConfig.value.style = { ...iconConfig.value.style, ...newStyles };
//     const newValue = FunctionExecutor(datamap, config.valueCode);
//     if(newValue !== undefined && newValue.value !== undefined && newValue.value !== null) {
//       iconValue.value = newValue.value;
//     }

//   });

//   return (
//     <span
//       style={iconConfig.value.style}
//       onClick={(e) => { e.stopPropagation(); ActionExecutor(iconConfig.value.i, "onClick"); }}
//       onDblClick={(e) => { e.stopPropagation(); ActionExecutor(iconConfig.value.i, "onDoubleClick"); }}
//       onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(iconConfig.value.i, "onHoverEnter"); }}
//       onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(iconConfig.value.i, "onHoverLeave"); }}
//     >
//       <DynamicIcon name={iconValue.value} size={iconConfig.value.size} />
//     </span>
//   );
// };