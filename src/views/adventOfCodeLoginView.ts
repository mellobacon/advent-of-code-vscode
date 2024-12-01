import * as vscode from 'vscode';

/**
 * Prompts user to log in if not already (or something idk)
 */
export default class AdvenOfCodeLoginView implements vscode.WebviewViewProvider {
	constructor(private readonly _extensionUri: vscode.Uri) { }

	public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): Thenable<void> | void {
		webviewView.webview.html = this._getHtml(webviewView.webview);
		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case "getAuth": {
					vscode.commands.executeCommand("advent-of-code.commands.getAuth", message.text);
					return;
				}
			}
		});
	}
	private _getHtml(webview: vscode.Webview) {
		const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'reset.css'));
		const styleVscodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'vscode.css'));
		const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'panel.css'));

		const favicon = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'aoc.png'));

		const github = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'github.svg'));
		const google = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'google.svg'));
		const reddit = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'reddit.svg'));
		const twitter = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'twitterX.svg'));

		const nonce = getNonce();
		const authScript = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'panelWebview.js'));

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVscodeUri}" rel="stylesheet">
				<link href="${styleMainUri}" rel="stylesheet">

				<title>Advent of Code</title>
			</head>
			<body>
				<img id="favicon" src="${favicon}" alt="Advent of Code Favicon">
				<div id="text">
					<h3>Log in to Advent of Code</h3>
					<p class="subtext">Access Advent of Code puzzles from 2015 to the current available year.</p>
				</div>
				<div class="buttons">
					<button class="secondary" id="github" title="Log in with GitHub"><img class="svg" src="${github}" alt="GitHub Logo"></button>
					<button class="secondary" id="google" title="Log in with Google"><img class="svg" src="${google}" alt="Google Logo"></button>
					<button class="secondary" id="reddit" title="Log in with Reddit"><img class="svg" src="${reddit}" alt="Reddit Logo"></button>
					<button class="secondary" id="twitter" title="Log in with Twitter"><img class="svg" src="${twitter}" alt="Twitter Logo"></button>
				</div>
				<a id="noLogin" role="button">Continue without logging in</a>
				<div>
					<p class="subtext">(Note: You will need your authorization token which can be found in your cookies after login.)</p>
				</div>

				<script nonce="${nonce}" src="${authScript}"></script>
			</body>
			</html>`;
	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
