import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptCustomRotors } from '@demo/shared';
import {} from '@voicethread/nativescript-custom-rotors';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptCustomRotors {}
