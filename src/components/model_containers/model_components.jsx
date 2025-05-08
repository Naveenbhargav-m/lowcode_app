// Hover Modal

import { h } from 'preact';
import { signal , effect} from "@preact/signals";
import ContextMenuDemo from '../custom/context_menu';
import { ActionExecutor, FunctionExecutor } from '../../states/common_actions';
import { variableKeys, variableMap } from '../../states/global_state';


export const HoverModal = ({ configs, value, action, children }) => {
  const modalConfig = signal(configs);

  modalConfig.value.style = {
    padding: "60px",
    height: "100%",
    width: "100%",
    backgroundColor: "grey",
    zIndex: modalConfig.value.style?.zIndex || "10000",
    ...modalConfig.value.style,
  };

  effect(() => {
    const keys = variableKeys.peek();
    let datamap = {};

    for (const key of keys) {
      const variableEntry = variableMap[key];
      if (variableEntry && variableEntry.value !== undefined) {
        datamap[key] = variableEntry.value;
      }
    }

    const newStyles = FunctionExecutor(datamap, modalConfig.value.styleCode);
    modalConfig.value.style = { ...modalConfig.value.style, ...newStyles };
  });

  return (
    <div
      style={modalConfig.value.style}
      class={`popup-modal ${modalConfig.value.class || ""}`}
      onClick={(e) => { e.stopPropagation(); ActionExecutor(modalConfig.value.i, "onClick"); }}
      onDblClick={(e) => { e.stopPropagation(); ActionExecutor(modalConfig.value.i, "onDoubleClick"); }}
      onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(modalConfig.value.i, "onHoverEnter"); }}
      onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(modalConfig.value.i, "onHoverLeave"); }}
    >
      {children}
    </div>
  );
};

// Popup Modal
export const PopupModal = ({ configs, value, action, children }) => {
  const modalConfig = signal(configs);

  modalConfig.value.style = {
    padding: "60px",
    height: "100%",
    width: "100%",
    zIndex: modalConfig.value.style?.zIndex || "10000",
    ...modalConfig.value.style,
  };

  effect(() => {
    const keys = variableKeys.peek();
    let datamap = {};

    for (const key of keys) {
      const variableEntry = variableMap[key];
      if (variableEntry && variableEntry.value !== undefined) {
        datamap[key] = variableEntry.value;
      }
    }

    const newStyles = FunctionExecutor(datamap, modalConfig.value.styleCode);
    modalConfig.value.style = { ...modalConfig.value.style, ...newStyles };
  });

  return (
    <div
      style={modalConfig.value.style}
      class={`popup-modal ${modalConfig.value.class || ""}`}
      onClick={(e) => { e.stopPropagation(); ActionExecutor(modalConfig.value.i, "onClick"); }}
      onDblClick={(e) => { e.stopPropagation(); ActionExecutor(modalConfig.value.i, "onDoubleClick"); }}
      onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(modalConfig.value.i, "onHoverEnter"); }}
      onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(modalConfig.value.i, "onHoverLeave"); }}
    >
      {children}
    </div>
  );
};

// Drawer
export const Drawer = ({ configs, value, action, children }) => {
  const drawerConfig = signal(configs);

  drawerConfig.value.style = {
    padding: "40px",
    ...drawerConfig.value.style,
  };

  effect(() => {
    const keys = variableKeys.peek();
    let datamap = {};

    for (const key of keys) {
      const variableEntry = variableMap[key];
      if (variableEntry && variableEntry.value !== undefined) {
        datamap[key] = variableEntry.value;
      }
    }

    const newStyles = FunctionExecutor(datamap, drawerConfig.value.styleCode);
    drawerConfig.value.style = { ...drawerConfig.value.style, ...newStyles };
  });

  return (
    <div
      style={drawerConfig.value.style}
      class={`drawer ${drawerConfig.value.class || ""}`}
      onClick={(e) => { e.stopPropagation(); ActionExecutor(drawerConfig.value.i, "onClick"); }}
      onDblClick={(e) => { e.stopPropagation(); ActionExecutor(drawerConfig.value.i, "onDoubleClick"); }}
      onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(drawerConfig.value.i, "onHoverEnter"); }}
      onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(drawerConfig.value.i, "onHoverLeave"); }}
    >
      {children}
    </div>
  );
};
