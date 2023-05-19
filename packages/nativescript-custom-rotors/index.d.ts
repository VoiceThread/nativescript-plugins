import { ViewBase } from '@nativescript/core';
import { CustomRotorsCommon } from './common';

export declare class CustomRotors extends CustomRotorsCommon {}

export declare function initializeCustomRotors(): void;

declare type Class = new (...args: any[]) => {};
declare type Callback = (...args: any[]) => void;

declare module '@nativescript/core/ui/core/view-base' {
  export interface ViewBase {
    rotorGroup: string;
    rotorOrder: number;
  }
}
declare module '@nativescript/core/ui/layouts/layout-base' {
  export interface LayoutBase {
    rotorContainer: boolean;
    rotorGroups: any;
    rotorGroupCallbacks: Map<string, Callback>;
    removeRotorItem: (item: ViewBase) => boolean;
    insertRotorItem: (item: ViewBase, index: number) => boolean;
    addRotorGroup: (name: string, items?: Array<ViewBase>) => void;
  }
}

declare module '@nativescript/core/ui/content-view' {
  export interface ContentView {
    rotorContainer: boolean;
    rotorGroups: any;
    rotorGroupCallbacks: Map<string, Callback>;
    removeRotorItem: (item: ViewBase) => boolean;
    insertRotorItem: (item: ViewBase, index: number) => boolean;
    addRotorGroup: (name: string, items?: Array<ViewBase>) => void;
  }
}
