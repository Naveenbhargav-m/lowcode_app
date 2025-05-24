import { signal } from "@preact/signals";

let ActiveScreen = signal({});
let ActiveScreenView = signal("desktop_children");
let ScreenRendererFlag = signal("");


export {ActiveScreen, ActiveScreenView, ScreenRendererFlag};