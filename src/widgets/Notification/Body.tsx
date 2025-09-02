import { Gtk } from "ags/gtk4"
import AstalNotifd from "gi://AstalNotifd?version=0.1"
import GLib from "gi://GLib?version=2.0"
import Pango from "gi://Pango?version=1.0"
import Notification from "../../services/Notification"

const isIcon = (icon: string) => {
    const iconTheme = new Gtk.IconTheme()
    return iconTheme.has_icon(icon)
}

const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS)

const MARKUP_SAFE_APPS = ["Hyprshot"]

interface BodyProps {
    notification: Notification
}

const Body = ({ notification }: BodyProps) => {
    return (
        <box
            cssClasses={["Body"]}
            valign={Gtk.Align.CENTER}
            spacing={10}
            vexpand
        >
            {notification.data.image && fileExists(notification.data.image) && (
                <box valign={Gtk.Align.CENTER} cssClasses={["Image"]}>
                    <image
                        file={notification.data.image}
                        overflow={Gtk.Overflow.HIDDEN}
                        pixelSize={48}
                    />
                </box>
            )}

            {notification.data.image && isIcon(notification.data.image) && (
                <box cssClasses={["Icon"]} valign={Gtk.Align.CENTER}>
                    <image
                        iconName={notification.data.image}
                        pixelSize={48}
                        halign={Gtk.Align.CENTER}
                        valign={Gtk.Align.CENTER}
                    />
                </box>
            )}

            {notification.data.appIcon && fileExists(notification.data.appIcon) && (
                <box cssClasses={["Icon"]} valign={Gtk.Align.CENTER}>
                    <image
                        file={notification.data.appIcon}
                        pixelSize={48}
                        halign={Gtk.Align.CENTER}
                        valign={Gtk.Align.CENTER}
                    />
                </box>
            )}

            <box
                hexpand
                orientation={Gtk.Orientation.VERTICAL}
                valign={Gtk.Align.CENTER}
                spacing={5}
            >
                <label
                    ellipsize={Pango.EllipsizeMode.END}
                    maxWidthChars={30}
                    cssClasses={["Summary"]}
                    halign={Gtk.Align.START}
                    xalign={0}
                    label={notification.data.summary}
                />
                {notification.data.body && (
                    <label
                        cssClasses={["Body"]}
                        maxWidthChars={30}
                        wrap
                        halign={Gtk.Align.START}
                        xalign={0}
                        label={notification.data.body}
                        useMarkup={MARKUP_SAFE_APPS.includes(
                            notification.data.appName
                        )}
                    />
                )}
            </box>
        </box>
    )
}

export default Body
