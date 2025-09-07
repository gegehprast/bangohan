import { execAsync } from "ags/process"
import { Cursor } from "../../../misc/Cursor"

const Launcher = () => {
    return (
        <box cssClasses={["Launcher"]}>
            <button
                onClicked={() => {
                    execAsync(
                        `rofi -show drun -run-command "uwsm app -- {cmd}"`
                    )
                }}
                tooltipText={"Launcher"}
                cursor={Cursor.POINTER}
            >
                <label
                    cssClasses={["icon"]}
                    label={"󰣇"}
                />
            </button>
        </box>
    )
}

export default Launcher
