import Cocoa
import WebKit

final class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate {
    var window: NSWindow!
    var webView: WKWebView!

    func applicationDidFinishLaunching(_ notification: Notification) {
        let content = WKUserContentController()
        let scriptURL = Bundle.main.resourceURL!.appendingPathComponent("ai.js")
        let source = (try? String(contentsOf: scriptURL, encoding: .utf8)) ?? ""
        if !source.isEmpty {
            content.addUserScript(WKUserScript(source: source, injectionTime: .atDocumentEnd, forMainFrameOnly: true))
        }
        let config = WKWebViewConfiguration()
        config.userContentController = content
        webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = self
        webView.allowsBackForwardNavigationGestures = true

        window = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 1280, height: 800),
            styleMask: [.titled, .closable, .miniaturizable, .resizable],
            backing: .buffered,
            defer: false
        )
        window.title = "PolyTrack AI Driver"
        window.center()
        window.contentView = webView
        window.minSize = NSSize(width: 900, height: 600)
        window.makeKeyAndOrderFront(nil)
        webView.load(URLRequest(url: URL(string: "https://www.kodub.com/apps/polytrack")!))
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.regular)
app.run()
