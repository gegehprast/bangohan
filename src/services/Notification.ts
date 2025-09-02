import { createState, State } from "ags"
import { interval, Time } from "ags/time"
import AstalNotifd from "gi://AstalNotifd?version=0.1"

const TICK = 10
const CRITICAL_TICK = 30

class Notification {
    public id: number

    public tick: State<number>

    public data: AstalNotifd.Notification

    private dismisser: (id: number) => void

    private interval?: Time

    constructor(
        id: number,
        data: AstalNotifd.Notification,
        dismisser: (id: number) => void
    ) {
        this.id = id

        this.data = data

        this.tick = createState(
            data.urgency === AstalNotifd.Urgency.CRITICAL ? CRITICAL_TICK : TICK
        )

        this.dismisser = dismisser

        this.startTicking()
    }

    public startTicking() {
        // Check if the timer already exists
        if (this.interval) {
            return
        }

        // Start the timer
        this.interval = interval(1000, () => {
            const currentTick = this.tick[0].get()

            if (currentTick <= 0) {
                this.interval?.cancel()
                this.interval = undefined

                this.dismisser(this.id)
            } else {
                this.tick[1](currentTick - 1)
            }
        })
    }

    public stopTicking() {
        // Stop the timer
        this.interval?.cancel()
        this.interval = undefined

        this.tick[1](TICK) // Reset the tick
    }
}

export default Notification
