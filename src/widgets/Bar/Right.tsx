import Battery from "./Modules/Battery"
import Time from "./Modules/Time"
import Volume from "./Modules/Volume"
import { Gtk } from "ags/gtk4"
import Network from "./Modules/Network"

const Right = () => {
    return (
        <box
            name={`Right`}
            cssClasses={["Section", "Right"]}
            hexpand={true}
            halign={Gtk.Align.END}
            valign={Gtk.Align.CENTER}
            spacing={15}
        >
            <Network />

            <Volume />

            <Battery />

            <Time />
        </box>
    )
}

export default Right
