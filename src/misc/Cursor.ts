import { Gdk } from "ags/gtk4"

export const Cursor = {
    DEFAULT: Gdk.Cursor.new_from_name("default", null),

    POINTER: Gdk.Cursor.new_from_name("pointer", null),

    NOT_ALLOWED: Gdk.Cursor.new_from_name("not-allowed", null),
}
