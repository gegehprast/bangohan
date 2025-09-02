import { Gtk } from "ags/gtk4"

interface SeparatorProps extends Partial<Gtk.Separator.ConstructorProps> {
    orientation?: Gtk.Orientation
}

const Separator = (props: SeparatorProps) => {
    const classess = props.cssClasses || []
    const orientation = props.orientation === undefined ? Gtk.Orientation.VERTICAL : props.orientation

    if (orientation === Gtk.Orientation.HORIZONTAL) {
        classess.push("Horizontal")
    } else {
        classess.push("Vertical")
    }

    return (
        <Gtk.Separator
            {...props}
            cssClasses={classess}
            orientation={orientation}
            visible={props.visible || true}
        />
    )
}

export default Separator
