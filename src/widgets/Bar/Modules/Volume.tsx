import AstalWp from "gi://AstalWp?version=0.1"
import { createBinding, For } from "ags"
import { Gtk } from "ags/gtk4"
import { Cursor } from "../../../misc/Cursor"

const wp = AstalWp.get_default()

const Volume = () => {
    const speakers = createBinding(wp.audio, "speakers")

    return (
        <box cssClasses={["Volume"]} hexpand={true} cursor={Cursor.POINTER}>
            <menubutton cssClasses={["VolumeMenu"]}>
                <box spacing={5}>
                    <image
                        iconName={createBinding(
                            wp.defaultSpeaker,
                            "volumeIcon"
                        )}
                        cssClasses={["icon", "Icon"]}
                    />
                    <label
                        label={createBinding(wp.defaultSpeaker, "volume").as(
                            (v) => `${(v * 100).toFixed(0)}%`
                        )}
                        cssClasses={["Percentage"]}
                    />
                </box>
                <popover>
                    <box orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                        <For each={speakers}>
                            {(speaker) => (
                                <button
                                    onClicked={() =>
                                        speaker.set_is_default(true)
                                    }
                                    halign={Gtk.Align.START}
                                    cssClasses={createBinding(
                                        speaker,
                                        "isDefault"
                                    ).as((isDefault) => {
                                        return isDefault
                                            ? ["SpeakerButton", "Active"]
                                            : ["SpeakerButton"]
                                    })}
                                >
                                    <label label={speaker.description} />
                                </button>
                            )}
                        </For>
                    </box>
                </popover>
            </menubutton>
        </box>
    )
}

export default Volume
