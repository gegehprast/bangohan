import { Gdk, Gtk } from "ags/gtk4"
import Tray from "./Modules/Tray"

const Center = () => {
    return (
        <box
            name={`Center`}
            cssClasses={["Section", "Center"]}
            hexpand={true}
            halign={Gtk.Align.CENTER}
            valign={Gtk.Align.CENTER}
            spacing={10}
        >
            <Tray />
        </box>
    )
}

export default Center
