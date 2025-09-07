import { createPoll } from "ags/time"

const Time = () => {
    const datetime = createPoll(
        "Hello",
        1000,
        "date +'%a, %b %d, %H:%M'",
        (output) => {
            return output.trim()
        }
    )

    return (
        <box cssClasses={["Time"]} hexpand={true} spacing={10}>
            <label label={datetime} />
        </box>
    )
}

export default Time
