import { Observable } from '@nativescript/core';

export class CustomRotorsCommon extends Observable {}

import { ContentView, isIOS, LayoutBase, Property, View, ViewBase } from '@nativescript/core';
import { Class } from '.';

export type RotorContainerView = ContentView | LayoutBase;

/**
 * @override
 * Add `rotorGroup` property to ViewBase.
 * Set the name of the rotorGroup that this view is a part of
 */

export const rotorGroupProperty = new Property<ViewBase, string>({
  name: 'rotorGroup',
  defaultValue: undefined,
});
rotorGroupProperty.register(ViewBase);
export const rotorOrderProperty = new Property<ViewBase, number>({
  name: 'rotorOrder',
  defaultValue: -1,
  valueConverter: (value: string): number => +value,
});
rotorOrderProperty.register(ViewBase);

/**
 * @override
 * Add `rotorContainer` property to ContentView
 * Mark any ContentView, specifically Page, as a "rotorContainer"
 */
export const lb_rotorContainerProperty = new Property<LayoutBase, boolean>({
  name: 'rotorContainer',
  defaultValue: false,
  valueConverter: (value: string): boolean => {
    return value?.toLowerCase() === 'true';
  },
});
lb_rotorContainerProperty.register(LayoutBase);
export const cv_rotorContainerProperty = new Property<ContentView, boolean>({
  name: 'rotorContainer',
  defaultValue: false,
  valueConverter: (value: string): boolean => {
    return value?.toLowerCase() === 'true';
  },
});
cv_rotorContainerProperty.register(ContentView);

/**
 * @function initializeCustomRotors
 * This is the ONLY function that needs to be called.
 * MUST be called in app.ts
 */
