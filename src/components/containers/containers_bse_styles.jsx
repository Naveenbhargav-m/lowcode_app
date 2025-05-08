const card_base_style = {
    configs: {
    style: {
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        width:"100%",
        "height":"300px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        border: "1px solid #ddd",
    },
    onClick: "return {};",
    onDoubleClick: "return {};",
    onHover:"return {};",
    onHoverEnter:"return {};",
    onHoverLeave:"return {};",
    valueCode: "return {};",
    childrenCode:"return {};"
}
};

const container_base_style = {
    configs: {
    style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height:"400px",
        maxWidth: "1200px",
        padding: "16px",
        "border":"1px solid black",
        "borderRadius":"20px"
    },
    onClick: "return {};",
    onDoubleClick: "return {};",
    onHover:"return {};",
    onHoverEnter:"return {};",
    onHoverLeave:"return {};",
    valueCode: "return {};",
    childrenCode:"return {};"
}
};

const row_base_style = {
    configs: {
    style: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        width: "100%",
        height:"400px",
         "border":"1px solid black",
        "borderRadius":"20px",
        margin: "8px", // Adjust for gutters
    },
    onClick: "return {};",
    onDoubleClick: "return {};",
    onHover:"return {};",
    onHoverEnter:"return {};",
    onHoverLeave:"return {};",
    valueCode: "return {};",
    childrenCode:"return {};"
}
};

const column_base_style = {
    configs: {
   style: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    height:"100%",
    width:"100%",
    backgroundColor:"green",
    padding: "8px", // Match row margin for gutters
    "border":"1px solid black",
    "borderRadius":"20px"
   },
   onClick: "return {};",
   onDoubleClick: "return {};",
   onHover:"return {};",
   onHoverEnter:"return {};",
   onHoverLeave:"return {};",
   valueCode: "return {};",
   childrenCode:"return {};"
}
};

const grid_view_base_style = {
    configs: {
    style : {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        width: "100%",
        height:"400px",
        "columns":"repeat(3, 1fr)",
        gridGap: "3",
        gap: "16px",
        "border":"1px solid black",
        "borderRadius":"20px"
    },
    onClick: "return {};",
    onDoubleClick: "return {};",
    onHover:"return {};",
    onHoverEnter:"return {};",
    onHoverLeave:"return {};",
    valueCode: "return {};",
    childrenCode:"return {};"
}
};

const list_view_base_style = {
   configs: {
    style: {
        display: "flex",
        flexDirection: "column",
        height:"100%",
        width:"100%",
        backgroundColor:"green",
        padding: "16px", // Match row margin for gutters
        gap: "8px",
        "border":"1px solid black",
        "borderRadius":"20px"
       },
       onClick: "return {};",
       onDoubleClick: "return {};",
       onHover:"return {};",
       onHoverEnter:"return {};",
       onHoverLeave:"return {};",
       valueCode: "return {};",
       childrenCode:"return {};"
   }
};

const scroll_area_base_style = {
    configs: {
    style: {
        display: "block",
        maxHeight: "400px",
        overflowY: "auto",
        padding: "8px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        height:"400px",
        width:"100%",
    },
    onClick: "return {};",
    onDoubleClick: "return {};",
    onHover:"return {};",
    onHoverEnter:"return {};",
    onHoverLeave:"return {};",
    valueCode: "return {};",
    childrenCode:"return {};"
}
};

const carousel_base_style = {
   configs: {
    style: {
        display: "flex",
        overflowX: "auto",
        gap: "16px",
        scrollSnapType: "x mandatory",
        padding: "8px",
        "border":"1px solid black",
        "borderRadius":"20px"
       },
       onClick: "return {};",
       onDoubleClick: "return {};",
       onHover:"return {};",
       onHoverEnter:"return {};",
       onHoverLeave:"return {};",
       valueCode: "return {};",
       childrenCode:"return {};"
   }
};

const ContainersStylesMap = {
    card: card_base_style,
    container: container_base_style,
    row: row_base_style,
    column: column_base_style,
    grid_view: grid_view_base_style,
    list_view: list_view_base_style,
    scroll_area: scroll_area_base_style,
    carousel: carousel_base_style,
};

export { ContainersStylesMap };
