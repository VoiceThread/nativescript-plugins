# NativeScript Custom Roters ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png)

> @voicethread/nativescript-custom-rotors

The `nativescript-custom-rotors` adds easy to use properties to common {N} views to make them accessible to iOS Accessibility Custom Rotors. Accessibility Custom Rotors provide an elegant solution for screen-reader assisted navigation by associating views from various containers and geographies into a common a11y accessible group. Please see [this video from Apple WWDC2020](https://developer.apple.com/videos/play/wwdc2020/10116/) for more information on iOS Accessibility Custom Rotors

> NOTE: this plugin ONLY works on iOS. In android, the plugin functionality is ignored.

## Contents

- [NativeScript Custom Roters ](#nativescript-custom-roters-)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Expanded Classes](#expanded-classes)
  - [Usage](#usage)
  - [Advanced Usage](#advanced-usage)
  - [License](#license)

## Installation

```bash
npm install @voicethread/nativescript-custom-rotors
```

## Expanded Classes

`ViewBase` has been expanded with the following interface:

```typescript
interface RotorGroupItem {
  /**
   * @property rotorGroup
   * the name of the group that this view belongs to
   */
  rotorGroup: string;
  /**
   * @property rotorOrder
   * order within the rotor group. defaults to -1
   */
  rotorOrder: number;
}
```

`ContentView` and `BaseLayout` have been expanded with the following interface:

```typescript
interface RotorContainerView {
  /**
   * @property rotorContainer
   * set the view as a RotorContainer
   */
  rotorContainer: boolean;
  /**
   * rotorGroups
   * a map<string,Array<View>> of rotor names and associated views
   */
  rotorGroups: any;
  /**
   * rotorGroupCallback
   * a map<string,Callback> of rotor names and callbacks to execute
   */
  rotorGroupCallbacks: Map<string, Callback>;
  /**
   * @function removeRotorItem
   * removes a view from it's rotor group
   */
  removeRotorItem: (item: ViewBase) => boolean;
  /**
   * @function insertRotorItem
   * inserts an item into a rotor group at a specified index
   */
  insertRotorItem: (item: ViewBase, index?: number) => boolean;
  /**
   * @function addRotorGroup
   * adds a rotor group to a container
   */
  addRotorGroup: (name: string, items?: Array<ViewBase>) => void;
}
```

## Usage

initialize the custom-rotors plugin in
`app.ts`:

```javascript
...
import {initCustomRotors} from '@voicethread/nativescript-custom-rotors'
initCustomRotors();
...
Application.run(...);
```

then set a `ContentView` or a `BaseLayout` as a `rotorContainer`:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" navigatingTo="navigatingTo" class="page" rotorContainer="true" >
...
</Page>
```

or, in code:

```javascript
export function navigatingTo(e:NavigatedData):void {
  const page = e.object as Page;
  page.rotorContainer = true;
}
```

The `@nativescript/custom-rotor` plugin will traverse the children of the container to create and add elements to specified groups:

```xml
...
  <Button text="Group1 Button1" tap="{{ testIt }}" class="btn btn-primary" rotorGroup="group1"/>
  <Button text="Group1 Button2" tap="{{ testIt }}" class="btn btn-primary" rotorGroup="group1"/>
  <Button text="Group2 Button1" tap="{{ testIt }}" class="btn btn-primary" rotorGroup="group2"/>
  <Button text="Group2 Button2" tap="{{ testIt }}" class="btn btn-primary" rotorGroup="group2"/>
...
```

Custom elements will also be traversed, so you don't need to specify rotor groups all in one .xml or .ts/.js file.

## Advanced Usage

Individual elements can be part of their own rotor group, and custom handling can be provided to the CustomRotor. Consider a widget used to provide a rating for an item (inspired by [this tutorial on ios CustomRotors](https://bignerdranch.com/blog/implementing-voiceover-with-a-custom-rotor/).

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" navigatingTo="navigatingTo" class="page" rotorContainer="true" >
...
<GridLayout id="rating-bar" rows="90, *" columns="*,*,*,*,*" accessible="true" rotorGroup="rating" row="1" col="1">
  <GridLayout class='rating-item' row="1" col="0">
    <Label class='rating-text' horizontalAlignment='center' verticalAlignment='middle' text="1" />
  </GridLayout>
  <GridLayout class='rating-item' row="1" col="1">
    <Label class='rating-text' horizontalAlignment='center' verticalAlignment='middle' text="2" />
  </GridLayout>
  <GridLayout class='rating-item' row="1" col="2">
    <Label class='rating-text' horizontalAlignment='center' verticalAlignment='middle' text="3" />
  </GridLayout>
  <GridLayout class='rating-item' row="1" col="3">
    <Label class='rating-text' horizontalAlignment='center' verticalAlignment='middle' text="4" />
  </GridLayout>
  <GridLayout class='rating-item' row="1" col="4">
    <Label class='rating-text' horizontalAlignment='center' verticalAlignment='middle' text="5" />
  </GridLayout>
  <Label class='rating-desc' color="blue" text="dial rotor to 'rating' then flick up and down to change the rating" row="0" col="0" colSpan="5" textWrap="true"/>
</GridLayout>
...
</Page>
```

The `rating` rotor group functionality can be handled using something like this:

```typescript
export function navigatingTo(d: NavigatedData): void {
  const page = d.object as Page;
  page.rotorGroupCallbacks.set('rating', ({ forward }) => {
    incrementOrDecrementRating(page, forward);
  });
}

let rating = 0;
function incrementOrDecrementRating(page: Page, increment: boolean): void {
  rating = increment ? Math.min(rating + 1, 5) : Math.max(0, rating - 1);
  const ratingBar = page.getViewById('rating-bar') as GridLayout;
  for (let i = 0; i < ratingBar.getChildrenCount(); i++) {
    const view = ratingBar.getChildAt(i);
    view.backgroundColor = i < rating ? 'green' : 'transparent';
  }
}
```

## License

Apache License Version 2.0