export function initializeCustomRotors(): void {
  // define 'rotorGroup' on ViewBase
  Object.defineProperty(ViewBase.prototype, 'rotorGroup', {
    value: undefined,
    enumerable: true,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(ViewBase.prototype, 'rotorOrder', {
    value: -1,
    enumerable: true,
    configurable: true,
    writable: true,
  });
  // define the {N} property for 'rotorGroup'
  ViewBase.prototype[rotorGroupProperty.setNative] = function rotorGroupPropSetNative(value: string): void {
    if (!isIOS) return;
    const iosView = this.nativeViewProtected as UIView;
    iosView.setValueForKey(value, 'rotorGroup');
  };

  /**
   * @function removeRotorItem
   * common remove function for RotorContainerView
   * @param item ViewBase - the item to remove
   * @returns true if the item is removed
   */
  function removeRotorItem(item: ViewBase): boolean {
    if (!this.rotorGroups || !this.rotorGroups[item.rotorGroup]) return false;
    const group = this.rotorGroups[item.rotorGroup] as Array<ViewBase>;
    if (group.indexOf(item) < 0) return false;
    group.splice(group.indexOf(item), 1);
    return true;
  }
  /**
   * @function insertRotorItem
   * common insert function for RotorContainerView
   * @param item ViewBase - the item to insert into a rotorGroup
   * @param index number - (Optional) index for insertion
   * @returns true if item is inserted
   */
  function insertRotorItem(item: ViewBase, index: number = 0): boolean {
    if (!this.rotorGroups || !this.rotorGroups[item.rotorGroup]) return false;
    const group = this.rotorGroups[item.rotorGroup] as Array<ViewBase>;
    if (group.indexOf(item) > -1) return false;
    else group.splice(index, 0, item);
    return true;
  }
  /**
   * @function addRotorGroup
   * common function for RotorContainerView to add a new rotor group
   * @param name string - a name for the group. this is what VoiceOver will read.
   * @param items Array<ViewBase> - (Optional) items to include
   */
  function addRotorGroup(name: string, items?: Array<ViewBase>): void {
    if (!this.rotorGroups) this.rotorGroups = {};
    this.rotorGroups[name] = this.rotorGroups[name]?.concat(items) || items || [];
    this.rotorGroups[name].forEach((v) => v.once('unloaded', this.removeRotorItem.bind(this, v)));
    const iosView = this.nativeViewProtected as UIView;
    const rotors: NSMutableArray<UIAccessibilityCustomRotor> = <NSMutableArray<UIAccessibilityCustomRotor>>iosView.accessibilityCustomRotors || NSMutableArray.new();
    const rotor = UIAccessibilityCustomRotor.alloc().initWithNameItemSearchBlock(name, (predicate: UIAccessibilityCustomRotorSearchPredicate): UIAccessibilityCustomRotorItemResult => {
      const callback = this.rotorGroupCallbacks.get(name);
      const rotorItems = (<Array<View>>this.rotorGroups[name])
        .filter((item: View) => item.visibility === 'visible')
        .filter((item: View) => item.isEnabled)
        .map((item) => item.nativeViewProtected);
      const forward = predicate.searchDirection == UIAccessibilityCustomRotorDirection.Next;
      let target: UIView;
      let oldIndex: number = -1;
      let newIndex: number = -1;
      let newView: View = null;
      if (rotorItems.length > 0) {
        const iosOldView = predicate.currentItem.targetElement as UIView;
        oldIndex = rotorItems.indexOf(iosOldView);
        newIndex = forward ? oldIndex + 1 : oldIndex - 1;
        if (newIndex > rotorItems.length || newIndex < 0) target = null;
        else target = rotorItems[newIndex];
        newView = target ? (<Array<View>>this.rotorGroups[name]).find((v) => v.nativeViewProtected === target) : null;
      }
      if (!!callback) callback({ newView, newIndex, oldIndex, forward });
      return UIAccessibilityCustomRotorItemResult.alloc().initWithTargetElementTargetRange(target, null);
    });
    rotors.addObject(rotor);
    iosView.accessibilityCustomRotors = rotors;
  }

  const prototypeAsRotorContainer = (cls: Class) => {
    // wrap the container property
    const containerName = 'rotorContainer';
    //@ts-ignore
    const containerProperty = new Property<cls, boolean>({
      name: containerName,
      defaultValue: false,
      valueConverter: (value: string): boolean => value?.toLowerCase() === 'true',
    });
    containerProperty.register(cls);
    Object.defineProperty(cls.prototype, containerName, {
      value: false,
      enumerable: true,
      configurable: true,
      writable: true,
    });
    // wrap the group property
    const groupsName = 'rotorGroups';
    Object.defineProperty(cls.prototype, groupsName, {
      value: undefined,
      enumerable: true,
      configurable: true,
      writable: true,
    });
    // wrap the groupCallbacks map
    const groupCallbacks = 'rotorGroupCallbacks';
    Object.defineProperty(cls.prototype, groupCallbacks, {
      value: new Map(), // Map<string,Callback>
      enumerable: true,
      configurable: true,
      writable: false,
    });

    // set the common prototype functions
    cls.prototype['removeRotorItem'] = removeRotorItem;
    cls.prototype['insertRotorItem'] = insertRotorItem;
    cls.prototype['addRotorGroup'] = addRotorGroup;

    // override the `onLoaded` function of each prototype
    const _onLoaded = cls.prototype.onLoaded;
    Object.defineProperty(cls.prototype, 'onLoaded', {
      value: function onLoaded(): void {
        _onLoaded.call(this);
        setTimeout(() => {
          // console.log(this.constructor.name, this.rotorContainer);
          if (!isIOS || !this.rotorContainer) return;
          setupRotorGroups(this);
          const nativeContent = this.nativeViewProtected as UIView;
          nativeContent.isAccessibilityElement = false;
          setTimeout(() => {
            UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, nativeContent);
          });
        });
      },
    });
  };

  prototypeAsRotorContainer(ContentView);
  prototypeAsRotorContainer(LayoutBase);
}

/**
 * @function setupRotorGroups
 * Creates rotor groups for descrete navigation
 */
function setupRotorGroups(container: RotorContainerView): void {
  const rotorGroups = {};
  recurseChildrenForRotorGroups(container, rotorGroups);
  recurseParentsForPrevious(container, rotorGroups);
  sortRotorGroups(rotorGroups);
  container.rotorGroups = rotorGroups;
  //console.log(Object.keys(rotorGroups));
  Object.keys(rotorGroups).forEach((key) => {
    container.addRotorGroup(key, rotorGroups[key]);
  });
}
/**
 * @function recurseChildrenForRotorGroups
 * recursive function to find all children in a RotorContainerView that belong to a rotorGroup
 */
function recurseChildrenForRotorGroups(vb: ViewBase, rotorGroups: any): boolean {
  if (vb?.rotorGroup) {
    // console.log('add to rotorGroup', vb.constructor.name, vb.rotorGroup);
    if (rotorGroups[vb.rotorGroup] == undefined) rotorGroups[vb.rotorGroup] = [];
    rotorGroups[vb.rotorGroup].push(vb);
  }
  if (vb instanceof LayoutBase) vb.eachChild((child) => recurseChildrenForRotorGroups(child, rotorGroups));
  else if (vb instanceof ContentView) {
    recurseChildrenForRotorGroups(vb.content, rotorGroups);
  }
  return true;
}
function recurseParentsForPrevious(vb: ViewBase, rotorGroups: any): boolean {
  let parent = vb.parent;
  while (parent) {
    if ((parent instanceof LayoutBase || parent instanceof ContentView) && parent.rotorContainer) {
      rotorGroups['previous'] = [parent];
      return true;
    }
    parent = parent.parent;
  }
  return false;
}
/***
 * @function sortRotorGroups
 */
function sortRotorGroups(rotorGroups: any): void {
  Object.keys(rotorGroups).forEach((key) => {
    const group = rotorGroups[key] as Array<ViewBase>;
    group.sort((v1, v2) => {
      if (v1.rotorOrder > v2.rotorOrder) return 1;
      if (v1.rotorOrder < v2.rotorOrder) return -1;
      return 0;
    });
  });
}
