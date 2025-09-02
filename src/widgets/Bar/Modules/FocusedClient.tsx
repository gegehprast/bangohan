import Pango from "gi://Pango?version=1.0"
import { Gtk } from "ags/gtk4"
import { createBinding, With } from "ags"
import AstalHyprland from "gi://AstalHyprland?version=0.1"

const hyprland = AstalHyprland.get_default()

const FocusedClient = () => {
    const focusedClient = createBinding(hyprland, "focusedClient")

    return (
        <box
            name={"FocusedClient"}
            cssClasses={["FocusedClient"]}
            halign={Gtk.Align.CENTER}
            valign={Gtk.Align.BASELINE}
        >
            <With value={focusedClient}>
                {(focusedClient) => (
                    <label
                        label={focusedClient?.title}
                        cssClasses={["FocusedClientLabel"]}
                        maxWidthChars={48}
                        ellipsize={Pango.EllipsizeMode.MIDDLE}
                    />
                )}
            </With>
        </box>
    )
}

export default FocusedClient
