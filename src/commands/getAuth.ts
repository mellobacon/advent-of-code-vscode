import * as vscode from "vscode";
import { tryGetAuth } from "../utils/agent";

export default function getAuth(auth: string) {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Logging in...`,
        cancellable: true
    }, async (progress, token) => {
        token.onCancellationRequested(() => {
            console.log("cancelled");
        });
        const session = await tryGetAuth(auth);
        const p = new Promise<void>(resolve => {
            setTimeout(() => {
                if (session) {
                    resolve();
                }
            });
        });
        return p;
    });
}

