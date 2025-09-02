import AstalNotifd from "gi://AstalNotifd?version=0.1"
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
import { Gtk } from "ags/gtk4"
import { interval } from "ags/time"
import Notification from "../../services/Notification"

function startTransition(self: Gtk.Widget) {
    self.set_opacity(0)
    self.show()

    const durationMs = 300
    const intervalMs = 16
    const increment = intervalMs / durationMs

    const int = interval(intervalMs, () => {
        const opacity = self.get_opacity()
        if (opacity >= 1) {
            int.cancel()
        }
        self.set_opacity(opacity + increment)
    })
}

const NotificationItem = ({ notification }: { notification: Notification }) => {
    return (
        <box
            cssClasses={["NotificationItem", "shadow", "rounded", "bordered"]}
            orientation={Gtk.Orientation.VERTICAL}
            $={(self) => {
                self.set_css_classes([
                    "NotificationItem",
                    "shadow",
                    "rounded",
                    "bordered",
                    notification.data.urgency === AstalNotifd.Urgency.CRITICAL
                        ? "Critical"
                        : "",
                ])

                startTransition(self)

                const mouseEnter = new Gtk.EventControllerMotion()

                mouseEnter.connect("enter", () => {
                    notification.stopTicking()
                })

                mouseEnter.connect("leave", () => {
                    notification.startTicking()
                })

                self.add_controller(mouseEnter)
            }}
            spacing={5}
            vexpand={false}
        >
            <Header notification={notification} />

            <Body notification={notification} />

            <Footer notification={notification} />
        </box>
    )
}

export default NotificationItem
