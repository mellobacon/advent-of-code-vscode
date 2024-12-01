(function() {
    const github = document.getElementById("github")!;
    const google = document.getElementById("google")!;
    const reddit = document.getElementById("reddit")!;
    const twitter = document.getElementById("twitter")!;
    const noLogin = document.getElementById("noLogin")!;
    const vscode = acquireVsCodeApi();
    
    github.onclick = (e) => {
        vscode.postMessage({command: "getAuth", text: "github"});
    };
    google.onclick = (e) => {
        vscode.postMessage({command: "getAuth", text: "google"});
    };
    reddit.onclick = (e) => {
        vscode.postMessage({command: "getAuth", text: "reddit"});
    };
    twitter.onclick = (e) => {
        vscode.postMessage({command: "getAuth", text: "twitter"});
    };
    noLogin.onclick = (e) => {
        vscode.postMessage({command: "aoc"});
    };
}());
