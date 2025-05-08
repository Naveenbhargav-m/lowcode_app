import { h } from 'preact';
import { signal , effect} from "@preact/signals";
import { ActionExecutor, FunctionExecutor } from '../../states/common_actions';
import { variableKeys, variableMap } from '../../states/global_state';
// Reactive Container Component
const ContainerTemplate = ({ config, value, action, children }) => {
  if(config == undefined) {
    return <></>;
  }
  const containerConfig = signal(config);
  effect(() => {
    const keys = variableKeys.peek();
    let datamap = {};

    for (const key of keys) {
      const variableEntry = variableMap[key];
      if (variableEntry && variableEntry.value !== undefined) {
        datamap[key] = variableEntry.value;
      }
    }

    const newStyles = FunctionExecutor(datamap, containerConfig.value.styleCode);
    containerConfig.value.style = { ...containerConfig.value.style, ...newStyles };
  });
  return (
    <div
      style={containerConfig.value.style}
      onClick={(e) => { e.stopPropagation(); ActionExecutor(containerConfig.value.id, "onClick"); }}
      onDblClick={(e) => { e.stopPropagation(); ActionExecutor(containerConfig.value.id, "onDoubleClick"); }}
      onMouseEnter={(e) => { e.stopPropagation(); ActionExecutor(containerConfig.value.id, "onHoverEnter"); }}
      onMouseLeave={(e) => { e.stopPropagation(); ActionExecutor(containerConfig.value.id, "onHoverLeave"); }}
    >
      {children || value}
    </div>
  );
};


// Card Container
export const Card = ({ configs, value, action, children }) => (
  <ContainerTemplate config={configs} value={value} action={action}>
    {children}
  </ContainerTemplate>
);

// Generic Container
export const Container = ({ configs, value, action, children }) => (
  <ContainerTemplate config={{...configs}} value={value} action={action}>
    {children}
  </ContainerTemplate>
);

// Grid View Container
export const GridView = ({ configs, value, action, children }) => {
  const gridStyle = {
    display: 'grid',
    ...configs.style,
  };

  return (
    <ContainerTemplate config={{...configs, "style": gridStyle}} value={value} action={action}>
    {children}
  </ContainerTemplate>
  );
};

// List View Container
export const ListView = ({ configs, value, action, children }) => (
  <ContainerTemplate config={{ "direction":"column",...configs}} value={value} action={action}>
    {children}
  </ContainerTemplate>
);

// Row Container
export const Row = ({ configs, value, action, children }) => (
  <ContainerTemplate config={{"direction":"row", ...configs}} value={value} action={action}>
    {children}
  </ContainerTemplate>
);

// Column Container
export const Column = ({ configs, value, action, children }) => {
 return (
  <ContainerTemplate config={{...configs}} value={value} action={action}>
  {children}
</ContainerTemplate>
 );
};

// Scroll Area Container
export const ScrollArea = ({ configs, value, action, children }) => {
  const scrollStyle = {
    overflowY: 'auto',
    ...configs.style
  };

  return (
    <div style={scrollStyle} onClick={action}>
      {children}
    </div>
  );
};

// Carousel Container (Simple Example)
export const Carousel = ({ configs, value, action, children }) => {
  const carouselStyle = {
    display: 'flex',
    overflowX: 'scroll',
    scrollSnapType: 'x mandatory',
    ...configs.style
  };

  return (
    <div style={carouselStyle} onClick={action}>
      {children}
    </div>
  );
};
