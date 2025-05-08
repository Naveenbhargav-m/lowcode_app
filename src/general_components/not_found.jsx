

function NotFoundComponent() {
    let defaultStyle = {
        "color": "black",
        "height": "100vh",
        "width": "100vw"
    };
    return (
        <div style={{...defaultStyle}}>
            This page you are looking for not found
        </div>
    );
}


export {NotFoundComponent};