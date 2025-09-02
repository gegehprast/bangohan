import { Gdk } from "ags/gtk4"


class Cursor {
    public DEFAULT = Gdk.Cursor.new_from_name("default", null)

    public POINTER = Gdk.Cursor.new_from_name("pointer", null)

    public NOT_ALLOWED = Gdk.Cursor.new_from_name("not-allowed", null)
}

export default Cursor
