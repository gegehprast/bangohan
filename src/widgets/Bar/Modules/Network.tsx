import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { createBinding, createComputed, For } from "ags"
import { Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { Cursor } from "../../../misc/Cursor"

interface CompactActiveConnection {
    icon: string
    label: string
}
const network = AstalNetwork.get_default()

const Network = () => {
    const primary = createBinding(network, "primary")
    const wired = createBinding(network, "wired")
    const wifi = createBinding(network, "wifi")
    const connections = createBinding(network.client, "connections")
    const activeConnections = createBinding(network.client, "activeConnections")

    const relevantConnections = createComputed([connections], (connections) => {
        return connections
            .filter((c) => c.get_connection_type() !== "loopback")
            .sort((a, b) => {
                if (a.get_connection_type() < b.get_connection_type()) {
                    return 1
                }
                if (a.get_connection_type() > b.get_connection_type()) {
                    return -1
                }
                return 0
            })
    })

    const activeConnectionsUuids = createComputed(
        [activeConnections],
        (activeConnections) => {
            return activeConnections.map((ac) => ac.get_uuid())
        }
    )

    const activeConnection = createComputed(
        [primary, wired, wifi],
        (p, w, wf) => {
            if (p === AstalNetwork.Primary.WIFI) {
                return {
                    icon: wf.iconName,
                    label: wf.device.activeConnection.id,
                } as CompactActiveConnection
            }

            return {
                icon: w.iconName,
                label: w.device.activeConnection.id,
            } as CompactActiveConnection
        }
    )

    return (
        <box
            cssClasses={["Volume"]}
            hexpand={true}
            cursor={Cursor.POINTER}
        >
            <menubutton cssClasses={["VolumeMenu"]}>
                <box spacing={5}>
                    <image
                        iconName={activeConnection.as((a) => a.icon)}
                        cssClasses={["icon", "Icon"]}
                    />
                    <label
                        label={activeConnection.as((a) => a.label)}
                        cssClasses={["Percentage"]}
                    />
                </box>
                <popover>
                    <box orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                        <For each={relevantConnections}>
                            {(connection) => (
                                <button
                                    onClicked={() => {
                                        if (
                                            activeConnectionsUuids
                                                .get()
                                                .includes(connection.get_uuid())
                                        ) {
                                            execAsync(
                                                `nmcli connection down ${connection.get_uuid()}`
                                            )
                                        } else {
                                            execAsync(
                                                `nmcli connection up ${connection.get_uuid()}`
                                            )
                                        }
                                    }}
                                    halign={Gtk.Align.START}
                                    cssClasses={activeConnectionsUuids.as(
                                        (uuids) => {
                                            if (
                                                uuids.includes(
                                                    connection.get_uuid()
                                                )
                                            ) {
                                                return [
                                                    "SpeakerButton",
                                                    "Active",
                                                ]
                                            }

                                            return ["SpeakerButton"]
                                        }
                                    )}
                                >
                                    <label
                                        hexpand
                                        label={`${connection.get_id()} (${connection.get_connection_type()})`}
                                    />
                                </button>
                            )}
                        </For>
                    </box>
                </popover>
            </menubutton>
        </box>
    )
}

export default Network
