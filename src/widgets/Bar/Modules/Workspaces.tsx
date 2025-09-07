import { Gtk } from "ags/gtk4"
import { Accessor, createBinding, createComputed, For } from "ags"
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { Cursor } from "../../../misc/Cursor"

interface GohanWorkspace {
    real: AstalHyprland.Workspace
    focused: boolean
    occupied: boolean
}

const maxWorkspaces = 5
const workspacesNum = Array.from({ length: maxWorkspaces - 1 }, (_, i) => i)
const hyprland = AstalHyprland.get_default()

function createWorkspaces(focusedId: number): GohanWorkspace[] {
    return workspacesNum.map((i) => {
        let workspace = hyprland.get_workspace(i + 1)

        if (!workspace) {
            workspace = AstalHyprland.Workspace.dummy(i + 1, null)
        }

        return {
            real: workspace,
            focused: workspace.id === focusedId,
            occupied: workspace.get_clients().length > 0,
        } as GohanWorkspace
    })
}

const Workspaces = () => {
    const focused = createBinding(hyprland, "focused_workspace")

    const gohanWorkspaces = createComputed([focused], (focused) => {
        const gohanWs = createWorkspaces(focused?.id)
        const index = gohanWs.findIndex((ws) => ws.real.id === focused.id)

        // if the focused workspace is not in the list, we need to add it
        if (index === -1) {
            // remove the latest workspace if we exceed the limit
            if (gohanWs.length >= maxWorkspaces) {
                gohanWs.pop()
            }

            // add the focused workspace
            gohanWs.push({
                real: focused,
                focused: true,
                occupied: focused.get_clients().length > 0,
            })
        }
        // if the focused workspace is already in the list, we just update the last one
        else {
            let lastWorkspace = hyprland.get_workspace(maxWorkspaces)

            if (!lastWorkspace) {
                lastWorkspace = AstalHyprland.Workspace.dummy(
                    maxWorkspaces,
                    null
                )
            }

            gohanWs.push({
                real: lastWorkspace,
                focused: false,
                occupied: lastWorkspace.get_clients().length > 0,
            })
        }

        return gohanWs
    })

    return (
        <box
            cssClasses={["Workspaces"]}
            halign={Gtk.Align.CENTER}
            valign={Gtk.Align.BASELINE}
            spacing={1}
        >
            <For each={gohanWorkspaces}>
                {(workspace) => <WorkspaceButton workspace={workspace} />}
            </For>
        </box>
    )
}

interface WorkspaceButtonProps {
    workspace: GohanWorkspace
}

const WorkspaceButton = ({ workspace }: WorkspaceButtonProps) => {
    const classes = [
        "WorkspaceButton",
        workspace.focused ? "Focused" : "",
        workspace.occupied ? "Occupied" : "",
    ]

    const workspaceName =
        workspace.real.name === "10" ? "0" : workspace.real.name
    const tooltipText = `Switch to workspace ${workspaceName}`
    const cursor = workspace.focused
        ? Cursor.DEFAULT
        : Cursor.POINTER

    return (
        <button
            cssClasses={classes}
            onClicked={() => {
                if (
                    workspace.real.id === hyprland.get_focused_workspace()?.id
                ) {
                    return
                }

                workspace.real.focus()
            }}
            tooltipText={tooltipText}
            cursor={cursor}
        >
            <label
                label={workspaceName}
                cssClasses={["WorkspaceButtonLabel"]}
                halign={Gtk.Align.START}
                useUnderline={true}
            />
        </button>
    )
}

export default Workspaces
