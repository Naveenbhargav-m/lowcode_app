import { memo, useMemo, useState } from "preact/compat";
import { renderContainer } from "./containers/containers_mapper";
import { renderPrimitiveElement } from "./primitives/primitiveMapper";
import { renderTemplate } from "./templates/template_mapper";
import { ActiveScreen, ActiveScreenView, ScreenRendererFlag } from "../state/screen_state";

// Memoized render function with better comparison
// @ts-ignore
const MemoizedRenderElement = memo(function RenderElement({ item, viewType, ElementsMap }) {
  if (item.type === "container" || item.type === "modal") {
    return renderContainer(item, ElementsMap);
  } else if (item.type === "template") {
    return renderTemplate(item);
  } else if (item.type === "user_template") {
    return renderContainer(item, ElementsMap);
  }
  return renderPrimitiveElement(item);
}, (prevProps, nextProps) => {
  // Custom comparison for better memoization
  return (
    // @ts-ignore
    prevProps.item.id === nextProps.item.id &&
    // @ts-ignore
    prevProps.item.type === nextProps.item.type &&
    // @ts-ignore
    prevProps.item.order === nextProps.item.order &&
    // @ts-ignore
    JSON.stringify(prevProps.item.configs) === JSON.stringify(nextProps.item.configs) &&
    // @ts-ignore
    Object.keys(prevProps.ElementsMap).length === Object.keys(nextProps.ElementsMap).length
  );
});

// Individual item component for better granular updates
// @ts-ignore
const RenderItem = memo(({ item, elements }) => (
  <div key={item.id}>
    <MemoizedRenderElement 
      // @ts-ignore
      item={item} 
      viewType={item.type} 
      ElementsMap={elements} 
    />
  </div>
), (prevProps, nextProps) => {
  return (
    // @ts-ignore
    prevProps.item.id === nextProps.item.id &&
    // @ts-ignore
    JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item) &&
    // @ts-ignore
    Object.keys(prevProps.elements).length === Object.keys(nextProps.elements).length
  );
});





// Alternative with virtual scrolling for large lists (optional)
export function VirtualizedRendererComponent({ itemHeight = 60 }) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const outerDivStyle = useMemo(() => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#ffffff",
    overflow: "auto",
    padding: "10px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    boxSizing: "border-box"
  }), []);

  const { items, elements, totalHeight, visibleItems } = useMemo(() => {
    const screenConfig = ActiveScreen.value || {};
    const screenElements = screenConfig[ActiveScreenView.value] || {};
    const elementsArray = Object.values(screenElements);
    
    const items = elementsArray
      .filter((item) => item && !item.parent)
      .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

    const totalHeight = items.length * itemHeight;
    
    // Use full viewport height for calculations (minus padding)
    const containerHeight = window.innerHeight - 20; // Account for padding
    
    // Calculate visible range
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 2; // Buffer
    const end = Math.min(start + visibleCount, items.length);
    
    const visibleItems = items.slice(start, end).map((item, index) => ({
      ...item,
      virtualIndex: start + index
    }));

    return { items, elements: screenElements, totalHeight, visibleItems };
  }, [ActiveScreen.value, ActiveScreenView.value, ScreenRendererFlag.value, scrollTop, itemHeight]);

  if (items.length === 0) {
    return (
      <div style={outerDivStyle} className="scrollbar-hide">
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          No elements to display
        </div>
      </div>
    );
  }

  return (
    <div 
      style={outerDivStyle} 
      className="scrollbar-hide"
      // @ts-ignore
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(item => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: item.virtualIndex * itemHeight,
              width: '100%',
              height: itemHeight
            }}
          >
            <MemoizedRenderElement 
              // @ts-ignore
              item={item} 
              viewType={item.type} 
              ElementsMap={elements} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}



// export function RendererComponent() {
//   // Memoized styles to prevent object recreation
//   const outerDivStyle = useMemo(() => ({
//     position: "relative",
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#f9f9f9",
//     border: "1px solid #e0e0e0",
//     overflow: "auto",
//     padding: "10px",
//     scrollbarWidth: "none",
//     msOverflowStyle: "none",
//   }), []);

//   // Combined computation with better error handling
//   const { items, elements, hasData } = useMemo(() => {
//     try {
//       const screenConfig = ActiveScreen.value || {};
//       const screenElements = screenConfig[ActiveScreenView.value] || {};
      
//       // Early return if no elements
//       if (!screenElements || Object.keys(screenElements).length === 0) {
//         return { items: [], elements: {}, hasData: false };
//       }
      
//       const elementsArray = Object.values(screenElements);
      
//       // Filter and sort in one pass with better performance
//       const items = elementsArray
//         .filter((item) => item && !item.parent) // Add null check
//         .sort((a, b) => {
//           const orderA = a.order ?? Infinity;
//           const orderB = b.order ?? Infinity;
//           return orderA - orderB;
//         });

//       return { items, elements: screenElements, hasData: true };
//     } catch (error) {
//       console.error("Error computing renderer data:", error);
//       return { items: [], elements: {}, hasData: false };
//     }
//   }, [ActiveScreen.value, ActiveScreenView.value, ScreenRendererFlag.value]);

//   // Early return for no data
//   if (!hasData || items.length === 0) {
//     return (
//       <div style={outerDivStyle} className="scrollbar-hide">
//         <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
//           No elements to display
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={outerDivStyle} className="scrollbar-hide">
//       {items.map((item) => (
//         <RenderItem 
//           key={item.id}
//           item={item}
//           elements={elements}
//         />
//       ))}
//     </div>
//   );
// }