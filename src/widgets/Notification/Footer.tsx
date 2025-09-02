import { Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import AstalNotifd from "gi://AstalNotifd?version=0.1"
import Notification from "../../services/Notification"

const hyprland = AstalHyprland.get_default()

interface CustomAction {
    label: string
    action: (notification: AstalNotifd.Notification) => void
}

const customActions: Record<string, CustomAction[]> = {
    Hyprshot: [
        {
            label: "Open",
            action: (notification: AstalNotifd.Notification) => {
                const file = notification.appIcon
                const dir = file.substring(0, file.lastIndexOf("/"))

                execAsync(`xdg-open ${dir}`)
            },
        },
        {
            label: "View",
            action: (notification: AstalNotifd.Notification) => {
                const file = notification.appIcon
                execAsync(`xdg-open ${file}`)
            },
        },
        {
            label: "Edit",
            action: (notification: AstalNotifd.Notification) => {
                const file = notification.appIcon
                execAsync(`swappy -f ${file}`)
            },
        },
    ],
}

interface FooterProps {
    notification: Notification
}

const Footer = ({ notification }: FooterProps) => {
    const actions = notification.data.get_actions()

    return (
        <box cssClasses={["Footer"]}>
            {
                <box cssClasses={["Actions"]} spacing={6}>
                    {actions.map((action) => (
                        <button
                            hexpand
                            onClicked={() => {
                                notification.data.invoke(action.id)
                                notification.data.dismiss()

                                const clients = hyprland.get_clients()
                                const client = clients.find((c) =>
                                    c.class
                                        .toLowerCase()
                                        .includes(
                                            notification.data.appName.toLowerCase()
                                        )
                                )

                                if (client) {
                                    hyprland.dispatch(
                                        "focuswindow",
                                        `class:${client.class}`
                                    )
                                }
                            }}
                        >
                            <label
                                label={action.label}
                                halign={Gtk.Align.CENTER}
                                hexpand
                            />
                        </button>
                    ))}

                    {customActions[notification.data.appName]?.map(
                        (customAction) => (
                            <button
                                hexpand
                                onClicked={() => {
                                    customAction.action(notification.data)

                                    notification.data.dismiss()
                                }}
                            >
                                <label
                                    label={customAction.label}
                                    halign={Gtk.Align.CENTER}
                                    hexpand
                                />
                            </button>
                        )
                    )}
                </box>
            }
        </box>
    )
}

export default Footer
