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

        // Theme
        await this.Theme.start()
    }

    async stop() {

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
