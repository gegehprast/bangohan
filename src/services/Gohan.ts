import Cursor from "./Cursor"
import Theme from "./Theme"

export class Gohan {
    public Theme: Theme

    public Cursor: Cursor

    constructor() {
        this.Cursor = new Cursor()

        this.Theme = new Theme()
    }

    async start() {
        console.log("Gohan service is starting...")

        // Theme
        await this.Theme.start()
    }

    async stop() {
        console.log("Gohan service is stopping...")

        // Theme
        await this.Theme.stop()
    }
}

export interface Service {
    start(): Promise<void>
    stop(): Promise<void>
}

export interface SubscribableService extends Service {
    subscribe(callback: () => void): void
}

export default new Gohan()
