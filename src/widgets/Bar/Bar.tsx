import Left from "./Left"
import Center from "./Center"
import Right from "./Right"
import { Astal, Gdk } from "ags/gtk4"
import app from "ags/gtk4/app"

const Bar = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return (
        <window
            cssClasses={["Bar"]}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={app}
            visible={true}
        >
            <centerbox
                cssClasses={["Container", "shadow", "rounded", "bordered"]}
            >
                <Left $type="start" />
                <Center $type="center" />
                <Right $type="end" />
            </centerbox>
        </window>
    )
}

export default Bar
