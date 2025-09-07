import { Gtk } from "ags/gtk4"
import AstalTray from "gi://AstalTray?version=0.1"
import { createBinding, For } from "ags"
import { Cursor } from "../../../misc/Cursor"

function getSearchWith(item: AstalTray.TrayItem) {
    const title = item.title
    const tooltipMarkup = item.tooltipMarkup
    return title && title.length ? title : tooltipMarkup
}

function toTitleCase(str: string) {
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

function getTooltipMarkup(item: AstalTray.TrayItem) {
    // yeah can use this to get the tooltip markup
    return toTitleCase(getSearchWith(item))
}

const CUSTOM_ICONS: Record<string, string> = {
    discord: "",
    steam: "",
    spotify: "",
}

const USE_CUSTOM_ICONS: RegExp[] = [/steam/i, /discord/i, /spotify/i]

function shouldUseCustomIcon(searchWith: string) {
    return USE_CUSTOM_ICONS.some((regex) => searchWith.match(regex))
}

function getCustomIcon(item: AstalTray.TrayItem) {
    const searchWith = getSearchWith(item)
    const shouldUse = shouldUseCustomIcon(searchWith)

    if (!shouldUse) {
        return null
    }

    for (const [key, value] of Object.entries(CUSTOM_ICONS)) {
        if (searchWith.match(new RegExp(key, "i"))) {
            return value
        }
    }

    return "󰠫"
}

const tray = AstalTray.get_default()

const Tray = () => {
    const items = createBinding(tray, "items")

    const init = (btn: Gtk.MenuButton, item: AstalTray.TrayItem) => {
        btn.menuModel = item.menuModel
        btn.insert_action_group("dbusmenu", item.actionGroup)
        item.connect("notify::action-group", () => {
            btn.insert_action_group("dbusmenu", item.actionGroup)
        })
    }

    return (
        <box
            cssClasses={["Tray"]}
            spacing={10}
            halign={Gtk.Align.CENTER}
            valign={Gtk.Align.CENTER}
        >
            <For each={items}>
                {(item) => (
                    <menubutton
                        $={(self) => init(self, item)}
                        cursor={Cursor.POINTER}
                        tooltipMarkup={getTooltipMarkup(item)}
                        cssClasses={["TrayMenuButton"]}
                        halign={Gtk.Align.CENTER}
                        valign={Gtk.Align.CENTER}
                    >
                        <ImageIcon item={item} />
                        {Gtk.PopoverMenu.new_from_model(item.menuModel)}
                    </menubutton>
                )}
            </For>
        </box>
    )
}

const ImageIcon = ({ item }: { item: AstalTray.TrayItem }) => {
    const customIcon = getCustomIcon(item)

    if (customIcon) {
        return (
            <label cssClasses={["icon", "TrayLabelIcon"]} label={customIcon} />
        )
    }

    return (
        <image
            gicon={item.gicon}
            cssClasses={["icon", "TrayImageIcon"]}
            pixelSize={16} // Don't foget to adjust .TrayLabelIcon style too
        />
    )
}

export default Tray
