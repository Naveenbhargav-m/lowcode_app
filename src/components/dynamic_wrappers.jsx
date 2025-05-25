import { useEffect, useMemo, useState } from "preact/hooks";
import { eventsEngine, executeElementEvent } from '../events_engine/events_class';


// Optimized useDynamicConfig hook
const useDynamicConfig = (initialConfig, initialValue) => {
    // Use useMemo instead of signals for better performance in this context
    const config = useMemo(() => ({ ...initialConfig }), [initialConfig]);
    const [value, setValue] = useState(initialValue);
  
    // Only update when necessary
    useEffect(() => {
      if (initialValue !== value) {
        setValue(initialValue);
      }
    }, [initialValue]);
  
    return { 
      config, 
      value: { value },
      setValue 
    };
  };






// More efficient DynamicWrapper with event delegation
const DynamicWrapper = ({ children, config, value, element }) => {
    const { config: dynamicConfig, value: dynamicValue } = useDynamicConfig(config, value);
  
    // Memoize event handlers to prevent recreation
    const eventHandlers = useMemo(() => {
      const createEventHandler = (eventType) => (e) => {
        e.stopPropagation();
        executeElementEvent(element, eventType, {
          originalEvent: e,
          target: e.target,
          currentTarget: e.currentTarget,
          elementValue: dynamicValue?.value,
          elementConfig: dynamicConfig
        });
      };
  
      return {
        onClick: createEventHandler("onClick"),
        onDoubleClick: createEventHandler("onDoubleClick"),
        onMouseEnter: createEventHandler("onHoverEnter"),
        onMouseLeave: createEventHandler("onHoverLeave"),
        onFocus: createEventHandler("onFocus"),
        onBlur: createEventHandler("onBlur"),
        onChange: createEventHandler("onChange")
      };
    }, [element.id, dynamicValue?.value]); // Only recreate when element ID or value changes
    console.log("dynamic value:", dynamicValue.value, );
    console.log("dynamic config:",dynamicConfig);
    console.log("original value:", value, );
    console.log("original config:",config);
    console.log("original element:",element);

    return (
      <div {...eventHandlers}>
        {children(dynamicValue?.value ?? value, dynamicConfig ?? config)}
      </div>
    );
  };
  

export { useDynamicConfig, DynamicWrapper};