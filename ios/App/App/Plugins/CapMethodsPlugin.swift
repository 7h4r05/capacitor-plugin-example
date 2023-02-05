//
//  ExamplePlugin.swift
//  App
//
//  Created by Dariusz Zabrzeński on 30/01/2023.
//

import Capacitor

@objc(CapMethodsPlugin)
public class CapMethodsPlugin: CAPPlugin {
    @objc func openAlert(_ call: CAPPluginCall) {
        let text = call.getString("text")
        DispatchQueue.main.async {
            let dialogMessage = UIAlertController(title: "My alert", message: text, preferredStyle: .alert)
            let okButton = UIAlertAction(title: "OK", style: .default, handler: { (action) -> Void in print("Closed")})
            
            dialogMessage.addAction(okButton)
            self.bridge?.viewController?.present(dialogMessage, animated: true)
        }
    }
    
    @objc func getAppVersion(_ call: CAPPluginCall) {
        if let version = Bundle.main.infoDictionary?["CFBundleVersion"] as? String {
            call.resolve(["version": version])
        } else {
            call.resolve(["version": "Cannot get version"])
        }
    }
    
    @objc func computeAsync(_ call: CAPPluginCall) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            let a = call.getInt("a")!
            let b = call.getInt("b")!
            let result = a+b
            call.resolve(["result" : result])
        }
    }
    
    
    var runCount = 0;
    var timer: Timer? = nil;
    
    @objc func subscribeToCounter(_ call: CAPPluginCall) {
        if self.timer == nil {
            call.keepAlive = true
            self.runCount = 0;
            DispatchQueue.main.async {
                self.timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true)
                { timer in
                    self.runCount += 1
                    call.resolve(["count": self.runCount])
                }
            }
        }
    }
    
    @objc func unsubscribeFromCounter(_ call: CAPPluginCall) {
        let callbackId = call.getString("callbackId")!
        if self.timer != nil {
            self.timer?.invalidate()
            self.timer = nil
        }
        self.bridge?.releaseCall(withID: callbackId)
    }
}
