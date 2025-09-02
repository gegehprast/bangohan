import Launcher from "./Modules/Launcher"
import Separator from "../commons/Separator"
import Workspaces from "./Modules/Workspaces"
import FocusedClient from "./Modules/FocusedClient"
import { Gdk, Gtk } from "ags/gtk4"

const Left = () => {
    return (
        <box
            name={`Left`}
            cssClasses={["Section", "Left"]}
            hexpand={true}
            halign={Gtk.Align.START}
            valign={Gtk.Align.CENTER}
            spacing={10}
        >
            <Launcher />

            <Separator orientation={Gtk.Orientation.VERTICAL} />

            <Workspaces />

            <Separator orientation={Gtk.Orientation.VERTICAL} />

            <FocusedClient />
        </box>
    )
}

export default Left
