import Gohan from "../../../services/Gohan"
import { createBinding, createState, For, onMount } from "ags"
import { Gtk } from "ags/gtk4"
import AstalBattery from "gi://AstalBattery?version=0.1"
import { execAsync } from "ags/process"

export type PowerProfile = "power-saver" | "balanced" | "performance"

async function setPowerProfile(profile: PowerProfile) {
    await execAsync(`powerprofilesctl set ${profile}`)
}

async function getPowerProfile() {
    const p = (await execAsync(`powerprofilesctl get`)) as PowerProfile
    return p
}

const profiles = [
    {
        name: "Power Saver",
        value: "power-saver",
    },
    {
        name: "Balanced",
        value: "balanced",
    },
    {
        name: "Performance",
        value: "performance",
    },
]

const bat = AstalBattery.get_default()

const Battery = () => {
    const [activePorfile, setActiveProfile] =
        createState<PowerProfile>("balanced")

    onMount(() => {
        async function init() {
            const profile = await getPowerProfile()

            setActiveProfile(profile)
        }

        init()
    })

    return (
        <box
            cssClasses={["Battery"]}
            hexpand={true}
            cursor={Gohan.Cursor.POINTER}
        >
            <menubutton cssClasses={["BatteryMenu"]}>
                <box spacing={5}>
                    <image
                        iconName={createBinding(bat, "batteryIconName")}
                        cssClasses={["icon", "Icon"]}
                    />
                    <label
                        label={createBinding(bat, "percentage").as(
                            (p) => `${Math.floor(p * 100)}%`
                        )}
                        cssClasses={["Percentage"]}
                    />
                </box>
                <popover>
                    <box orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                        {profiles.map((profile) => (
                            <button
                                onClicked={async () => {
                                    await setPowerProfile(
                                        profile.value as PowerProfile
                                    )

                                    setActiveProfile(
                                        profile.value as PowerProfile
                                    )
                                }}
                                halign={Gtk.Align.START}
                                cssClasses={activePorfile.as((p) => {
                                    return p === profile.value
                                        ? ["ProfileButton", "Active"]
                                        : ["ProfileButton"]
                                })}
                            >
                                <label label={profile.name} />
                            </button>
                        ))}
                    </box>
                </popover>
            </menubutton>
        </box>
    )
}

export default Battery
