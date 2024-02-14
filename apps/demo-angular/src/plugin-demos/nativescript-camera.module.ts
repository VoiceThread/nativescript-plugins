import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptCameraComponent } from './nativescript-camera.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptCameraComponent }])],
  declarations: [NativescriptCameraComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptCameraModule {}
