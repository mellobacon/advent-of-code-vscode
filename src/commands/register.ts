import * as vscode from "vscode";
import getAuth from "./getAuth";

export default function registerCommands(): vscode.Disposable[] {
    return [
        vscode.commands.registerCommand("advent-of-code.commands.getAuth", getAuth)
    ];
}
