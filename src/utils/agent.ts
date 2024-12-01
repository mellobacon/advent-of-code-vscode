import * as vscode from "vscode";

const URL_TEMPLATES = {
    ROOT: "https://adventofcode.com/",
    LOGIN: "https://adventofcode.com/login",
    AUTH: "https://adventofcode.com/auth/{auth}",
    INPUT: "https://adventofcode.com/{year}/day/{day}/input",
    LEVEL: "https://adventofcode.com/{year}/day/{day}",
    SUBMIT: "https://adventofcode.com/{year}/day/{day}/answer",
};

const headers = {
    Cookie: "",
    "User-Agent": "github.com/mellobacon/advent-of-code-vscode by mellobacon",
};

export async function tryGetAuth(auth: string): Promise<boolean> {
    const authURL = URL_TEMPLATES.AUTH.replace("{auth}", auth);
    await vscode.env.openExternal(vscode.Uri.parse(authURL));
    const input = await vscode.window.showInputBox({
        "prompt": "Enter your session token", 
        "password": true, 
        "title": "Advent of Code",
        "ignoreFocusOut": true});
    
    if (input !== undefined) {
        setToken(input);
        try {
            const session = await fetch(URL_TEMPLATES.ROOT, {headers: headers});
            if (session.ok) {
                vscode.window.showInformationMessage(`Log in successful`);
            }
            else {
                vscode.window.showWarningMessage(`Error logging in: ${session.statusText}`);
            }
        }
        catch(e) {
            vscode.window.showErrorMessage(`Failed to authorize token: ${e}`);
        }
    }
    return true;
}

function hasSession(): boolean {
    return headers.Cookie !== undefined;
}

function setToken(token: string) {
    headers.Cookie = `session=${token}`;
}
