import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptTranscoderComponent } from './nativescript-transcoder.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptTranscoderComponent }])],
  declarations: [NativescriptTranscoderComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptTranscoderModule {}
