import { Astal, Gdk, Gtk } from "ags/gtk4"
import { createComputed, createState, For, onCleanup } from "ags"
import AstalNotifd from "gi://AstalNotifd?version=0.1"
import NotificationItem from "./NotificationItem"
import Notification from "../../services/Notification"
import { Cursor } from "../../misc/Cursor"

const notifd = AstalNotifd.get_default()

const NotificationWindow = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
    const { BOTTOM, RIGHT } = Astal.WindowAnchor
    const [notifications, setNotifications] = createState<Notification[]>([])
    const reversed = createComputed([notifications], (ns) => {
        const newN = [...ns]
        newN.reverse()
        return newN
    })

    const notifiedHandler = notifd.connect("notified", (_, id, replaced) => {
        const notification = notifd.get_notification(id)

        if (replaced && notifications.get().some((n) => n.id === id)) {
            const olds = [...notifications.get()]
            const news = [
                ...olds.filter((n) => n.id !== id),
                new Notification(notification.id, notification, (id) => {
                    setNotifications((ns) => ns.filter((n) => n.id !== id))
                }),
            ]
            setNotifications(news)
        } else {
            setNotifications((ns) => [
                ...ns,
                new Notification(notification.id, notification, (id) => {
                    setNotifications((ns) => ns.filter((n) => n.id !== id))
                }),
            ])
        }
    })

    const resolvedHandler = notifd.connect("resolved", (_, id) => {
        setNotifications((ns) => ns.filter((n) => n.id !== id))
    })

    onCleanup(() => {
        notifd.disconnect(notifiedHandler)
        notifd.disconnect(resolvedHandler)
    })

    return (
        <window
            $={(self) => {
                onCleanup(() => self.destroy())
            }}
            name={"NotificationWindow"}
            cssClasses={["NotificationWindow", "debug"]}
            gdkmonitor={gdkmonitor}
            anchor={BOTTOM | RIGHT}
            visible={notifications((ns) => ns.length > 0)}
        >
            <box
                orientation={Gtk.Orientation.VERTICAL}
                spacing={10}
                valign={Gtk.Align.END}
            >
                <box
                    orientation={Gtk.Orientation.VERTICAL}
                    spacing={10}
                    valign={Gtk.Align.END}
                >
                    <For each={reversed}>
                        {(notification) => (
                            <NotificationItem notification={notification} />
                        )}
                    </For>
                </box>

                <box spacing={10}>
                    <button
                        cssClasses={[
                            "bg-main",
                            "rounded",
                            "shadow",
                            "bordered",
                        ]}
                        onClicked={() => {
                            setNotifications([])
                        }}
                        cursor={Cursor.POINTER}
                        hexpand={true}
                    >
                        Close All
                    </button>
                    <button
                        cssClasses={[
                            "bg-main",
                            "rounded",
                            "shadow",
                            "bordered",
                        ]}
                        onClicked={() => {
                            const notifications = notifd.get_notifications()
                            notifications.forEach((n) => n.dismiss())
                        }}
                        cursor={Cursor.POINTER}
                        hexpand={true}
                    >
                        Dismiss All
                    </button>
                </box>
            </box>
        </window>
    )
}

export default NotificationWindow
