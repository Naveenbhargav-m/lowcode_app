import { useState } from "preact/hooks";
import DynamicIcon from "../custom/dynamic_icon";

export function IconGroup({ names, onChange  }) {
    const [selectedIcon, setSelectedIcon] = useState(names[0]);

    const handleClick = (name) => {
        setSelectedIcon(name);  // Update selected icon
        onChange(name);  // Call onChange
    };

    return (
        <div style={{ 
            display: "flex", 
            gap: "10px", 
            alignItems: "center",
            padding: "4px 8px",
            borderRadius: "12px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
        }}>
            {names.map((name, index) => (
                <div 
                    key={index} 
                    style={{ 
                        cursor: "pointer",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease-in-out",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: selectedIcon === name ? "black" : "transparent",
                        color: selectedIcon === name ? "white" : "black",
                    }} 
                    onClick={() => handleClick(name)}
                    onMouseEnter={(e) => {
                        if (selectedIcon !== name) {
                            e.currentTarget.style.backgroundColor = "black";
                            e.currentTarget.style.color = "white";
                        }
                        e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        if (selectedIcon !== name) {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "black";
                        }
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    <DynamicIcon name={name} size={24} />
                </div>
            ))}
        </div>
    );
}
