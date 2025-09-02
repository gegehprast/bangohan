import { execAsync } from "ags/process"
import Gohan from "../../../services/Gohan"

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
                cursor={Gohan.Cursor.POINTER}
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
