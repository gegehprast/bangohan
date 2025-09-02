import app from "ags/gtk4/app"
import Gohan from "./services/Gohan"
import { createBinding, For, This } from "ags"
import Bar from "./widgets/Bar/Bar"
import Theme from "./services/Theme"
import NotificationWindow from "./widgets/Notification/NotificationWindow"

Gohan.start()

app.start({
    instanceName: "BanGohan",
    gtkTheme: "Adwaita",
    main() {
        const theme = new Theme()
        theme.start()
        
        const monitors = createBinding(app, "monitors")

        return (
            <For each={monitors}>
                {(monitor) => (
                    <This this={app}>
                        <Bar gdkmonitor={monitor} />

                        <NotificationWindow gdkmonitor={monitor} />
                    </This>
                )}
            </For>
        )
    },
})
