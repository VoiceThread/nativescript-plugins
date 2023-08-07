import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptAudioRecorderComponent } from './nativescript-audio-recorder.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptAudioRecorderComponent }])],
  declarations: [NativescriptAudioRecorderComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptAudioRecorderModule {}
