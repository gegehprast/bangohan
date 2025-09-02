import { Gtk } from "ags/gtk4"
import AstalNotifd from "gi://AstalNotifd?version=0.1"
import Notification from "../../services/Notification"

interface HeaderProps {
    notification: Notification
}

const Header = ({ notification }: HeaderProps) => {
    return (
        <box
            cssClasses={["Header"]}
            valign={Gtk.Align.CENTER}
            vexpand={false}
            hexpand={false}
        >
            <box
                cssClasses={["HeaderLeft"]}
                halign={Gtk.Align.START}
                vexpand={false}
                spacing={5}
            >
                <image
                    cssClasses={["AppIcon"]}
                    iconName={
                        notification.data.appIcon ||
                        notification.data.desktopEntry
                    }
                    pixelSize={18}
                />

                <label
                    cssClasses={["HeaderLabel"]}
                    label={`${notification.data.appName || "Unknown App"}`}
                />

                <label
                    cssClasses={["HeaderLabel"]}
                    label={notification.tick[0].as(t => t.toString())}
                />
            </box>

            <box
                cssClasses={["HeaderRight"]}
                halign={Gtk.Align.END}
                hexpand={true}
                spacing={5}
            >
                <label
                    cssClasses={["HeaderTime"]}
                    label={new Date(
                        notification.data.time * 1000
                    ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: undefined,
                        hour12: false,
                    })}
                />
                <button
                    cssClasses={["CloseButton"]}
                    tooltipText={"Close Notification"}
                    onClicked={() => {
                        notification.data.dismiss()
                    }}
                >
                    <label cssClasses={["Icon"]} label={"✕"} />
                </button>
            </box>
        </box>
    )
}

export default Header
