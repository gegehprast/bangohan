import Gio from "gi://Gio?version=2.0"
import { Service } from "./Gohan"
import GLib from "gi://GLib?version=2.0"
import { execAsync } from "ags/process"
import app from "ags/gtk4/app"
import { monitorFile } from "ags/file"

class Theme implements Service {
    public dir: string = `${GLib.get_home_dir()}/.local/share/gohan/styles`

    public colors: string = `${this.dir}/colors.scss`

    public scss: string = `${this.dir}/styles.scss`

    public css: string = `${this.dir}/styles.css`

    private fileMonitor?: Gio.FileMonitor

    public async start() {
        await this.compileSass().catch(console.error)

        this.applyTheme()

        this.monitorColorChanges()
    }

    public async stop() {
        if (this.fileMonitor) {
            this.fileMonitor.cancel()
            this.fileMonitor = undefined
        }
    }

    private async compileSass() {
        const scss = `${GLib.get_home_dir()}/.local/share/gohan/styles/styles.scss`
        const css = `${GLib.get_home_dir()}/.local/share/gohan/styles/styles.css`

        await execAsync(`sass ${scss} ${css}`).catch(console.error)
    }

    private applyTheme() {
        const css = `${GLib.get_home_dir()}/.local/share/gohan/styles/styles.css`

        app.apply_css(css, true)
    }

    private monitorColorChanges() {
        this.fileMonitor = monitorFile(this.colors, async (file, event) => {
            if (event == Gio.FileMonitorEvent.CHANGED) {
                await this.compileSass().catch(console.error)

                this.applyTheme()
            }
        })
    }
}

export default Theme
