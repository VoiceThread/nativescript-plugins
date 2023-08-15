import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptCamera } from '@demo/shared';
import {} from '@voicethread/nativescript-camera';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptCamera {}
