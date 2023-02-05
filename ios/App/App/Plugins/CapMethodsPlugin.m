//
//  ExamplePlugin.m
//  App
//
//  Created by Dariusz Zabrzeński on 30/01/2023.
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(CapMethodsPlugin, "CapMethodsPlugin",
           CAP_PLUGIN_METHOD(openAlert, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(getAppVersion, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(computeAsync, CAPPluginReturnCallback);
           
           CAP_PLUGIN_METHOD(subscribeToCounter, CAPPluginReturnCallback);
           CAP_PLUGIN_METHOD(unsubscribeFromCounter, CAPPluginReturnNone);
)
