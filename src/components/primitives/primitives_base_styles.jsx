
let url = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
const text_base_style = {
    display: "flex",
    overflow: "hidden",
    fontSize: "0.8em",
    color: "#333",
    lineHeight: "1.4",
    padding: "8px",
    "margin": "0px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    "flexDirection": "column"
};

const number_base_style = {
    display: "inline-block",
    textAlign: "right",
    fontSize: "1em",
    color: "#222",
};

const text_area_base_style = {
    display: "block",
    width: "100%",
    height: "100px",
    padding: "8px",
    "margin": "0px",
    fontSize: "0.9em",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "vertical",
};

const avatar_base_style = {
    display: "inline-block",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
};

const avatar_group_base_style = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
};

const progress_bar_base_style = {
    display: "block",
    width: "100%",
    height: "8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    overflow: "hidden",
};

const drop_down_base_style = {
    display: "inline-block",
    position: "relative",
    width: "200px",
    padding: "8px",
    fontSize: "0.9em",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
};

const button_base_style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    fontSize: "0.9em",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
};

const image_base_style = {
    display: "block",
    maxWidth: "100%",
    height: "auto",
    borderRadius: "4px",
};

const badge_base_style = {
    display: "inline-block",
    padding: "4px 8px",
    fontSize: "0.75em",
    color: "#fff",
    backgroundColor: "#007BFF",
    borderRadius: "12px",
};

const icon_base_style = {
    display: "inline-block",
    width: "16px",
    height: "16px",
    fill: "currentColor",
};

const icon_button_base_style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    color: "#007BFF",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
};


const Text_base_config = {
    value:"This is the sample Text Value",
    configs: {
      style: text_base_style,
      data_source: {},
      onClick: {"actions": [], "code": ""},
      onDoubleClick:  {"actions": [], "code": ""},
      onHover:  {"actions": [], "code": ""},
      onHoverEnter:  {"actions": [], "code": ""},
      onHoverLeave: {"actions": [], "code": ""},
      valueCode:  {"actions": [], "code": ""},
      childrenCode: {"actions": [], "code": ""},
    },
};

const NumberBaseConfig = {
    value: 70,
    configs: {
      style: number_base_style,
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};",
    },
};

const TextAreabaseConfig = {
    value: "This the is the base text value for the Text Area",
    configs: {
      style: text_area_base_style,
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};",
    },
};


const AvatarConfig = {
    value: url,
    configs: {
      style: text_area_base_style,
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};",
    },
};


const AvatarGroupConfig = {
    value: [url, url],
    configs: {
      style: text_area_base_style,
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};"}
};

const ProgressBarConfig = {
    value: 40,
    configs: {
      style: progress_bar_base_style,
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};"}
};


const DropdownConfig = {
    value: "test",
    configs: {
      style: drop_down_base_style,
      "options": [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },],
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};"}
};

const ButtonConfig = {
    value: "Cick meee",
    configs: {
      style: button_base_style,
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};"}
};


const ImageConfig = {
    value: url,
    configs: {
      style: image_base_style,
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};"}
};


const BadgeConfig = {
    value: "triller",
    configs: {
      style: badge_base_style,
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};"}
};


const IconConfig = {
    value: "database",
    configs: {
      style: icon_base_style,
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};"}
};

const IconButtonConfig = {
    value: "database",
    configs: {
      style: icon_button_base_style,
      onClick: "return {};",
      onDoubleClick: "return {};",
      onHover:"return {};",
      onHoverEnter:"return {};",
      onHoverLeave:"return {};",
      valueCode: "return {};",
      childrenCode:"return {};"}
};
const PrimitivesStylesMap = {
    text: Text_base_config,
    number: NumberBaseConfig,
    text_area: TextAreabaseConfig,
    avatar: AvatarConfig,
    avatar_group: AvatarGroupConfig,
    progress_bar: ProgressBarConfig,
    drop_down: DropdownConfig,
    button: ButtonConfig,
    image: ImageConfig,
    badge: BadgeConfig,
    icon: IconConfig,
    icon_button: IconButtonConfig,
};

export { PrimitivesStylesMap };
