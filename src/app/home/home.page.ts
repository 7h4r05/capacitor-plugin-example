import { ChangeDetectorRef, Component } from '@angular/core';
import {
  CapMethodsPluginService,
  ComputePluginParameters,
} from './services/cap-methods-plugin.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  alertText: string = 'Alert text';
  a = 1;
  b = 2;
  callBackStatus: string = '';
  callbackId: string | null = null;
  multipleCallBackStatus: string | null = null;
  constructor(
    private capMethodsPluginService: CapMethodsPluginService,
    private cd: ChangeDetectorRef
  ) {}

  async openAlert() {
    await this.capMethodsPluginService.openAlert(this.alertText);
  }

  async getAppVersion() {
    const version = await this.capMethodsPluginService.getAppVersion();
    alert(`Current version is: ${version}`);
  }

  async compute() {
    await this.capMethodsPluginService.computeAsync(
      new ComputePluginParameters(this.a, this.b),
      (message) => {
        if (message && message.result) {
          alert(`Result is: ${message.result}`);
        }
        this.callBackStatus = 'Completed';
      }
    );
    this.callBackStatus = 'Invoked';
  }

  async subscribe() {
    this.callbackId = await this.capMethodsPluginService.subscribeToCounter(
      (result) => {
        this.multipleCallBackStatus = result?.count.toString() ?? null;
        this.cd.detectChanges();
      }
    );
  }

  async unsubscribe() {
    if (this.callbackId) {
      await this.capMethodsPluginService.unsubscribeFromCounter(
        this.callbackId
      );
      this.callbackId = null;
    }
  }
}
