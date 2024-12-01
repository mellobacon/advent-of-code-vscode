import * as vscode from "vscode";
import AdvenOfCodeLoginView from "./adventOfCodeLoginView";

export function registerViews(extensionUri: vscode.Uri): vscode.Disposable[] {
    const webviewPanel = new AdvenOfCodeLoginView(extensionUri);
    const welcomePanel = vscode.window.registerWebviewViewProvider("advent-of-code.viewer", webviewPanel);
    return [welcomePanel];
}
