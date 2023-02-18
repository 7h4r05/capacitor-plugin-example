import { Injectable } from '@angular/core';
import { CallbackID, Capacitor, registerPlugin } from '@capacitor/core';

const _pluginName: string = 'CapMethodsPlugin';

export type ComputePluginCallback = (
  message: { result: number } | null,
  err?: any
) => void;
export class ComputePluginParameters {
  constructor(public a: number, public b: number) {}
}

export type GetCounterPluginCallback = (
  message: { count: number } | null,
  err?: any
) => void;

export interface CapMethodsPlugin {
  openAlert(text: { text: string }): Promise<void>;
  getAppVersion(): Promise<{ version: string }>;
  computeAsync(
    params: ComputePluginParameters,
    callBack: ComputePluginCallback
  ): Promise<CallbackID>;
  subscribeToCounter(callback: GetCounterPluginCallback): Promise<CallbackID>;
  unsubscribeFromCounter(data: { callbackId: string }): Promise<void>;
}
const CapMethodsPlugin = registerPlugin<CapMethodsPlugin>(_pluginName);

@Injectable({
  providedIn: 'root',
})
export class CapMethodsPluginService {
  async openAlert(text: string): Promise<void> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      await CapMethodsPlugin.openAlert({
        text,
      });
    }
  }

  async getAppVersion(): Promise<string | null> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      return (await CapMethodsPlugin.getAppVersion()).version;
    }
    return null;
  }

  async computeAsync(
    params: ComputePluginParameters,
    callback: ComputePluginCallback
  ): Promise<void> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      await CapMethodsPlugin.computeAsync(params, callback);
    }
  }

  async subscribeToCounter(
    callback: GetCounterPluginCallback
  ): Promise<CallbackID | null> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      return await CapMethodsPlugin.subscribeToCounter(callback);
    }
    return null;
  }

  async unsubscribeFromCounter(callbackId: string): Promise<void> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      return await CapMethodsPlugin.unsubscribeFromCounter({ callbackId });
    }
  }
}
