import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptAudioPlayerComponent } from './nativescript-audio-player.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptAudioPlayerComponent }])],
  declarations: [NativescriptAudioPlayerComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptAudioPlayerModule {}
