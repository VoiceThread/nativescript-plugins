/// <reference path="android-declarations.d.ts"/>

declare module org {
  export module mp4parser {
    export abstract class AbstractBoxParser extends org.mp4parser.BoxParser {
      public static class: java.lang.Class<org.mp4parser.AbstractBoxParser>;
      public parseBox(param0: java.nio.channels.ReadableByteChannel, param1: string): org.mp4parser.ParsableBox;
      public skippingBoxes(param0: androidNative.Array<string>): org.mp4parser.AbstractBoxParser;
      public createBox(param0: string, param1: androidNative.Array<number>, param2: string): org.mp4parser.ParsableBox;
      public constructor();
    }
  }
}

declare module org {
  export module mp4parser {
    export class BasicContainer extends org.mp4parser.Container {
      public static class: java.lang.Class<org.mp4parser.BasicContainer>;
      public addBox(param0: org.mp4parser.Box): void;
      public toString(): string;
      public initContainer(param0: java.nio.channels.ReadableByteChannel, param1: number, param2: org.mp4parser.BoxParser): void;
      public constructor(param0: java.util.List<org.mp4parser.Box>);
      public setBoxes(param0: java.util.List<any>): void;
      public getContainerSize(): number;
      public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
      public constructor();
      public getBoxes(): java.util.List<org.mp4parser.Box>;
      public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
      public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
    }
  }
}

declare module org {
  export module mp4parser {
    export class Box {
      public static class: java.lang.Class<org.mp4parser.Box>;
      /**
       * Constructs a new instance of the org.mp4parser.Box interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: { getType(): string; getSize(): number; getBox(param0: java.nio.channels.WritableByteChannel): void });
      public constructor();
      public getSize(): number;
      public getType(): string;
      public getBox(param0: java.nio.channels.WritableByteChannel): void;
    }
  }
}

declare module org {
  export module mp4parser {
    export class BoxParser {
      public static class: java.lang.Class<org.mp4parser.BoxParser>;
      /**
       * Constructs a new instance of the org.mp4parser.BoxParser interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: { parseBox(param0: java.nio.channels.ReadableByteChannel, param1: string): org.mp4parser.ParsableBox });
      public constructor();
      public parseBox(param0: java.nio.channels.ReadableByteChannel, param1: string): org.mp4parser.ParsableBox;
    }
  }
}

declare module org {
  export module mp4parser {
    export class Container {
      public static class: java.lang.Class<org.mp4parser.Container>;
      /**
       * Constructs a new instance of the org.mp4parser.Container interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: {
        getBoxes(): java.util.List<org.mp4parser.Box>;
        setBoxes(param0: java.util.List<any>): void;
        getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
        getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
        writeContainer(param0: java.nio.channels.WritableByteChannel): void;
      });
      public constructor();
      public setBoxes(param0: java.util.List<any>): void;
      public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
      public getBoxes(): java.util.List<org.mp4parser.Box>;
      public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
      public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
    }
  }
}

declare module org {
  export module mp4parser {
    export class FullBox extends org.mp4parser.ParsableBox {
      public static class: java.lang.Class<org.mp4parser.FullBox>;
      /**
       * Constructs a new instance of the org.mp4parser.FullBox interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: {
        getVersion(): number;
        setVersion(param0: number): void;
        getFlags(): number;
        setFlags(param0: number): void;
        parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
        getType(): string;
        getSize(): number;
        getBox(param0: java.nio.channels.WritableByteChannel): void;
      });
      public constructor();
      public setFlags(param0: number): void;
      public getFlags(): number;
      public setVersion(param0: number): void;
      public getSize(): number;
      public getType(): string;
      public getBox(param0: java.nio.channels.WritableByteChannel): void;
      public getVersion(): number;
      public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
    }
  }
}

declare module org {
  export module mp4parser {
    export class IsoFile extends org.mp4parser.BasicContainer {
      public static class: java.lang.Class<org.mp4parser.IsoFile>;
      public constructor(param0: java.util.List<org.mp4parser.Box>);
      public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
      public constructor(param0: java.nio.channels.ReadableByteChannel, param1: org.mp4parser.BoxParser);
      public constructor(param0: java.nio.channels.ReadableByteChannel);
      public constructor();
      public getSize(): number;
      public getBox(param0: java.nio.channels.WritableByteChannel): void;
      public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
      public getMovieBox(): org.mp4parser.boxes.iso14496.part12.MovieBox;
      public toString(): string;
      public static fourCCtoBytes(param0: string): androidNative.Array<number>;
      public setBoxes(param0: java.util.List<any>): void;
      public constructor(param0: java.io.File);
      public static bytesToFourCC(param0: androidNative.Array<number>): string;
      public close(): void;
      public getBoxes(): java.util.List<org.mp4parser.Box>;
      public constructor(param0: string);
      public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
    }
  }
}

declare module org {
  export module mp4parser {
    export class ParsableBox extends org.mp4parser.Box {
      public static class: java.lang.Class<org.mp4parser.ParsableBox>;
      /**
       * Constructs a new instance of the org.mp4parser.ParsableBox interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: {
        parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
        getType(): string;
        getSize(): number;
        getBox(param0: java.nio.channels.WritableByteChannel): void;
      });
      public constructor();
      public getSize(): number;
      public getType(): string;
      public getBox(param0: java.nio.channels.WritableByteChannel): void;
      public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
    }
  }
}

declare module org {
  export module mp4parser {
    export class PropertyBoxParserImpl extends org.mp4parser.AbstractBoxParser {
      public static class: java.lang.Class<org.mp4parser.PropertyBoxParserImpl>;
      public static BOX_MAP_CACHE: java.util.Properties;
      public mapping: java.util.Properties;
      public parseBox(param0: java.nio.channels.ReadableByteChannel, param1: string): org.mp4parser.ParsableBox;
      public constructor(param0: java.util.Properties);
      public createBox(param0: string, param1: androidNative.Array<number>, param2: string): org.mp4parser.ParsableBox;
      public invoke(param0: string, param1: androidNative.Array<number>, param2: string): void;
      public constructor(param0: androidNative.Array<string>);
      public constructor();
    }
  }
}

declare module org {
  export module mp4parser {
    export class RewindableReadableByteChannel {
      public static class: java.lang.Class<org.mp4parser.RewindableReadableByteChannel>;
      public constructor(param0: java.nio.channels.ReadableByteChannel, param1: number);
      public isOpen(): boolean;
      public close(): void;
      public read(param0: java.nio.ByteBuffer): number;
      public rewind(): void;
    }
  }
}

declare module org {
  export module mp4parser {
    export class SkipBox extends org.mp4parser.ParsableBox {
      public static class: java.lang.Class<org.mp4parser.SkipBox>;
      public getSourcePosition(): number;
      public constructor(param0: string, param1: androidNative.Array<number>, param2: string);
      public getSize(): number;
      public getContentSize(): number;
      public getType(): string;
      public getBox(param0: java.nio.channels.WritableByteChannel): void;
      public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
    }
  }
}

declare module org {
  export module mp4parser {
    export class Version {
      public static class: java.lang.Class<org.mp4parser.Version>;
      public static VERSION: string;
      public constructor();
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export class UnknownBox extends org.mp4parser.support.AbstractBox {
        public static class: java.lang.Class<org.mp4parser.boxes.UnknownBox>;
        public setData(param0: java.nio.ByteBuffer): void;
        public getData(): java.nio.ByteBuffer;
        public constructor(param0: string, param1: androidNative.Array<number>);
        public _parseDetails(param0: java.nio.ByteBuffer): void;
        public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
        public toString(): string;
        public constructor(param0: string);
        public getContentSize(): number;
        public getContent(param0: java.nio.ByteBuffer): void;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export class UserBox extends org.mp4parser.support.AbstractBox {
        public static class: java.lang.Class<org.mp4parser.boxes.UserBox>;
        public static TYPE: string;
        public constructor(param0: androidNative.Array<number>);
        public constructor(param0: string, param1: androidNative.Array<number>);
        public getData(): androidNative.Array<number>;
        public _parseDetails(param0: java.nio.ByteBuffer): void;
        public setData(param0: androidNative.Array<number>): void;
        public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
        public toString(): string;
        public constructor(param0: string);
        public getContentSize(): number;
        public getContent(param0: java.nio.ByteBuffer): void;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module adobe {
        export class ActionMessageFormat0SampleEntryBox extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.adobe.ActionMessageFormat0SampleEntryBox>;
          public static TYPE: string;
          public getDataReferenceIndex(): number;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public constructor(param0: string);
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setDataReferenceIndex(param0: number): void;
          public getSize(): number;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleAlbumBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleAlbumBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleAppleIdBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleAppleIdBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleArtist2Box extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleArtist2Box>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleArtistBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleArtistBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleCommentBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleCommentBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleCompilationBox extends org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleCompilationBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleCopyrightBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleCopyrightBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleCountryTypeBoxBox extends org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleCountryTypeBoxBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleCoverBox extends org.mp4parser.boxes.apple.AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleCoverBox>;
          public parseData(param0: java.nio.ByteBuffer): void;
          public getCoverData(): androidNative.Array<number>;
          public getDataLength(): number;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public setJpg(param0: androidNative.Array<number>): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public writeData(): androidNative.Array<number>;
          public constructor(param0: string, param1: number);
          public setPng(param0: androidNative.Array<number>): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export abstract class AppleDataBox extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleDataBox>;
          public getContent(param0: java.nio.ByteBuffer): void;
          public parseData(param0: java.nio.ByteBuffer): void;
          public getDataType(): number;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public getLanguageString(): string;
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public getDataLanguage(): number;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getDataCountry(): number;
          public writeData(): androidNative.Array<number>;
          public setDataLanguage(param0: number): void;
          public writeDataLength4ccTypeCountryLanguage(param0: java.nio.ByteBuffer): void;
          public setDataCountry(param0: number): void;
          public parseDataLength4ccTypeCountryLanguageAndReturnRest(param0: java.nio.ByteBuffer): java.nio.ByteBuffer;
          public getDataLength(): number;
          public constructor(param0: string, param1: number);
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleDataRateBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleDataRateBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public getDataRate(): number;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public getFlags(): number;
          public getVersion(): number;
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleDataReferenceBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleDataReferenceBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public getVersion(): number;
          public getDataReferenceSize(): number;
          public getDataReference(): string;
          public constructor();
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getContentSize(): number;
          public getDataReferenceType(): string;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleDescriptionBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleDescriptionBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleDiskNumberBox extends org.mp4parser.boxes.apple.AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleDiskNumberBox>;
          public parseData(param0: java.nio.ByteBuffer): void;
          public setB(param0: number): void;
          public getDataLength(): number;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public writeData(): androidNative.Array<number>;
          public setA(param0: number): void;
          public constructor(param0: string, param1: number);
          public getA(): number;
          public getB(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleEncoderBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleEncoderBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleGPSCoordinatesBox extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleGPSCoordinatesBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public getValue(): string;
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public toString(): string;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public setValue(param0: string): void;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleGaplessPlaybackBox extends org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleGaplessPlaybackBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleGenreBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleGenreBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleGenreIDBox extends org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleGenreIDBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleGroupingBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleGroupingBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleItemListBox extends org.mp4parser.support.AbstractContainerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleItemListBox>;
          public static TYPE: string;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public getBoxes(): java.util.List<org.mp4parser.Box>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleLongDescriptionBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleLongDescriptionBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleLosslessSpecificBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleLosslessSpecificBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getKModifier(): number;
          public getFlags(): number;
          public setHistoryMult(param0: number): void;
          public getHistoryMult(): number;
          public getSampleRate(): number;
          public setSampleSize(param0: number): void;
          public constructor();
          public setFlags(param0: number): void;
          public setUnknown1(param0: number): void;
          public getInitialHistory(): number;
          public getUnknown2(): number;
          public setSampleRate(param0: number): void;
          public setMaxSamplePerFrame(param0: number): void;
          public setInitialHistory(param0: number): void;
          public getVersion(): number;
          public getUnknown1(): number;
          public getChannels(): number;
          public getMaxSamplePerFrame(): number;
          public getSampleSize(): number;
          public setVersion(param0: number): void;
          public setUnknown2(param0: number): void;
          public getMaxCodedFrameSize(): number;
          public setBitRate(param0: number): void;
          public setMaxCodedFrameSize(param0: number): void;
          public getBitRate(): number;
          public getContentSize(): number;
          public setChannels(param0: number): void;
          public setKModifier(param0: number): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleLyricsBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleLyricsBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleMediaTypeBox extends org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleMediaTypeBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleNameBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleNameBox>;
          public static TYPE: string;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class ApplePurchaseDateBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.ApplePurchaseDateBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleRecordingYear2Box extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleRecordingYear2Box>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleRecordingYearBox extends org.mp4parser.boxes.apple.AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleRecordingYearBox>;
          public static rfc822toIso8601Date(param0: string): string;
          public parseData(param0: java.nio.ByteBuffer): void;
          public getDataLength(): number;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public writeData(): androidNative.Array<number>;
          public constructor(param0: string, param1: number);
          public getDate(): java.util.Date;
          public static iso8601toRfc822Date(param0: string): string;
          public setDate(param0: java.util.Date): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleReferenceMovieBox extends org.mp4parser.support.AbstractContainerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleReferenceMovieBox>;
          public static TYPE: string;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public getBoxes(): java.util.List<org.mp4parser.Box>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleReferenceMovieDescriptorBox extends org.mp4parser.support.AbstractContainerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleReferenceMovieDescriptorBox>;
          public static TYPE: string;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public getBoxes(): java.util.List<org.mp4parser.Box>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleShortDescriptionBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleShortDescriptionBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleSortAlbumBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleSortAlbumBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleTVEpisodeBox extends org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleTVEpisodeBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleTVEpisodeNumberBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleTVEpisodeNumberBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleTVNetworkBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleTVNetworkBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleTVSeasonBox extends org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleTVSeasonBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleTVShowBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleTVShowBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleTempoBox extends org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleTempoBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleTrackAuthorBox extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleTrackAuthorBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleTrackNumberBox extends org.mp4parser.boxes.apple.AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleTrackNumberBox>;
          public parseData(param0: java.nio.ByteBuffer): void;
          public setB(param0: number): void;
          public getDataLength(): number;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public writeData(): androidNative.Array<number>;
          public setA(param0: number): void;
          public constructor(param0: string, param1: number);
          public getA(): number;
          public getB(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export abstract class AppleVariableSignedIntegerBox extends org.mp4parser.boxes.apple.AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox>;
          public parseData(param0: java.nio.ByteBuffer): void;
          public getDataLength(): number;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getIntLength(): number;
          public setIntLength(param0: number): void;
          public writeData(): androidNative.Array<number>;
          public getValue(): number;
          public constructor(param0: string, param1: number);
          public setValue(param0: number): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class AppleWaveBox extends org.mp4parser.support.AbstractContainerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.AppleWaveBox>;
          public static TYPE: string;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public getBoxes(): java.util.List<org.mp4parser.Box>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class Apple_atIDBox extends org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.Apple_atIDBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class Apple_flvr_Box extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.Apple_flvr_Box>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class Apple_geIDBox extends org.mp4parser.boxes.apple.AppleVariableSignedIntegerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.Apple_geIDBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class Apple_xid_Box extends org.mp4parser.boxes.apple.Utf8AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.Apple_xid_Box>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public constructor(param0: string, param1: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class BaseMediaInfoAtom extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.BaseMediaInfoAtom>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public getOpColorR(): number;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getReserved(): number;
          public setBalance(param0: number): void;
          public getFlags(): number;
          public getVersion(): number;
          public setReserved(param0: number): void;
          public getOpColorG(): number;
          public getGraphicsMode(): number;
          public toString(): string;
          public setOpColorR(param0: number): void;
          public constructor();
          public setOpColorG(param0: number): void;
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public setOpColorB(param0: number): void;
          public getOpColorB(): number;
          public getContentSize(): number;
          public setGraphicsMode(param0: number): void;
          public getBalance(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class CleanApertureAtom extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.CleanApertureAtom>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public setWidth(param0: number): void;
          public getHeight(): number;
          public getFlags(): number;
          public getVersion(): number;
          public setHeight(param0: number): void;
          public getWidth(): number;
          public constructor();
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class GenericMediaHeaderAtom extends org.mp4parser.support.AbstractContainerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.GenericMediaHeaderAtom>;
          public static TYPE: string;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public getBoxes(): java.util.List<org.mp4parser.Box>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class GenericMediaHeaderTextAtom extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.GenericMediaHeaderTextAtom>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public getUnknown_9(): number;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public setUnknown_2(param0: number): void;
          public getUnknown_6(): number;
          public getUnknown_2(): number;
          public constructor();
          public setUnknown_8(param0: number): void;
          public getUnknown_5(): number;
          public setUnknown_6(param0: number): void;
          public setUnknown_4(param0: number): void;
          public setUnknown_1(param0: number): void;
          public setUnknown_3(param0: number): void;
          public getUnknown_4(): number;
          public getUnknown_1(): number;
          public getUnknown_8(): number;
          public setUnknown_7(param0: number): void;
          public setUnknown_9(param0: number): void;
          public getUnknown_3(): number;
          public setUnknown_5(param0: number): void;
          public getUnknown_7(): number;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class PixelAspectRationAtom extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.PixelAspectRationAtom>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public gethSpacing(): number;
          public sethSpacing(param0: number): void;
          public getvSpacing(): number;
          public getContentSize(): number;
          public setvSpacing(param0: number): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class QuicktimeTextSampleEntry extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.QuicktimeTextSampleEntry>;
          public static TYPE: string;
          public getDisplayFlags(): number;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public setTextJustification(param0: number): void;
          public getBackgroundR(): number;
          public getReserved2(): number;
          public setBackgroundR(param0: number): void;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setDataReferenceIndex(param0: number): void;
          public getSize(): number;
          public setReserved2(param0: number): void;
          public setFontFace(param0: number): void;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public getForegroundB(): number;
          public constructor();
          public getDefaultTextBox(): number;
          public getForegroundG(): number;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public setBackgroundG(param0: number): void;
          public getReserved3(): number;
          public getBackgroundG(): number;
          public setDisplayFlags(param0: number): void;
          public setDefaultTextBox(param0: number): void;
          public getForegroundR(): number;
          public getFontName(): string;
          public getDataReferenceIndex(): number;
          public setForegroundG(param0: number): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public getFontFace(): number;
          public setForegroundR(param0: number): void;
          public getReserved1(): number;
          public setFontNumber(param0: number): void;
          public setReserved1(param0: number): void;
          public getFontNumber(): number;
          public setReserved3(param0: number): void;
          public addBox(param0: org.mp4parser.Box): void;
          public getBackgroundB(): number;
          public getTextJustification(): number;
          public setBoxes(param0: java.util.List<any>): void;
          public setFontName(param0: string): void;
          public setBackgroundB(param0: number): void;
          public setForegroundB(param0: number): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class TimeCodeBox extends org.mp4parser.support.AbstractBox implements org.mp4parser.boxes.sampleentry.SampleEntry, org.mp4parser.Container {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.TimeCodeBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public getFlags(): number;
          public setFrameDuration(param0: number): void;
          public getReserved2(): number;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setDataReferenceIndex(param0: number): void;
          public getSize(): number;
          public setReserved2(param0: number): void;
          public toString(): string;
          public getNumberOfFrames(): number;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public constructor();
          public setFlags(param0: number): void;
          public getType(): string;
          public getDataReferenceIndex(): number;
          public getTimeScale(): number;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public getReserved1(): number;
          public setTimeScale(param0: number): void;
          public setNumberOfFrames(param0: number): void;
          public setReserved1(param0: number): void;
          public getRest(): androidNative.Array<number>;
          public getFrameDuration(): number;
          public setRest(param0: androidNative.Array<number>): void;
          public setBoxes(param0: java.util.List<any>): void;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class TrackApertureModeDimensionAtom extends org.mp4parser.support.AbstractContainerBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.TrackApertureModeDimensionAtom>;
          public static TYPE: string;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public getBoxes(): java.util.List<org.mp4parser.Box>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class TrackEncodedPixelsDimensionsAtom extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.TrackEncodedPixelsDimensionsAtom>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public setWidth(param0: number): void;
          public getHeight(): number;
          public getFlags(): number;
          public getVersion(): number;
          public setHeight(param0: number): void;
          public getWidth(): number;
          public constructor();
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class TrackLoadSettingsAtom extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.TrackLoadSettingsAtom>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public setDefaultHints(param0: number): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getPreloadDuration(): number;
          public setPreloadFlags(param0: number): void;
          public getDefaultHints(): number;
          public setPreloadStartTime(param0: number): void;
          public constructor();
          public getPreloadFlags(): number;
          public setPreloadDuration(param0: number): void;
          public getContentSize(): number;
          public getPreloadStartTime(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export class TrackProductionApertureDimensionsAtom extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.TrackProductionApertureDimensionsAtom>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public setWidth(param0: number): void;
          public getHeight(): number;
          public getFlags(): number;
          public getVersion(): number;
          public setHeight(param0: number): void;
          public getWidth(): number;
          public constructor();
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module apple {
        export abstract class Utf8AppleDataBox extends org.mp4parser.boxes.apple.AppleDataBox {
          public static class: java.lang.Class<org.mp4parser.boxes.apple.Utf8AppleDataBox>;
          public parseData(param0: java.nio.ByteBuffer): void;
          public getDataLength(): number;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public getValue(): string;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public writeData(): androidNative.Array<number>;
          public constructor(param0: string, param1: number);
          public setValue(param0: string): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module dece {
        export class AssetInformationBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.dece.AssetInformationBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public setHidden(param0: boolean): void;
          public getFlags(): number;
          public getVersion(): number;
          public isHidden(): boolean;
          public getProfileVersion(): string;
          public getApid(): string;
          public setApid(param0: string): void;
          public constructor();
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public setProfileVersion(param0: string): void;
          public getContentSize(): number;
        }
        export module AssetInformationBox {
          export class Entry {
            public static class: java.lang.Class<org.mp4parser.boxes.dece.AssetInformationBox.Entry>;
            public namespace: string;
            public profileLevelIdc: string;
            public assetId: string;
            public constructor(param0: string, param1: string, param2: string);
            public getSize(): number;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module dece {
        export class AvcNalUnitStorageBox extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.dece.AvcNalUnitStorageBox>;
          public static TYPE: string;
          public getSequenceParameterSetExtsAsStrings(): java.util.List<string>;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getPictureParameterSetsAsStrings(): java.util.List<string>;
          public getLengthSizeMinusOne(): number;
          public toString(): string;
          public constructor();
          public constructor(param0: org.mp4parser.boxes.iso14496.part15.AvcConfigurationBox);
          public getContentSize(): number;
          public getAvcDecoderConfigurationRecord(): org.mp4parser.boxes.iso14496.part15.AvcDecoderConfigurationRecord;
          public getSequenceParameterSetsAsStrings(): java.util.List<string>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module dece {
        export class BaseLocationBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.dece.BaseLocationBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public setBaseLocation(param0: string): void;
          public getFlags(): number;
          public getVersion(): number;
          public getPurchaseLocation(): string;
          public constructor(param0: string, param1: string);
          public equals(param0: any): boolean;
          public toString(): string;
          public constructor();
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getBaseLocation(): string;
          public setPurchaseLocation(param0: string): void;
          public hashCode(): number;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module dece {
        export class ContentInformationBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.dece.ContentInformationBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public getIdEntries(): java.util.Map<string, string>;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public setProtection(param0: string): void;
          public getMimeSubtypeName(): string;
          public constructor();
          public setIdEntries(param0: java.util.Map<string, string>): void;
          public setFlags(param0: number): void;
          public getBrandEntries(): java.util.Map<string, string>;
          public setLanguages(param0: string): void;
          public getVersion(): number;
          public setMimeSubtypeName(param0: string): void;
          public getProtection(): string;
          public setProfileLevelIdc(param0: string): void;
          public getProfileLevelIdc(): string;
          public setCodecs(param0: string): void;
          public setBrandEntries(param0: java.util.Map<string, string>): void;
          public setVersion(param0: number): void;
          public getCodecs(): string;
          public getLanguages(): string;
          public getContentSize(): number;
        }
        export module ContentInformationBox {
          export class BrandEntry {
            public static class: java.lang.Class<org.mp4parser.boxes.dece.ContentInformationBox.BrandEntry>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public constructor(param0: string, param1: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module dece {
        export class TrickPlayBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.dece.TrickPlayBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public getVersion(): number;
          public setEntries(param0: java.util.List<org.mp4parser.boxes.dece.TrickPlayBox.Entry>): void;
          public toString(): string;
          public constructor();
          public getEntries(): java.util.List<org.mp4parser.boxes.dece.TrickPlayBox.Entry>;
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getContentSize(): number;
        }
        export module TrickPlayBox {
          export class Entry {
            public static class: java.lang.Class<org.mp4parser.boxes.dece.TrickPlayBox.Entry>;
            public constructor();
            public constructor(param0: number);
            public setDependencyLevel(param0: number): void;
            public getPicType(): number;
            public setPicType(param0: number): void;
            public toString(): string;
            public getDependencyLevel(): number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module dolby {
        export class AC3SpecificBox extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.dolby.AC3SpecificBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public setBsmod(param0: number): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getReserved(): number;
          public setFscod(param0: number): void;
          public setBitRateCode(param0: number): void;
          public setReserved(param0: number): void;
          public getBitRateCode(): number;
          public getLfeon(): number;
          public setBsid(param0: number): void;
          public toString(): string;
          public setAcmod(param0: number): void;
          public getBsmod(): number;
          public setLfeon(param0: number): void;
          public constructor();
          public getBsid(): number;
          public getFscod(): number;
          public getContentSize(): number;
          public getAcmod(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module dolby {
        export class DTSSpecificBox extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.dolby.DTSSpecificBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getReserved(): number;
          public getPcmSampleDepth(): number;
          public setFrameDuration(param0: number): void;
          public getCoreSize(): number;
          public setRepresentationType(param0: number): void;
          public setMaxBitRate(param0: number): void;
          public getLBRDurationMod(): number;
          public getCoreLFEPresent(): number;
          public setLBRDurationMod(param0: number): void;
          public constructor();
          public getReservedBoxPresent(): number;
          public getDashAudioChannelConfiguration(): androidNative.Array<number>;
          public setChannelLayout(param0: number): void;
          public getCoreLayout(): number;
          public setCoreSize(param0: number): void;
          public getDTSSamplingFrequency(): number;
          public setPcmSampleDepth(param0: number): void;
          public setMultiAssetFlag(param0: number): void;
          public setCoreLayout(param0: number): void;
          public getStreamConstruction(): number;
          public setCoreLFEPresent(param0: number): void;
          public getAvgBitRate(): number;
          public getChannelLayout(): number;
          public setReserved(param0: number): void;
          public setAvgBitRate(param0: number): void;
          public getStereoDownmix(): number;
          public getRepresentationType(): number;
          public setStreamConstruction(param0: number): void;
          public getMultiAssetFlag(): number;
          public getFrameDuration(): number;
          public setDTSSamplingFrequency(param0: number): void;
          public setStereoDownmix(param0: number): void;
          public getContentSize(): number;
          public setReservedBoxPresent(param0: number): void;
          public getMaxBitRate(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module dolby {
        export class DoViConfigurationBox extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.dolby.DoViConfigurationBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public setDvProfile(param0: number): void;
          public getReserved2(): number;
          public setReserved4(param0: number): void;
          public setReserved2(param0: number): void;
          public isRpuPresentFlag(): boolean;
          public getDvProfile(): number;
          public constructor();
          public getReserved3(): number;
          public setDvLevel(param0: number): void;
          public isBlPresentFlag(): boolean;
          public setRpuPresentFlag(param0: boolean): void;
          public setDvVersionMinor(param0: number): void;
          public setBlPresentFlag(param0: boolean): void;
          public getReserved4(): number;
          public getReserved1(): number;
          public setElPresentFlag(param0: boolean): void;
          public setReserved1(param0: number): void;
          public setReserved5(param0: number): void;
          public getDvVersionMinor(): number;
          public setReserved3(param0: number): void;
          public getReserved5(): number;
          public isElPresentFlag(): boolean;
          public setDvVersionMajor(param0: number): void;
          public getDvVersionMajor(): number;
          public getDvLevel(): number;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module dolby {
        export class EC3SpecificBox extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.dolby.EC3SpecificBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public addEntry(param0: org.mp4parser.boxes.dolby.EC3SpecificBox.Entry): void;
          public setNumIndSub(param0: number): void;
          public setDataRate(param0: number): void;
          public getDataRate(): number;
          public setEntries(param0: java.util.List<org.mp4parser.boxes.dolby.EC3SpecificBox.Entry>): void;
          public getEntries(): java.util.List<org.mp4parser.boxes.dolby.EC3SpecificBox.Entry>;
          public constructor();
          public getNumIndSub(): number;
          public getContentSize(): number;
        }
        export module EC3SpecificBox {
          export class Entry {
            public static class: java.lang.Class<org.mp4parser.boxes.dolby.EC3SpecificBox.Entry>;
            public fscod: number;
            public bsid: number;
            public bsmod: number;
            public acmod: number;
            public lfeon: number;
            public reserved: number;
            public num_dep_sub: number;
            public chan_loc: number;
            public reserved2: number;
            public constructor();
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module dolby {
        export class MLPSpecificBox extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.dolby.MLPSpecificBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getReserved(): number;
          public getReserved2(): number;
          public getFormat_info(): number;
          public setReserved(param0: number): void;
          public setFormat_info(param0: number): void;
          public setReserved2(param0: number): void;
          public setPeak_data_rate(param0: number): void;
          public constructor();
          public getPeak_data_rate(): number;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class AudioSpecificConfig extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.AudioSpecificConfig>;
              public static samplingFrequencyIndexMap: java.util.Map<java.lang.Integer, java.lang.Integer>;
              public static audioObjectTypeMap: java.util.Map<java.lang.Integer, string>;
              public eldSpecificConfig: org.mp4parser.boxes.iso14496.part1.objectdescriptors.AudioSpecificConfig.ELDSpecificConfig;
              public audioObjectType: number;
              public originalAudioObjectType: number;
              public samplingFrequencyIndex: number;
              public samplingFrequency: number;
              public channelConfiguration: number;
              public extensionAudioObjectType: number;
              public origExtensionAudioObjectType: number;
              public sbrPresentFlag: boolean;
              public psPresentFlag: boolean;
              public extensionSamplingFrequencyIndex: number;
              public extensionSamplingFrequency: number;
              public extensionChannelConfiguration: number;
              public sacPayloadEmbedding: number;
              public fillBits: number;
              public epConfig: number;
              public directMapping: number;
              public syncExtensionType: number;
              public innerSyncExtensionType: number;
              public outerSyncExtensionType: number;
              public frameLengthFlag: number;
              public dependsOnCoreCoder: number;
              public coreCoderDelay: number;
              public extensionFlag: number;
              public layerNr: number;
              public numOfSubFrame: number;
              public layer_length: number;
              public aacSectionDataResilienceFlag: boolean;
              public aacScalefactorDataResilienceFlag: boolean;
              public aacSpectralDataResilienceFlag: boolean;
              public extensionFlag3: number;
              public gaSpecificConfig: boolean;
              public isBaseLayer: number;
              public paraMode: number;
              public paraExtensionFlag: number;
              public hvxcVarMode: number;
              public hvxcRateMode: number;
              public erHvxcExtensionFlag: number;
              public var_ScalableFlag: number;
              public hilnQuantMode: number;
              public hilnMaxNumLine: number;
              public hilnSampleRateCode: number;
              public hilnFrameLength: number;
              public hilnContMode: number;
              public hilnEnhaLayer: number;
              public hilnEnhaQuantMode: number;
              public parametricSpecificConfig: boolean;
              public constructor();
              public getAudioObjectType(): number;
              public getChannelConfiguration(): number;
              public hashCode(): number;
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public setOriginalAudioObjectType(param0: number): void;
              public getExtensionAudioObjectType(): number;
              public serializeConfigBytes(): java.nio.ByteBuffer;
              public toString(): string;
              public setSamplingFrequency(param0: number): void;
              public getContentSize(): number;
              public serialize(): java.nio.ByteBuffer;
              public getConfigBytes(): androidNative.Array<number>;
              public setAudioObjectType(param0: number): void;
              public getExtensionSamplingFrequency(): number;
              public setSamplingFrequencyIndex(param0: number): void;
              public setChannelConfiguration(param0: number): void;
              public equals(param0: any): boolean;
              public getSamplingFrequency(): number;
            }
            export module AudioSpecificConfig {
              export class ELDSpecificConfig {
                public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.AudioSpecificConfig.ELDSpecificConfig>;
                public frameLengthFlag: boolean;
                public aacSectionDataResilienceFlag: boolean;
                public aacScalefactorDataResilienceFlag: boolean;
                public aacSpectralDataResilienceFlag: boolean;
                public ldSbrPresentFlag: boolean;
                public ldSbrSamplingRate: boolean;
                public ldSbrCrcFlag: boolean;
                public constructor(
                  param0: org.mp4parser.boxes.iso14496.part1.objectdescriptors.AudioSpecificConfig,
                  param1: number,
                  param2: org.mp4parser.boxes.iso14496.part1.objectdescriptors.BitReaderBuffer
                );
                public ld_sbr_header(param0: number, param1: org.mp4parser.boxes.iso14496.part1.objectdescriptors.BitReaderBuffer): void;
              }
              export class sbr_header {
                public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.AudioSpecificConfig.sbr_header>;
                public bs_amp_res: boolean;
                public bs_start_freq: number;
                public bs_stop_freq: number;
                public bs_xover_band: number;
                public bs_reserved: number;
                public bs_header_extra_1: boolean;
                public bs_header_extra_2: boolean;
                public bs_freq_scale: number;
                public bs_alter_scale: boolean;
                public bs_noise_bands: number;
                public bs_limiter_bands: number;
                public bs_limiter_gains: number;
                public bs_interpol_freq: boolean;
                public bs_smoothing_mode: boolean;
                public constructor(param0: org.mp4parser.boxes.iso14496.part1.objectdescriptors.AudioSpecificConfig, param1: org.mp4parser.boxes.iso14496.part1.objectdescriptors.BitReaderBuffer);
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export abstract class BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor>;
              public constructor();
              public writeSize(param0: java.nio.ByteBuffer, param1: number): void;
              public getTag(): number;
              public serialize(): java.nio.ByteBuffer;
              public getSize(): number;
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public toString(): string;
              public getSizeSize(): number;
              public parse(param0: number, param1: java.nio.ByteBuffer): void;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class BitReaderBuffer {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.BitReaderBuffer>;
              public constructor(param0: java.nio.ByteBuffer);
              public getPosition(): number;
              public readBool(): boolean;
              public remainingBits(): number;
              public readBits(param0: number): number;
              public byteSync(): number;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class BitWriterBuffer {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.BitWriterBuffer>;
              public constructor(param0: java.nio.ByteBuffer);
              public writeBool(param0: boolean): void;
              public writeBits(param0: number, param1: number): void;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class DecoderConfigDescriptor extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.DecoderConfigDescriptor>;
              public constructor();
              public getStreamType(): number;
              public setStreamType(param0: number): void;
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public setBufferSizeDB(param0: number): void;
              public setMaxBitRate(param0: number): void;
              public getMaxBitRate(): number;
              public setAudioSpecificInfo(param0: org.mp4parser.boxes.iso14496.part1.objectdescriptors.AudioSpecificConfig): void;
              public getProfileLevelIndicationDescriptors(): java.util.List<org.mp4parser.boxes.iso14496.part1.objectdescriptors.ProfileLevelIndicationDescriptor>;
              public getBufferSizeDB(): number;
              public toString(): string;
              public getUpStream(): number;
              public getAudioSpecificInfo(): org.mp4parser.boxes.iso14496.part1.objectdescriptors.AudioSpecificConfig;
              public setUpStream(param0: number): void;
              public serialize(): java.nio.ByteBuffer;
              public getObjectTypeIndication(): number;
              public getDecoderSpecificInfo(): org.mp4parser.boxes.iso14496.part1.objectdescriptors.DecoderSpecificInfo;
              public setDecoderSpecificInfo(param0: org.mp4parser.boxes.iso14496.part1.objectdescriptors.DecoderSpecificInfo): void;
              public getAvgBitRate(): number;
              public setObjectTypeIndication(param0: number): void;
              public setAvgBitRate(param0: number): void;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class DecoderSpecificInfo extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.DecoderSpecificInfo>;
              public constructor();
              public serialize(): java.nio.ByteBuffer;
              public setData(param0: androidNative.Array<number>): void;
              public hashCode(): number;
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public toString(): string;
              public equals(param0: any): boolean;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class Descriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.Descriptor>;
              /**
               * Constructs a new instance of the org.mp4parser.boxes.iso14496.part1.objectdescriptors.Descriptor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
               */
              public constructor(implementation: { tags(): androidNative.Array<number>; objectTypeIndication(): number });
              public constructor();
              public objectTypeIndication(): number;
              public tags(): androidNative.Array<number>;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class ESDescriptor extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.ESDescriptor>;
              public setRemoteODFlag(param0: number): void;
              public setoCRstreamFlag(param0: number): void;
              public hashCode(): number;
              public getStreamDependenceFlag(): number;
              public toString(): string;
              public getoCRstreamFlag(): number;
              public getOtherDescriptors(): java.util.List<org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor>;
              public setEsId(param0: number): void;
              public setoCREsId(param0: number): void;
              public getURLString(): string;
              public setURLFlag(param0: number): void;
              public getDependsOnEsId(): number;
              public setStreamPriority(param0: number): void;
              public getStreamPriority(): number;
              public getDecoderConfigDescriptor(): org.mp4parser.boxes.iso14496.part1.objectdescriptors.DecoderConfigDescriptor;
              public getURLFlag(): number;
              public constructor();
              public setURLString(param0: string): void;
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public setDependsOnEsId(param0: number): void;
              public getoCREsId(): number;
              public setDecoderConfigDescriptor(param0: org.mp4parser.boxes.iso14496.part1.objectdescriptors.DecoderConfigDescriptor): void;
              public setURLLength(param0: number): void;
              public setStreamDependenceFlag(param0: number): void;
              public getEsId(): number;
              public getURLLength(): number;
              public serialize(): java.nio.ByteBuffer;
              public setSlConfigDescriptor(param0: org.mp4parser.boxes.iso14496.part1.objectdescriptors.SLConfigDescriptor): void;
              public getRemoteODFlag(): number;
              public getSlConfigDescriptor(): org.mp4parser.boxes.iso14496.part1.objectdescriptors.SLConfigDescriptor;
              public equals(param0: any): boolean;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class ExtensionDescriptor extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.ExtensionDescriptor>;
              public constructor();
              public serialize(): java.nio.ByteBuffer;
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public toString(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class ExtensionProfileLevelDescriptor extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.ExtensionProfileLevelDescriptor>;
              public constructor();
              public serialize(): java.nio.ByteBuffer;
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public toString(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export abstract class InitialObjectDescriptor extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.ObjectDescriptorBase {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.InitialObjectDescriptor>;
              public constructor();
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public toString(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export abstract class ObjectDescriptorBase extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.ObjectDescriptorBase>;
              public constructor();
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class ObjectDescriptorFactory {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.ObjectDescriptorFactory>;
              public static LOG: org.slf4j.Logger;
              public static descriptorRegistry: java.util.Map<java.lang.Integer, java.util.Map<java.lang.Integer, java.lang.Class<any>>>;
              public constructor();
              public static createFrom(param0: number, param1: java.nio.ByteBuffer): org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class ProfileLevelIndicationDescriptor extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.ProfileLevelIndicationDescriptor>;
              public constructor();
              public serialize(): java.nio.ByteBuffer;
              public hashCode(): number;
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public toString(): string;
              public equals(param0: any): boolean;
              public getContentSize(): number;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class SLConfigDescriptor extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.SLConfigDescriptor>;
              public constructor();
              public serialize(): java.nio.ByteBuffer;
              public hashCode(): number;
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public toString(): string;
              public setPredefined(param0: number): void;
              public getPredefined(): number;
              public equals(param0: any): boolean;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part1 {
          export module objectdescriptors {
            export class UnknownDescriptor extends org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part1.objectdescriptors.UnknownDescriptor>;
              public constructor();
              public serialize(): java.nio.ByteBuffer;
              public parseDetail(param0: java.nio.ByteBuffer): void;
              public toString(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export abstract class AbstractMediaHeaderBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.AbstractMediaHeaderBox>;
            public getVersion(): number;
            public getFlags(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class BitRateBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.BitRateBox>;
            public static TYPE: string;
            public constructor();
            public setMaxBitrate(param0: number): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setBufferSizeDb(param0: number): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setAvgBitrate(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getAvgBitrate(): number;
            public getBufferSizeDb(): number;
            public getMaxBitrate(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class ChunkOffset64BitBox extends org.mp4parser.boxes.iso14496.part12.ChunkOffsetBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.ChunkOffset64BitBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getChunkOffsets(): androidNative.Array<number>;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public setChunkOffsets(param0: androidNative.Array<number>): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export abstract class ChunkOffsetBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.ChunkOffsetBox>;
            public setChunkOffsets(param0: androidNative.Array<number>): void;
            public getVersion(): number;
            public getFlags(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getChunkOffsets(): androidNative.Array<number>;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class CompositionTimeToSample extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>): void;
            public setVersion(param0: number): void;
            public getEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public static blowupCompositionTimes(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>): androidNative.Array<number>;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
          export module CompositionTimeToSample {
            export class Entry {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
              public constructor(param0: number, param1: number);
              public setCount(param0: number): void;
              public toString(): string;
              public getCount(): number;
              public setOffset(param0: number): void;
              public getOffset(): number;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class CompositionToDecodeBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.CompositionToDecodeBox>;
            public static TYPE: string;
            public constructor();
            public getLeastDisplayOffset(): number;
            public getContent(param0: java.nio.ByteBuffer): void;
            public getCompositionOffsetToDisplayOffsetShift(): number;
            public setLeastDisplayOffset(param0: number): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getGreatestDisplayOffset(): number;
            public getDisplayEndTime(): number;
            public setDisplayEndTime(param0: number): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public setCompositionOffsetToDisplayOffsetShift(param0: number): void;
            public setDisplayStartTime(param0: number): void;
            public getContentSize(): number;
            public setGreatestDisplayOffset(param0: number): void;
            public constructor(param0: string);
            public getDisplayStartTime(): number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class DataEntryUrlBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.DataEntryUrlBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public getFlags(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getContentSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class DataEntryUrnBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.DataEntryUrnBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getLocation(): string;
            public getName(): string;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class DataInformationBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.DataInformationBox>;
            public static TYPE: string;
            public constructor();
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class DataReferenceBox extends org.mp4parser.support.AbstractContainerBox implements org.mp4parser.FullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.DataReferenceBox>;
            public static TYPE: string;
            public constructor();
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getType(): string;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getVersion(): number;
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public getSize(): number;
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public getFlags(): number;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class DegradationPriorityBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.DegradationPriorityBox>;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public getPriorities(): androidNative.Array<number>;
            public getFlags(): number;
            public getContentSize(): number;
            public setPriorities(param0: androidNative.Array<number>): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class EditBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.EditBox>;
            public static TYPE: string;
            public constructor();
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class EditListBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.EditListBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.EditListBox.Entry>;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.EditListBox.Entry>): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
          export module EditListBox {
            export class Entry {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.EditListBox.Entry>;
              public setMediaRate(param0: number): void;
              public constructor(param0: org.mp4parser.boxes.iso14496.part12.EditListBox, param1: number, param2: number, param3: number);
              public hashCode(): number;
              public getMediaTime(): number;
              public getMediaRate(): number;
              public toString(): string;
              public getContent(param0: java.nio.ByteBuffer): void;
              public constructor(param0: org.mp4parser.boxes.iso14496.part12.EditListBox, param1: java.nio.ByteBuffer);
              public equals(param0: any): boolean;
              public getSegmentDuration(): number;
              public setSegmentDuration(param0: number): void;
              public setMediaTime(param0: number): void;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class FileTypeBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.FileTypeBox>;
            public static TYPE: string;
            public getMajorBrand(): string;
            public constructor();
            public setCompatibleBrands(param0: java.util.List<string>): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setMajorBrand(param0: string): void;
            public constructor(param0: string, param1: number, param2: java.util.List<string>);
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getCompatibleBrands(): java.util.List<string>;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setMinorVersion(param0: number): void;
            public getMinorVersion(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class FreeBox extends org.mp4parser.ParsableBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.FreeBox>;
            public static TYPE: string;
            public setData(param0: java.nio.ByteBuffer): void;
            public constructor();
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getSize(): number;
            public addAndReplace(param0: org.mp4parser.ParsableBox): void;
            public constructor(param0: number);
            public getType(): string;
            public getData(): java.nio.ByteBuffer;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class FreeSpaceBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.FreeSpaceBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setData(param0: androidNative.Array<number>): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getData(): androidNative.Array<number>;
            public getContentSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class HandlerBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.HandlerBox>;
            public static TYPE: string;
            public static readableTypes: java.util.Map<string, string>;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public setName(param0: string): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setHandlerType(param0: string): void;
            public getHandlerType(): string;
            public getName(): string;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public getContentSize(): number;
            public getHumanReadableTrackType(): string;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class HintMediaHeaderBox extends org.mp4parser.boxes.iso14496.part12.AbstractMediaHeaderBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.HintMediaHeaderBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getMaxPduSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getAvgPduSize(): number;
            public getAvgBitrate(): number;
            public getFlags(): number;
            public getMaxBitrate(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class HintSampleEntry extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.HintSampleEntry>;
            public data: androidNative.Array<number>;
            public constructor();
            public getDataReferenceIndex(): number;
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public setData(param0: androidNative.Array<number>): void;
            public setDataReferenceIndex(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getSize(): number;
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getData(): androidNative.Array<number>;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class ItemDataBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.ItemDataBox>;
            public static TYPE: string;
            public setData(param0: java.nio.ByteBuffer): void;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getData(): java.nio.ByteBuffer;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getContentSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class ItemLocationBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.ItemLocationBox>;
            public static TYPE: string;
            public offsetSize: number;
            public lengthSize: number;
            public baseOffsetSize: number;
            public indexSize: number;
            public items: java.util.List<org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Item>;
            public setBaseOffsetSize(param0: number): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public createExtent(param0: java.nio.ByteBuffer): org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Extent;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getIndexSize(): number;
            public getOffsetSize(): number;
            public setIndexSize(param0: number): void;
            public createItem(param0: java.nio.ByteBuffer): org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Item;
            public getFlags(): number;
            public getLengthSize(): number;
            public setLengthSize(param0: number): void;
            public constructor();
            public getItems(): java.util.List<org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Item>;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public getBaseOffsetSize(): number;
            public setFlags(param0: number): void;
            public createExtent(param0: number, param1: number, param2: number): org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Extent;
            public setOffsetSize(param0: number): void;
            public getContentSize(): number;
            public setItems(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Item>): void;
            public createItem(
              param0: number,
              param1: number,
              param2: number,
              param3: number,
              param4: java.util.List<org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Extent>
            ): org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Item;
            public constructor(param0: string);
          }
          export module ItemLocationBox {
            export class Extent {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Extent>;
              public extentOffset: number;
              public extentLength: number;
              public extentIndex: number;
              public constructor(param0: org.mp4parser.boxes.iso14496.part12.ItemLocationBox, param1: number, param2: number, param3: number);
              public getSize(): number;
              public hashCode(): number;
              public toString(): string;
              public getContent(param0: java.nio.ByteBuffer): void;
              public equals(param0: any): boolean;
              public constructor(param0: org.mp4parser.boxes.iso14496.part12.ItemLocationBox, param1: java.nio.ByteBuffer);
            }
            export class Item {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Item>;
              public itemId: number;
              public constructionMethod: number;
              public dataReferenceIndex: number;
              public baseOffset: number;
              public extents: java.util.List<org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Extent>;
              public getSize(): number;
              public constructor(param0: number, param1: number, param2: number, param3: number, param4: java.util.List<org.mp4parser.boxes.iso14496.part12.ItemLocationBox.Extent>);
              public hashCode(): number;
              public toString(): string;
              public setBaseOffset(param0: number): void;
              public getContent(param0: java.nio.ByteBuffer): void;
              public equals(param0: any): boolean;
              public constructor(param0: org.mp4parser.boxes.iso14496.part12.ItemLocationBox, param1: java.nio.ByteBuffer);
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class ItemProtectionBox extends org.mp4parser.support.AbstractContainerBox implements org.mp4parser.FullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.ItemProtectionBox>;
            public static TYPE: string;
            public constructor();
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getType(): string;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getVersion(): number;
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public getItemProtectionScheme(): org.mp4parser.boxes.iso14496.part12.SchemeInformationBox;
            public getSize(): number;
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public getFlags(): number;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MediaBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MediaBox>;
            public static TYPE: string;
            public constructor();
            public getMediaHeaderBox(): org.mp4parser.boxes.iso14496.part12.MediaHeaderBox;
            public getMediaInformationBox(): org.mp4parser.boxes.iso14496.part12.MediaInformationBox;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getHandlerBox(): org.mp4parser.boxes.iso14496.part12.HandlerBox;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MediaDataBox extends org.mp4parser.ParsableBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MediaDataBox>;
            public static TYPE: string;
            public constructor();
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getSize(): number;
            public close(): void;
            public getType(): string;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MediaHeaderBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MediaHeaderBox>;
            public static TYPE: string;
            public constructor();
            public setTimescale(param0: number): void;
            public getDuration(): number;
            public getTimescale(): number;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getModificationTime(): java.util.Date;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setCreationTime(param0: java.util.Date): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public setModificationTime(param0: java.util.Date): void;
            public setLanguage(param0: string): void;
            public getCreationTime(): java.util.Date;
            public getFlags(): number;
            public getLanguage(): string;
            public setDuration(param0: number): void;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MediaInformationBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MediaInformationBox>;
            public static TYPE: string;
            public constructor();
            public getSampleTableBox(): org.mp4parser.boxes.iso14496.part12.SampleTableBox;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
            public getMediaHeaderBox(): org.mp4parser.boxes.iso14496.part12.AbstractMediaHeaderBox;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MetaBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MetaBox>;
            public static TYPE: string;
            public constructor();
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getVersion(): number;
            public parseVersionAndFlags(param0: java.nio.ByteBuffer): number;
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public getSize(): number;
            public writeVersionAndFlags(param0: java.nio.ByteBuffer): void;
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public getFlags(): number;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MovieBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MovieBox>;
            public static TYPE: string;
            public constructor();
            public getTrackNumbers(): androidNative.Array<number>;
            public getMovieHeaderBox(): org.mp4parser.boxes.iso14496.part12.MovieHeaderBox;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getTrackCount(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MovieExtendsBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MovieExtendsBox>;
            public static TYPE: string;
            public constructor();
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MovieExtendsHeaderBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MovieExtendsHeaderBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public setFragmentDuration(param0: number): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
            public getFragmentDuration(): number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MovieFragmentBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MovieFragmentBox>;
            public static TYPE: string;
            public getTrackFragmentHeaderBoxes(): java.util.List<org.mp4parser.boxes.iso14496.part12.TrackFragmentHeaderBox>;
            public constructor();
            public getTrackNumbers(): androidNative.Array<number>;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getSyncSamples(param0: org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox): java.util.List<java.lang.Long>;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getTrackCount(): number;
            public getTrackRunBoxes(): java.util.List<org.mp4parser.boxes.iso14496.part12.TrackRunBox>;
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MovieFragmentHeaderBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MovieFragmentHeaderBox>;
            public static TYPE: string;
            public setSequenceNumber(param0: number): void;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getSequenceNumber(): number;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MovieFragmentRandomAccessBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MovieFragmentRandomAccessBox>;
            public static TYPE: string;
            public constructor();
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MovieFragmentRandomAccessOffsetBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MovieFragmentRandomAccessOffsetBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getMfraSize(): number;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setMfraSize(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class MovieHeaderBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.MovieHeaderBox>;
            public static TYPE: string;
            public getSelectionDuration(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setPreviewTime(param0: number): void;
            public getModificationTime(): java.util.Date;
            public getPreviewTime(): number;
            public getPosterTime(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setCreationTime(param0: java.util.Date): void;
            public setRate(param0: number): void;
            public setNextTrackId(param0: number): void;
            public setModificationTime(param0: java.util.Date): void;
            public setCurrentTime(param0: number): void;
            public getCreationTime(): java.util.Date;
            public getFlags(): number;
            public getSelectionTime(): number;
            public setPosterTime(param0: number): void;
            public constructor();
            public setTimescale(param0: number): void;
            public getDuration(): number;
            public getNextTrackId(): number;
            public setPreviewDuration(param0: number): void;
            public getTimescale(): number;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public getCurrentTime(): number;
            public toString(): string;
            public setFlags(param0: number): void;
            public getRate(): number;
            public setMatrix(param0: org.mp4parser.support.Matrix): void;
            public setSelectionDuration(param0: number): void;
            public getVolume(): number;
            public setSelectionTime(param0: number): void;
            public setDuration(param0: number): void;
            public getContentSize(): number;
            public setVolume(param0: number): void;
            public getPreviewDuration(): number;
            public constructor(param0: string);
            public getMatrix(): org.mp4parser.support.Matrix;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class NullMediaHeaderBox extends org.mp4parser.boxes.iso14496.part12.AbstractMediaHeaderBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.NullMediaHeaderBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public getFlags(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getContentSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class OriginalFormatBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.OriginalFormatBox>;
            public static TYPE: string;
            public constructor();
            public setDataFormat(param0: string): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getDataFormat(): string;
            public getContentSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class ProgressiveDownloadInformationBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.ProgressiveDownloadInformationBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.ProgressiveDownloadInformationBox.Entry>): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public getEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.ProgressiveDownloadInformationBox.Entry>;
            public getContentSize(): number;
            public constructor(param0: string);
          }
          export module ProgressiveDownloadInformationBox {
            export class Entry {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.ProgressiveDownloadInformationBox.Entry>;
              public setInitialDelay(param0: number): void;
              public constructor(param0: number, param1: number);
              public hashCode(): number;
              public getRate(): number;
              public setRate(param0: number): void;
              public getInitialDelay(): number;
              public toString(): string;
              public equals(param0: any): boolean;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class ProtectionSchemeInformationBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.ProtectionSchemeInformationBox>;
            public static TYPE: string;
            public constructor();
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SampleAuxiliaryInformationOffsetsBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SampleAuxiliaryInformationOffsetsBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getAuxInfoType(): string;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setAuxInfoTypeParameter(param0: string): void;
            public setAuxInfoType(param0: string): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public setOffsets(param0: androidNative.Array<number>): void;
            public getFlags(): number;
            public getOffsets(): androidNative.Array<number>;
            public getContentSize(): number;
            public getAuxInfoTypeParameter(): string;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SampleAuxiliaryInformationSizesBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SampleAuxiliaryInformationSizesBox>;
            public static TYPE: string;
            public constructor();
            public setDefaultSampleInfoSize(param0: number): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public getSampleCount(): number;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getAuxInfoType(): string;
            public getDefaultSampleInfoSize(): number;
            public setSampleCount(param0: number): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setAuxInfoTypeParameter(param0: string): void;
            public setAuxInfoType(param0: string): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getSize(param0: number): number;
            public toString(): string;
            public setFlags(param0: number): void;
            public getSize(): number;
            public setSampleInfoSizes(param0: androidNative.Array<number>): void;
            public getFlags(): number;
            public getSampleInfoSizes(): androidNative.Array<number>;
            public getContentSize(): number;
            public getAuxInfoTypeParameter(): string;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SampleDependencyTypeBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
            public toString(): string;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>): void;
            public getContentSize(): number;
            public constructor(param0: string);
          }
          export module SampleDependencyTypeBox {
            export class Entry {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
              public getIsLeading(): number;
              public getSampleDependsOn(): number;
              public getSampleIsDependedOn(): number;
              public setIsLeading(param0: number): void;
              public hashCode(): number;
              public getSampleHasRedundancy(): number;
              public setSampleHasRedundancy(param0: number): void;
              public toString(): string;
              public equals(param0: any): boolean;
              public setSampleDependsOn(param0: number): void;
              public constructor(param0: number);
              public setSampleIsDependedOn(param0: number): void;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SampleDescriptionBox extends org.mp4parser.support.AbstractContainerBox implements org.mp4parser.FullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SampleDescriptionBox>;
            public static TYPE: string;
            public constructor();
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getType(): string;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getVersion(): number;
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getSampleEntry(): org.mp4parser.boxes.sampleentry.AbstractSampleEntry;
            public setFlags(param0: number): void;
            public getSize(): number;
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public getFlags(): number;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SampleFlags {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SampleFlags>;
            public setSampleIsDifferenceSample(param0: boolean): void;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public getSampleDegradationPriority(): number;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public constructor(param0: java.nio.ByteBuffer);
            public isSampleIsDifferenceSample(): boolean;
            public setSampleHasRedundancy(param0: number): void;
            public setSampleDegradationPriority(param0: number): void;
            public getIsLeading(): number;
            public toString(): string;
            public getSampleHasRedundancy(): number;
            public getSamplePaddingValue(): number;
            public setSamplePaddingValue(param0: number): void;
            public setSampleDependsOn(param0: number): void;
            public setIsLeading(param0: number): void;
            public setSampleIsDependedOn(param0: number): void;
            public getSampleDependsOn(): number;
            public setReserved(param0: number): void;
            public getReserved(): number;
            public getSampleIsDependedOn(): number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SampleSizeBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SampleSizeBox>;
            public static TYPE: string;
            public constructor();
            public setSampleSize(param0: number): void;
            public getSampleCount(): number;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getSampleSizes(): androidNative.Array<number>;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getSampleSize(): number;
            public setSampleSizes(param0: androidNative.Array<number>): void;
            public getSampleSizeAtIndex(param0: number): number;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SampleTableBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SampleTableBox>;
            public static TYPE: string;
            public getSampleDependencyTypeBox(): org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox;
            public constructor();
            public getSampleDescriptionBox(): org.mp4parser.boxes.iso14496.part12.SampleDescriptionBox;
            public getSyncSampleBox(): org.mp4parser.boxes.iso14496.part12.SyncSampleBox;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getTimeToSampleBox(): org.mp4parser.boxes.iso14496.part12.TimeToSampleBox;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getSampleToChunkBox(): org.mp4parser.boxes.iso14496.part12.SampleToChunkBox;
            public getChunkOffsetBox(): org.mp4parser.boxes.iso14496.part12.ChunkOffsetBox;
            public getCompositionTimeToSample(): org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample;
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getSampleSizeBox(): org.mp4parser.boxes.iso14496.part12.SampleSizeBox;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SampleToChunkBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SampleToChunkBox>;
            public static TYPE: string;
            public blowup(param0: number): androidNative.Array<number>;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleToChunkBox.Entry>;
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.SampleToChunkBox.Entry>): void;
            public getContentSize(): number;
            public constructor(param0: string);
          }
          export module SampleToChunkBox {
            export class Entry {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SampleToChunkBox.Entry>;
              public setSamplesPerChunk(param0: number): void;
              public setSampleDescriptionIndex(param0: number): void;
              public constructor(param0: number, param1: number, param2: number);
              public getSamplesPerChunk(): number;
              public hashCode(): number;
              public getSampleDescriptionIndex(): number;
              public toString(): string;
              public equals(param0: any): boolean;
              public setFirstChunk(param0: number): void;
              public getFirstChunk(): number;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SchemeInformationBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SchemeInformationBox>;
            public static TYPE: string;
            public constructor();
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SchemeTypeBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SchemeTypeBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getSchemeType(): string;
            public setSchemeVersion(param0: number): void;
            public getSchemeUri(): string;
            public getFlags(): number;
            public setSchemeType(param0: string): void;
            public getSchemeVersion(): number;
            public setSchemeUri(param0: string): void;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SegmentIndexBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SegmentIndexBox>;
            public static TYPE: string;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.SegmentIndexBox.Entry>): void;
            public constructor();
            public setTimeScale(param0: number): void;
            public getTimeScale(): number;
            public setFirstOffset(param0: number): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public getEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.SegmentIndexBox.Entry>;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setEarliestPresentationTime(param0: number): void;
            public getFirstOffset(): number;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public setReserved(param0: number): void;
            public getReferenceId(): number;
            public setReferenceId(param0: number): void;
            public getFlags(): number;
            public getReserved(): number;
            public getEarliestPresentationTime(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
          export module SegmentIndexBox {
            export class Entry {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SegmentIndexBox.Entry>;
              public constructor();
              public setStartsWithSap(param0: number): void;
              public getReferenceType(): number;
              public hashCode(): number;
              public getStartsWithSap(): number;
              public getReferencedSize(): number;
              public setReferencedSize(param0: number): void;
              public toString(): string;
              public setReferenceType(param0: number): void;
              public constructor(param0: number, param1: number, param2: number, param3: boolean, param4: number, param5: number);
              public getSubsegmentDuration(): number;
              public getSapType(): number;
              public setSapDeltaTime(param0: number): void;
              public getSapDeltaTime(): number;
              public setSubsegmentDuration(param0: number): void;
              public setSapType(param0: number): void;
              public equals(param0: any): boolean;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SegmentTypeBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SegmentTypeBox>;
            public static TYPE: string;
            public getMajorBrand(): string;
            public constructor();
            public setCompatibleBrands(param0: java.util.List<string>): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setMajorBrand(param0: string): void;
            public constructor(param0: string, param1: number, param2: java.util.List<string>);
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getCompatibleBrands(): java.util.List<string>;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setMinorVersion(param0: number): void;
            public getMinorVersion(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SoundMediaHeaderBox extends org.mp4parser.boxes.iso14496.part12.AbstractMediaHeaderBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SoundMediaHeaderBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getBalance(): number;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class StaticChunkOffsetBox extends org.mp4parser.boxes.iso14496.part12.ChunkOffsetBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.StaticChunkOffsetBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getChunkOffsets(): androidNative.Array<number>;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public setChunkOffsets(param0: androidNative.Array<number>): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SubSampleInformationBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox.SubSampleEntry>;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox.SubSampleEntry>): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
          export module SubSampleInformationBox {
            export class SubSampleEntry {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox.SubSampleEntry>;
              public constructor();
              public setSampleDelta(param0: number): void;
              public getSampleDelta(): number;
              public getSubsampleCount(): number;
              public getSubsampleEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox.SubSampleEntry.SubsampleEntry>;
              public toString(): string;
            }
            export module SubSampleEntry {
              export class SubsampleEntry {
                public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox.SubSampleEntry.SubsampleEntry>;
                public setReserved(param0: number): void;
                public toString(): string;
                public getSubsamplePriority(): number;
                public getDiscardable(): number;
                public setSubsampleSize(param0: number): void;
                public getReserved(): number;
                public constructor();
                public setDiscardable(param0: number): void;
                public getSubsampleSize(): number;
                public setSubsamplePriority(param0: number): void;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SubtitleMediaHeaderBox extends org.mp4parser.boxes.iso14496.part12.AbstractMediaHeaderBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SubtitleMediaHeaderBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public getFlags(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getContentSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class SyncSampleBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.SyncSampleBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getSampleNumber(): androidNative.Array<number>;
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
            public setSampleNumber(param0: androidNative.Array<number>): void;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TimeToSampleBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TimeToSampleBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.TimeToSampleBox.Entry>): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public static blowupTimeToSamples(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.TimeToSampleBox.Entry>): androidNative.Array<number>;
            public toString(): string;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public getEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.TimeToSampleBox.Entry>;
            public getContentSize(): number;
            public constructor(param0: string);
          }
          export module TimeToSampleBox {
            export class Entry {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TimeToSampleBox.Entry>;
              public constructor(param0: number, param1: number);
              public getDelta(): number;
              public setCount(param0: number): void;
              public setDelta(param0: number): void;
              public toString(): string;
              public getCount(): number;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TrackBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackBox>;
            public static TYPE: string;
            public constructor();
            public getSampleTableBox(): org.mp4parser.boxes.iso14496.part12.SampleTableBox;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public getTrackHeaderBox(): org.mp4parser.boxes.iso14496.part12.TrackHeaderBox;
            public getMediaBox(): org.mp4parser.boxes.iso14496.part12.MediaBox;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TrackExtendsBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackExtendsBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public setDefaultSampleSize(param0: number): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getDefaultSampleFlags(): org.mp4parser.boxes.iso14496.part12.SampleFlags;
            public setDefaultSampleDescriptionIndex(param0: number): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getTrackId(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public getDefaultSampleDuration(): number;
            public setTrackId(param0: number): void;
            public setDefaultSampleDuration(param0: number): void;
            public getDefaultSampleDescriptionIndex(): number;
            public getDefaultSampleFlagsStr(): string;
            public setDefaultSampleFlags(param0: org.mp4parser.boxes.iso14496.part12.SampleFlags): void;
            public getFlags(): number;
            public getContentSize(): number;
            public getDefaultSampleSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TrackFragmentBaseMediaDecodeTimeBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackFragmentBaseMediaDecodeTimeBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public setBaseMediaDecodeTime(param0: number): void;
            public getFlags(): number;
            public getBaseMediaDecodeTime(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TrackFragmentBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackFragmentBox>;
            public static TYPE: string;
            public constructor();
            public getTrackFragmentHeaderBox(): org.mp4parser.boxes.iso14496.part12.TrackFragmentHeaderBox;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TrackFragmentHeaderBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackFragmentHeaderBox>;
            public static TYPE: string;
            public setBaseDataOffset(param0: number): void;
            public hasDefaultSampleFlags(): boolean;
            public setDefaultSampleSize(param0: number): void;
            public getDefaultSampleFlags(): org.mp4parser.boxes.iso14496.part12.SampleFlags;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setSampleDescriptionIndex(param0: number): void;
            public getTrackId(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setTrackId(param0: number): void;
            public setDefaultSampleDuration(param0: number): void;
            public isDefaultBaseIsMoof(): boolean;
            public hasDefaultSampleDuration(): boolean;
            public setDefaultSampleFlags(param0: org.mp4parser.boxes.iso14496.part12.SampleFlags): void;
            public getFlags(): number;
            public constructor();
            public hasSampleDescriptionIndex(): boolean;
            public getContent(param0: java.nio.ByteBuffer): void;
            public setDefaultBaseIsMoof(param0: boolean): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public isDurationIsEmpty(): boolean;
            public toString(): string;
            public setFlags(param0: number): void;
            public getDefaultSampleDuration(): number;
            public hasDefaultSampleSize(): boolean;
            public getSampleDescriptionIndex(): number;
            public setDurationIsEmpty(param0: boolean): void;
            public getBaseDataOffset(): number;
            public hasBaseDataOffset(): boolean;
            public getContentSize(): number;
            public getDefaultSampleSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TrackFragmentRandomAccessBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackFragmentRandomAccessBox>;
            public static TYPE: string;
            public constructor();
            public getLengthSizeOfSampleNum(): number;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setLengthSizeOfTrunNum(param0: number): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getLengthSizeOfTrunNum(): number;
            public setVersion(param0: number): void;
            public getLengthSizeOfTrafNum(): number;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.TrackFragmentRandomAccessBox.Entry>): void;
            public getTrackId(): number;
            public getNumberOfEntries(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public setTrackId(param0: number): void;
            public getEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.TrackFragmentRandomAccessBox.Entry>;
            public setLengthSizeOfTrafNum(param0: number): void;
            public getFlags(): number;
            public getReserved(): number;
            public getContentSize(): number;
            public setLengthSizeOfSampleNum(param0: number): void;
            public constructor(param0: string);
          }
          export module TrackFragmentRandomAccessBox {
            export class Entry {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackFragmentRandomAccessBox.Entry>;
              public constructor();
              public getTrafNumber(): number;
              public setTime(param0: number): void;
              public hashCode(): number;
              public setTrafNumber(param0: number): void;
              public getMoofOffset(): number;
              public toString(): string;
              public constructor(param0: number, param1: number, param2: number, param3: number, param4: number);
              public setMoofOffset(param0: number): void;
              public getSampleNumber(): number;
              public getTime(): number;
              public getTrunNumber(): number;
              public setTrunNumber(param0: number): void;
              public setSampleNumber(param0: number): void;
              public equals(param0: any): boolean;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TrackHeaderBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackHeaderBox>;
            public static TYPE: string;
            public setInPoster(param0: boolean): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getModificationTime(): java.util.Date;
            public getTrackId(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setCreationTime(param0: java.util.Date): void;
            public setTrackId(param0: number): void;
            public setModificationTime(param0: java.util.Date): void;
            public getLayer(): number;
            public getCreationTime(): java.util.Date;
            public setHeight(param0: number): void;
            public getFlags(): number;
            public setAlternateGroup(param0: number): void;
            public setInPreview(param0: boolean): void;
            public constructor();
            public setWidth(param0: number): void;
            public getDuration(): number;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setInMovie(param0: boolean): void;
            public getVersion(): number;
            public getHeight(): number;
            public isInMovie(): boolean;
            public setLayer(param0: number): void;
            public isEnabled(): boolean;
            public setEnabled(param0: boolean): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getAlternateGroup(): number;
            public getWidth(): number;
            public setMatrix(param0: org.mp4parser.support.Matrix): void;
            public getVolume(): number;
            public isInPreview(): boolean;
            public setDuration(param0: number): void;
            public getContentSize(): number;
            public setVolume(param0: number): void;
            public constructor(param0: string);
            public getMatrix(): org.mp4parser.support.Matrix;
            public isInPoster(): boolean;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TrackReferenceBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackReferenceBox>;
            public static TYPE: string;
            public constructor();
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TrackReferenceTypeBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackReferenceTypeBox>;
            public getContent(param0: java.nio.ByteBuffer): void;
            public getTrackIds(): androidNative.Array<number>;
            public setTrackIds(param0: androidNative.Array<number>): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getContentSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class TrackRunBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackRunBox>;
            public static TYPE: string;
            public isSampleFlagsPresent(): boolean;
            public isSampleCompositionTimeOffsetPresent(): boolean;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setSampleFlagsPresent(param0: boolean): void;
            public setVersion(param0: number): void;
            public setFirstSampleFlags(param0: org.mp4parser.boxes.iso14496.part12.SampleFlags): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso14496.part12.TrackRunBox.Entry>): void;
            public getFirstSampleFlags(): org.mp4parser.boxes.iso14496.part12.SampleFlags;
            public getFlags(): number;
            public setSampleDurationPresent(param0: boolean): void;
            public isSampleSizePresent(): boolean;
            public isDataOffsetPresent(): boolean;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public getSampleCount(): number;
            public setSampleSizePresent(param0: boolean): void;
            public setSampleCompositionTimeOffsetPresent(param0: boolean): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getSampleCompositionTimeOffsets(): androidNative.Array<number>;
            public getDataOffset(): number;
            public getVersion(): number;
            public setDataOffset(param0: number): void;
            public setDataOffsetPresent(param0: boolean): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.TrackRunBox.Entry>;
            public isFirstSampleFlagsPresent(): boolean;
            public isSampleDurationPresent(): boolean;
            public getContentSize(): number;
            public constructor(param0: string);
          }
          export module TrackRunBox {
            export class Entry {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.TrackRunBox.Entry>;
              public constructor();
              public setSampleDuration(param0: number): void;
              public getSampleSize(): number;
              public getSampleFlags(): org.mp4parser.boxes.iso14496.part12.SampleFlags;
              public getSampleCompositionTimeOffset(): number;
              public constructor(param0: number, param1: number, param2: org.mp4parser.boxes.iso14496.part12.SampleFlags, param3: number);
              public setSampleCompositionTimeOffset(param0: number): void;
              public setSampleSize(param0: number): void;
              public getSampleDuration(): number;
              public toString(): string;
              public setSampleFlags(param0: org.mp4parser.boxes.iso14496.part12.SampleFlags): void;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class UserDataBox extends org.mp4parser.support.AbstractContainerBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.UserDataBox>;
            public static TYPE: string;
            public constructor();
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class VideoMediaHeaderBox extends org.mp4parser.boxes.iso14496.part12.AbstractMediaHeaderBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.VideoMediaHeaderBox>;
            public static TYPE: string;
            public constructor();
            public getOpcolor(): androidNative.Array<number>;
            public getContent(param0: java.nio.ByteBuffer): void;
            public getGraphicsmode(): number;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setGraphicsmode(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public setOpcolor(param0: androidNative.Array<number>): void;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part12 {
          export class XmlBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part12.XmlBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getXml(): string;
            public getFlags(): number;
            public setXml(param0: string): void;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part14 {
          export class AbstractDescriptorBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part14.AbstractDescriptorBox>;
            public descriptor: org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor;
            public data: java.nio.ByteBuffer;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public setData(param0: java.nio.ByteBuffer): void;
            public getDescriptor(): org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor;
            public getDescriptorAsString(): string;
            public getData(): java.nio.ByteBuffer;
            public getFlags(): number;
            public setDescriptor(param0: org.mp4parser.boxes.iso14496.part1.objectdescriptors.BaseDescriptor): void;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part14 {
          export class ESDescriptorBox extends org.mp4parser.boxes.iso14496.part14.AbstractDescriptorBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part14.ESDescriptorBox>;
            public static TYPE: string;
            public constructor();
            public getEsDescriptor(): org.mp4parser.boxes.iso14496.part1.objectdescriptors.ESDescriptor;
            public getContent(param0: java.nio.ByteBuffer): void;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public getFlags(): number;
            public setEsDescriptor(param0: org.mp4parser.boxes.iso14496.part1.objectdescriptors.ESDescriptor): void;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class AvcConfigurationBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.AvcConfigurationBox>;
            public static TYPE: string;
            public avcDecoderConfigurationRecord: org.mp4parser.boxes.iso14496.part15.AvcDecoderConfigurationRecord;
            public setLengthSizeMinusOne(param0: number): void;
            public getAvcProfileIndication(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getSequenceParameterSetExts(): java.util.List<java.nio.ByteBuffer>;
            public getavcDecoderConfigurationRecord(): org.mp4parser.boxes.iso14496.part15.AvcDecoderConfigurationRecord;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setBitDepthLumaMinus8(param0: number): void;
            public getAvcLevelIndication(): number;
            public getPictureParameterSets(): java.util.List<java.nio.ByteBuffer>;
            public setBitDepthChromaMinus8(param0: number): void;
            public setAvcProfileIndication(param0: number): void;
            public getConfigurationVersion(): number;
            public hasExts(): boolean;
            public setAvcLevelIndication(param0: number): void;
            public setHasExts(param0: boolean): void;
            public getLengthSizeMinusOne(): number;
            public setSequenceParameterSets(param0: java.util.List<java.nio.ByteBuffer>): void;
            public getSequenceParameterSets(): java.util.List<java.nio.ByteBuffer>;
            public constructor();
            public setSequenceParameterSetExts(param0: java.util.List<java.nio.ByteBuffer>): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public getProfileCompatibility(): number;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getBitDepthLumaMinus8(): number;
            public setChromaFormat(param0: number): void;
            public toString(): string;
            public getChromaFormat(): number;
            public getBitDepthChromaMinus8(): number;
            public setConfigurationVersion(param0: number): void;
            public setPictureParameterSets(param0: java.util.List<java.nio.ByteBuffer>): void;
            public getContentSize(): number;
            public constructor(param0: string);
            public setProfileCompatibility(param0: number): void;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class AvcDecoderConfigurationRecord {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.AvcDecoderConfigurationRecord>;
            public configurationVersion: number;
            public avcProfileIndication: number;
            public profileCompatibility: number;
            public avcLevelIndication: number;
            public lengthSizeMinusOne: number;
            public sequenceParameterSets: java.util.List<java.nio.ByteBuffer>;
            public pictureParameterSets: java.util.List<java.nio.ByteBuffer>;
            public hasExts: boolean;
            public chromaFormat: number;
            public bitDepthLumaMinus8: number;
            public bitDepthChromaMinus8: number;
            public sequenceParameterSetExts: java.util.List<java.nio.ByteBuffer>;
            public lengthSizeMinusOnePaddingBits: number;
            public numberOfSequenceParameterSetsPaddingBits: number;
            public chromaFormatPaddingBits: number;
            public bitDepthLumaMinus8PaddingBits: number;
            public bitDepthChromaMinus8PaddingBits: number;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public getPictureParameterSetsAsStrings(): java.util.List<string>;
            public constructor(param0: java.nio.ByteBuffer);
            public getSequenceParameterSetExtsAsStrings(): java.util.List<string>;
            public getContentSize(): number;
            public getSequenceParameterSetsAsStrings(): java.util.List<string>;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class HevcConfigurationBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.HevcConfigurationBox>;
            public static TYPE: string;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public getParallelismType(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getGeneral_profile_compatibility_flags(): number;
            public getConfigurationVersion(): number;
            public getHevcDecoderConfigurationRecord(): org.mp4parser.boxes.iso14496.part15.HevcDecoderConfigurationRecord;
            public getLengthSizeMinusOne(): number;
            public constructor();
            public getConstantFrameRate(): number;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getGeneral_profile_idc(): number;
            public getBitDepthLumaMinus8(): number;
            public getArrays(): java.util.List<org.mp4parser.boxes.iso14496.part15.HevcDecoderConfigurationRecord.Array>;
            public isTemporalIdNested(): boolean;
            public getNumTemporalLayers(): number;
            public isGeneral_tier_flag(): boolean;
            public getGeneral_constraint_indicator_flags(): number;
            public getAvgFrameRate(): number;
            public getChromaFormat(): number;
            public getGeneral_level_idc(): number;
            public getGeneral_profile_space(): number;
            public getBitDepthChromaMinus8(): number;
            public getMin_spatial_segmentation_idc(): number;
            public getContentSize(): number;
            public setHevcDecoderConfigurationRecord(param0: org.mp4parser.boxes.iso14496.part15.HevcDecoderConfigurationRecord): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class HevcDecoderConfigurationRecord {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.HevcDecoderConfigurationRecord>;
            public isProgressive_source_flag(): boolean;
            public setGeneral_profile_idc(param0: number): void;
            public equals(param0: any): boolean;
            public getParallelismType(): number;
            public setNumTemporalLayers(param0: number): void;
            public setBitDepthLumaMinus8(param0: number): void;
            public setGeneral_constraint_indicator_flags(param0: number): void;
            public setBitDepthChromaMinus8(param0: number): void;
            public getGeneral_profile_compatibility_flags(): number;
            public setGeneral_profile_space(param0: number): void;
            public setNon_packed_constraint_flag(param0: boolean): void;
            public setMin_spatial_segmentation_idc(param0: number): void;
            public write(param0: java.nio.ByteBuffer): void;
            public getLengthSizeMinusOne(): number;
            public constructor();
            public getConstantFrameRate(): number;
            public isInterlaced_source_flag(): boolean;
            public getBitDepthLumaMinus8(): number;
            public getNumTemporalLayers(): number;
            public getGeneral_constraint_indicator_flags(): number;
            public setChromaFormat(param0: number): void;
            public toString(): string;
            public getSize(): number;
            public getGeneral_level_idc(): number;
            public getBitDepthChromaMinus8(): number;
            public setConfigurationVersion(param0: number): void;
            public setTemporalIdNested(param0: boolean): void;
            public setFrame_only_constraint_flag(param0: boolean): void;
            public setParallelismType(param0: number): void;
            public setLengthSizeMinusOne(param0: number): void;
            public hashCode(): number;
            public setGeneral_profile_compatibility_flags(param0: number): void;
            public setGeneral_level_idc(param0: number): void;
            public getConfigurationVersion(): number;
            public setAvgFrameRate(param0: number): void;
            public isNon_packed_constraint_flag(): boolean;
            public setInterlaced_source_flag(param0: boolean): void;
            public isFrame_only_constraint_flag(): boolean;
            public getGeneral_profile_idc(): number;
            public getArrays(): java.util.List<org.mp4parser.boxes.iso14496.part15.HevcDecoderConfigurationRecord.Array>;
            public isTemporalIdNested(): boolean;
            public parse(param0: java.nio.ByteBuffer): void;
            public isGeneral_tier_flag(): boolean;
            public getAvgFrameRate(): number;
            public getChromaFormat(): number;
            public setGeneral_tier_flag(param0: boolean): void;
            public setProgressive_source_flag(param0: boolean): void;
            public getGeneral_profile_space(): number;
            public getMin_spatial_segmentation_idc(): number;
            public setConstantFrameRate(param0: number): void;
            public setArrays(param0: java.util.List<org.mp4parser.boxes.iso14496.part15.HevcDecoderConfigurationRecord.Array>): void;
          }
          export module HevcDecoderConfigurationRecord {
            export class Array {
              public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.HevcDecoderConfigurationRecord.Array>;
              public array_completeness: boolean;
              public reserved: boolean;
              public nal_unit_type: number;
              public nalUnits: java.util.List<androidNative.Array<number>>;
              public constructor();
              public hashCode(): number;
              public toString(): string;
              public equals(param0: any): boolean;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class PriotityRangeBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.PriotityRangeBox>;
            public static TYPE: string;
            public setMax_priorityId(param0: number): void;
            public setReserved2(param0: number): void;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setReserved1(param0: number): void;
            public getMax_priorityId(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getReserved1(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getMin_priorityId(): number;
            public setMin_priorityId(param0: number): void;
            public getReserved2(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class StepwiseTemporalLayerEntry extends org.mp4parser.boxes.samplegrouping.GroupEntry {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.StepwiseTemporalLayerEntry>;
            public static TYPE: string;
            public constructor();
            public getType(): string;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public parse(param0: java.nio.ByteBuffer): void;
            public get(): java.nio.ByteBuffer;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class SyncSampleEntry extends org.mp4parser.boxes.samplegrouping.GroupEntry {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.SyncSampleEntry>;
            public static TYPE: string;
            public constructor();
            public getNalUnitType(): number;
            public getType(): string;
            public setReserved(param0: number): void;
            public setNalUnitType(param0: number): void;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public getReserved(): number;
            public parse(param0: java.nio.ByteBuffer): void;
            public toString(): string;
            public get(): java.nio.ByteBuffer;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class TemporalLayerSampleGroup extends org.mp4parser.boxes.samplegrouping.GroupEntry {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.TemporalLayerSampleGroup>;
            public static TYPE: string;
            public setTltier_flag(param0: boolean): void;
            public setTlAvgBitRate(param0: number): void;
            public getTlprofile_idc(): number;
            public getType(): string;
            public setTlConstantFrameRate(param0: number): void;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public getTlConstantFrameRate(): number;
            public setTlMaxBitRate(param0: number): void;
            public getTlAvgFrameRate(): number;
            public isTltier_flag(): boolean;
            public setTllevel_idc(param0: number): void;
            public getTlMaxBitRate(): number;
            public getTlprofile_space(): number;
            public getTlconstraint_indicator_flags(): number;
            public getTllevel_idc(): number;
            public setTlAvgFrameRate(param0: number): void;
            public size(): number;
            public setTlprofile_idc(param0: number): void;
            public constructor();
            public getTlprofile_compatibility_flags(): number;
            public getTlAvgBitRate(): number;
            public setTlprofile_compatibility_flags(param0: number): void;
            public parse(param0: java.nio.ByteBuffer): void;
            public toString(): string;
            public setTlconstraint_indicator_flags(param0: number): void;
            public setTemporalLayerId(param0: number): void;
            public setTlprofile_space(param0: number): void;
            public getTemporalLayerId(): number;
            public get(): java.nio.ByteBuffer;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class TemporalSubLayerSampleGroup extends org.mp4parser.boxes.samplegrouping.GroupEntry {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.TemporalSubLayerSampleGroup>;
            public static TYPE: string;
            public constructor();
            public getType(): string;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public parse(param0: java.nio.ByteBuffer): void;
            public get(): java.nio.ByteBuffer;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class TierBitRateBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.TierBitRateBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public getTierBaseBitRate(): number;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setBaseBitRate(param0: number): void;
            public setMaxBitRate(param0: number): void;
            public getAvgBitRate(): number;
            public getMaxBitRate(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setTierAvgBitRate(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getTierMaxBitRate(): number;
            public setAvgBitRate(param0: number): void;
            public setTierBaseBitRate(param0: number): void;
            public getTierAvgBitRate(): number;
            public getBaseBitRate(): number;
            public getContentSize(): number;
            public setTierMaxBitRate(param0: number): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part15 {
          export class TierInfoBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part15.TierInfoBox>;
            public static TYPE: string;
            public setReserved2(param0: number): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getReserved1(): number;
            public getDiscardable(): number;
            public setDiscardable(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getLevelIndication(): number;
            public getReserved2(): number;
            public setVisualHeight(param0: number): void;
            public setProfile_compatibility(param0: number): void;
            public getProfileIndication(): number;
            public constructor();
            public setTierID(param0: number): void;
            public getConstantFrameRate(): number;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setProfileIndication(param0: number): void;
            public setReserved1(param0: number): void;
            public getFrameRate(): number;
            public getTierID(): number;
            public setFrameRate(param0: number): void;
            public setConstantFrameRate(param0: number): void;
            public getProfile_compatibility(): number;
            public setLevelIndication(param0: number): void;
            public getVisualWidth(): number;
            public setVisualWidth(param0: number): void;
            public getContentSize(): number;
            public getVisualHeight(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part30 {
          export class WebVTTConfigurationBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part30.WebVTTConfigurationBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public setConfig(param0: string): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getContentSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
            public getConfig(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part30 {
          export class WebVTTSampleEntry extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part30.WebVTTSampleEntry>;
            public static TYPE: string;
            public constructor();
            public getSourceLabel(): org.mp4parser.boxes.iso14496.part30.WebVTTSourceLabelBox;
            public getDataReferenceIndex(): number;
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getConfig(): org.mp4parser.boxes.iso14496.part30.WebVTTConfigurationBox;
            public setDataReferenceIndex(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part30 {
          export class WebVTTSourceLabelBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part30.WebVTTSourceLabelBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setSourceLabel(param0: string): void;
            public getContentSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getSourceLabel(): string;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso14496 {
        export module part30 {
          export class XMLSubtitleSampleEntry extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry {
            public static class: java.lang.Class<org.mp4parser.boxes.iso14496.part30.XMLSubtitleSampleEntry>;
            public static TYPE: string;
            public constructor();
            public getDataReferenceIndex(): number;
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public setAuxiliaryMimeTypes(param0: string): void;
            public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            public constructor(param0: java.util.List<org.mp4parser.Box>);
            public getAuxiliaryMimeTypes(): string;
            public setSchemaLocation(param0: string): void;
            public getSchemaLocation(): string;
            public setDataReferenceIndex(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getNamespace(): string;
            public getSize(): number;
            public getBoxes(): java.util.List<org.mp4parser.Box>;
            public setBoxes(param0: java.util.List<any>): void;
            public setNamespace(param0: string): void;
            public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso23001 {
        export module part7 {
          export abstract class AbstractSampleEncryptionBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.AbstractSampleEncryptionBox>;
            public algorithmId: number;
            public ivSize: number;
            public kid: androidNative.Array<number>;
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public isSubSampleEncryption(): boolean;
            public getEntrySizes(): java.util.List<java.lang.Short>;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public isOverrideTrackEncryptionBoxParameters(): boolean;
            public getEntries(): java.util.List<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat>;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat>): void;
            public getFlags(): number;
            public setSubSampleEncryption(param0: boolean): void;
            public getOffsetToFirstIV(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso23001 {
        export module part7 {
          export abstract class AbstractTrackEncryptionBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.AbstractTrackEncryptionBox>;
            public setDefaultAlgorithmId(param0: number): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setDefaultIvSize(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public setDefault_KID(param0: java.util.UUID): void;
            public getFlags(): number;
            public getDefaultAlgorithmId(): number;
            public getDefaultIvSize(): number;
            public getContentSize(): number;
            public getDefault_KID(): java.util.UUID;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso23001 {
        export module part7 {
          export class CencSampleAuxiliaryDataFormat {
            public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat>;
            public iv: androidNative.Array<number>;
            public pairs: androidNative.Array<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.Pair>;
            public constructor();
            public getSize(): number;
            public createPair(param0: number, param1: number): org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.Pair;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public toString(): string;
          }
          export module CencSampleAuxiliaryDataFormat {
            export abstract class AbstractPair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.Pair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair>;
              public clear(): number;
              public toString(): string;
              public equals(param0: any): boolean;
              public encrypted(): number;
            }
            export class ByteBytePair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.ByteBytePair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class ByteIntPair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.ByteIntPair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class ByteLongPair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.ByteLongPair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class ByteShortPair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.ByteShortPair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class IntBytePair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.IntBytePair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class IntIntPair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.IntIntPair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class IntLongPair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.IntLongPair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class IntShortPair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.IntShortPair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class Pair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.Pair>;
              /**
               * Constructs a new instance of the org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat$Pair interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
               */
              public constructor(implementation: { clear(): number; encrypted(): number });
              public constructor();
              public clear(): number;
              public encrypted(): number;
            }
            export class ShortBytePair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.ShortBytePair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class ShortIntPair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.ShortIntPair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class ShortLongPair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.ShortLongPair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
            export class ShortShortPair extends org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.AbstractPair {
              public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat.ShortShortPair>;
              public clear(): number;
              public constructor(param0: org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat, param1: number, param2: number);
              public encrypted(): number;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso23001 {
        export module part7 {
          export class ProtectionSystemSpecificHeaderBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.ProtectionSystemSpecificHeaderBox>;
            public static TYPE: string;
            public static OMA2_SYSTEM_ID: androidNative.Array<number>;
            public static WIDEVINE: androidNative.Array<number>;
            public static PLAYREADY_SYSTEM_ID: androidNative.Array<number>;
            public constructor(param0: androidNative.Array<number>, param1: androidNative.Array<number>);
            public constructor();
            public getKeyIds(): java.util.List<java.util.UUID>;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getContent(): androidNative.Array<number>;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setContent(param0: androidNative.Array<number>): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getSystemId(): androidNative.Array<number>;
            public setFlags(param0: number): void;
            public setSystemId(param0: androidNative.Array<number>): void;
            public setKeyIds(param0: java.util.List<java.util.UUID>): void;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso23001 {
        export module part7 {
          export class SampleEncryptionBox extends org.mp4parser.boxes.iso23001.part7.AbstractSampleEncryptionBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.SampleEncryptionBox>;
            public static TYPE: string;
            public constructor();
            public getVersion(): number;
            public getFlags(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso23001 {
        export module part7 {
          export class TrackEncryptionBox extends org.mp4parser.boxes.iso23001.part7.AbstractTrackEncryptionBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso23001.part7.TrackEncryptionBox>;
            public static TYPE: string;
            public constructor();
            public getVersion(): number;
            public getFlags(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module iso23009 {
        export module part1 {
          export class EventMessageBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.iso23009.part1.EventMessageBox>;
            public static TYPE: string;
            public setSchemeIdUri(param0: string): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getValue(): string;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getPresentationTimeDelta(): number;
            public getMessageData(): androidNative.Array<number>;
            public setPresentationTimeDelta(param0: number): void;
            public setValue(param0: string): void;
            public getFlags(): number;
            public getSchemeIdUri(): string;
            public constructor();
            public setEventDuration(param0: number): void;
            public setTimescale(param0: number): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public getTimescale(): number;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public setMessageData(param0: androidNative.Array<number>): void;
            public setFlags(param0: number): void;
            public getId(): number;
            public setId(param0: number): void;
            public getContentSize(): number;
            public getEventDuration(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module microsoft {
        export class PiffSampleEncryptionBox extends org.mp4parser.boxes.iso23001.part7.AbstractSampleEncryptionBox {
          public static class: java.lang.Class<org.mp4parser.boxes.microsoft.PiffSampleEncryptionBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public getVersion(): number;
          public getUserType(): androidNative.Array<number>;
          public setAlgorithmId(param0: number): void;
          public getIvSize(): number;
          public isOverrideTrackEncryptionBoxParameters(): boolean;
          public constructor();
          public setVersion(param0: number): void;
          public setOverrideTrackEncryptionBoxParameters(param0: boolean): void;
          public setFlags(param0: number): void;
          public getKid(): androidNative.Array<number>;
          public setIvSize(param0: number): void;
          public getAlgorithmId(): number;
          public setKid(param0: androidNative.Array<number>): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module microsoft {
        export class PiffTrackEncryptionBox extends org.mp4parser.boxes.iso23001.part7.AbstractTrackEncryptionBox {
          public static class: java.lang.Class<org.mp4parser.boxes.microsoft.PiffTrackEncryptionBox>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public constructor();
          public getFlags(): number;
          public getVersion(): number;
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getUserType(): androidNative.Array<number>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module microsoft {
        export abstract class ProtectionSpecificHeader {
          public static class: java.lang.Class<org.mp4parser.boxes.microsoft.ProtectionSpecificHeader>;
          public static uuidRegistry: java.util.Map<java.util.UUID, java.lang.Class<any>>;
          public equals(param0: any): boolean;
          public toString(): string;
          public constructor();
          public static createFor(param0: java.util.UUID, param1: java.nio.ByteBuffer): org.mp4parser.boxes.microsoft.ProtectionSpecificHeader;
          public parse(param0: java.nio.ByteBuffer): void;
          public getSystemId(): java.util.UUID;
          public getData(): java.nio.ByteBuffer;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module microsoft {
        export class TfrfBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.microsoft.TfrfBox>;
          public entries: java.util.List<org.mp4parser.boxes.microsoft.TfrfBox.Entry>;
          public getContent(param0: java.nio.ByteBuffer): void;
          public getFragmentCount(): number;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public getVersion(): number;
          public getUserType(): androidNative.Array<number>;
          public getEntries(): java.util.List<org.mp4parser.boxes.microsoft.TfrfBox.Entry>;
          public toString(): string;
          public constructor();
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getContentSize(): number;
        }
        export module TfrfBox {
          export class Entry {
            public static class: java.lang.Class<org.mp4parser.boxes.microsoft.TfrfBox.Entry>;
            public getFragmentAbsoluteTime(): number;
            public getFragmentAbsoluteDuration(): number;
            public constructor(param0: org.mp4parser.boxes.microsoft.TfrfBox);
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module microsoft {
        export class TfxdBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.microsoft.TfxdBox>;
          public fragmentAbsoluteTime: number;
          public fragmentAbsoluteDuration: number;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public getVersion(): number;
          public getUserType(): androidNative.Array<number>;
          public getFragmentAbsoluteTime(): number;
          public getFragmentAbsoluteDuration(): number;
          public constructor();
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module microsoft {
        export class UuidBasedProtectionSystemSpecificHeaderBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.microsoft.UuidBasedProtectionSystemSpecificHeaderBox>;
          public static USER_TYPE: androidNative.Array<number>;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public getVersion(): number;
          public getSystemIdString(): string;
          public getUserType(): androidNative.Array<number>;
          public setSystemId(param0: java.util.UUID): void;
          public setProtectionSpecificHeader(param0: org.mp4parser.boxes.microsoft.ProtectionSpecificHeader): void;
          public getProtectionSpecificHeader(): org.mp4parser.boxes.microsoft.ProtectionSpecificHeader;
          public toString(): string;
          public constructor();
          public getProtectionSpecificHeaderString(): string;
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getSystemId(): java.util.UUID;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module microsoft {
        export class XtraBox extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.microsoft.XtraBox>;
          public static TYPE: string;
          public static MP4_XTRA_BT_UNICODE: number;
          public static MP4_XTRA_BT_INT64: number;
          public static MP4_XTRA_BT_FILETIME: number;
          public static MP4_XTRA_BT_GUID: number;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getAllTagNames(): androidNative.Array<string>;
          public setTagValue(param0: string, param1: string): void;
          public setTagValue(param0: string, param1: java.util.Date): void;
          public getFirstStringValue(param0: string): string;
          public removeTag(param0: string): void;
          public setTagValues(param0: string, param1: androidNative.Array<string>): void;
          public getValues(param0: string): androidNative.Array<any>;
          public toString(): string;
          public constructor();
          public getFirstLongValue(param0: string): java.lang.Long;
          public getContentSize(): number;
          public getFirstDateValue(param0: string): java.util.Date;
          public setTagValue(param0: string, param1: number): void;
        }
        export module XtraBox {
          export class XtraTag {
            public static class: java.lang.Class<org.mp4parser.boxes.microsoft.XtraBox.XtraTag>;
            public toString(): string;
          }
          export class XtraValue {
            public static class: java.lang.Class<org.mp4parser.boxes.microsoft.XtraBox.XtraValue>;
            public type: number;
            public stringValue: string;
            public longValue: number;
            public nonParsedValue: androidNative.Array<number>;
            public fileTimeValue: java.util.Date;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module microsoft {
        export module contentprotection {
          export class GenericHeader extends org.mp4parser.boxes.microsoft.ProtectionSpecificHeader {
            public static class: java.lang.Class<org.mp4parser.boxes.microsoft.contentprotection.GenericHeader>;
            public static PROTECTION_SYSTEM_ID: java.util.UUID;
            public constructor();
            public getData(): java.nio.ByteBuffer;
            public getSystemId(): java.util.UUID;
            public parse(param0: java.nio.ByteBuffer): void;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module microsoft {
        export module contentprotection {
          export class PlayReadyHeader extends org.mp4parser.boxes.microsoft.ProtectionSpecificHeader {
            public static class: java.lang.Class<org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader>;
            public static PROTECTION_SYSTEM_ID: java.util.UUID;
            public constructor();
            public getRecords(): java.util.List<org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader.PlayReadyRecord>;
            public getData(): java.nio.ByteBuffer;
            public getSystemId(): java.util.UUID;
            public parse(param0: java.nio.ByteBuffer): void;
            public setRecords(param0: java.util.List<org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader.PlayReadyRecord>): void;
            public toString(): string;
          }
          export module PlayReadyHeader {
            export abstract class PlayReadyRecord {
              public static class: java.lang.Class<org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader.PlayReadyRecord>;
              public toString(): string;
              public parse(param0: java.nio.ByteBuffer): void;
              public static createFor(param0: java.nio.ByteBuffer, param1: number): java.util.List<org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader.PlayReadyRecord>;
              public getValue(): java.nio.ByteBuffer;
              public constructor(param0: number);
            }
            export module PlayReadyRecord {
              export class DefaulPlayReadyRecord extends org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader.PlayReadyRecord {
                public static class: java.lang.Class<org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader.PlayReadyRecord.DefaulPlayReadyRecord>;
                public constructor(param0: number);
                public parse(param0: java.nio.ByteBuffer): void;
                public getValue(): java.nio.ByteBuffer;
              }
              export class EmeddedLicenseStore extends org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader.PlayReadyRecord {
                public static class: java.lang.Class<org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader.PlayReadyRecord.EmeddedLicenseStore>;
                public toString(): string;
                public constructor(param0: number);
                public constructor();
                public parse(param0: java.nio.ByteBuffer): void;
                public getValue(): java.nio.ByteBuffer;
              }
              export class RMHeader extends org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader.PlayReadyRecord {
                public static class: java.lang.Class<org.mp4parser.boxes.microsoft.contentprotection.PlayReadyHeader.PlayReadyRecord.RMHeader>;
                public toString(): string;
                public constructor(param0: number);
                public getHeader(): string;
                public constructor();
                public parse(param0: java.nio.ByteBuffer): void;
                public getValue(): java.nio.ByteBuffer;
                public setHeader(param0: string): void;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module oma {
        export class OmaDrmAccessUnitFormatBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.oma.OmaDrmAccessUnitFormatBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public setKeyIndicatorLength(param0: number): void;
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public getVersion(): number;
          public getInitVectorLength(): number;
          public isSelectiveEncryption(): boolean;
          public getKeyIndicatorLength(): number;
          public setInitVectorLength(param0: number): void;
          public setAllBits(param0: number): void;
          public constructor();
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module sampleentry {
        export abstract class AbstractSampleEntry extends org.mp4parser.support.AbstractContainerBox implements org.mp4parser.boxes.sampleentry.SampleEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.AbstractSampleEntry>;
          public dataReferenceIndex: number;
          public getDataReferenceIndex(): number;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public constructor(param0: string);
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setDataReferenceIndex(param0: number): void;
          public getSize(): number;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public getType(): string;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module sampleentry {
        export class AmrSpecificBox extends org.mp4parser.support.AbstractBox {
          public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.AmrSpecificBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getVendor(): string;
          public getFramesPerSample(): number;
          public getModeChangePeriod(): number;
          public toString(): string;
          public constructor();
          public getModeSet(): number;
          public getDecoderVersion(): number;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module sampleentry {
        export class AudioSampleEntry extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.AudioSampleEntry>;
          public static TYPE1: string;
          public static TYPE2: string;
          public static TYPE3: string;
          public static TYPE4: string;
          public static TYPE5: string;
          public static TYPE7: string;
          public static TYPE8: string;
          public static TYPE9: string;
          public static TYPE10: string;
          public static TYPE11: string;
          public static TYPE12: string;
          public static TYPE13: string;
          public static TYPE_ENCRYPTED: string;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public getChannelCount(): number;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public setType(param0: string): void;
          public getReserved2(): number;
          public getSampleRate(): number;
          public setSoundVersion(param0: number): void;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setDataReferenceIndex(param0: number): void;
          public setBytesPerPacket(param0: number): void;
          public getSize(): number;
          public setReserved2(param0: number): void;
          public setChannelCount(param0: number): void;
          public getBytesPerFrame(): number;
          public toString(): string;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public setSampleSize(param0: number): void;
          public getSoundVersion2Data(): androidNative.Array<number>;
          public constructor();
          public getCompressionId(): number;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public getSamplesPerPacket(): number;
          public hashCode(): number;
          public setSampleRate(param0: number): void;
          public getSoundVersion(): number;
          public setBytesPerFrame(param0: number): void;
          public getDataReferenceIndex(): number;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public setCompressionId(param0: number): void;
          public getReserved1(): number;
          public setPacketSize(param0: number): void;
          public setReserved1(param0: number): void;
          public getBytesPerSample(): number;
          public equals(param0: any): boolean;
          public getBytesPerPacket(): number;
          public setSamplesPerPacket(param0: number): void;
          public getSampleSize(): number;
          public setBoxes(param0: java.util.List<any>): void;
          public setSoundVersion2Data(param0: androidNative.Array<number>): void;
          public getPacketSize(): number;
          public setBytesPerSample(param0: number): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module sampleentry {
        export class DfxpSampleEntry extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.DfxpSampleEntry>;
          public getDataReferenceIndex(): number;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public constructor(param0: string);
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setDataReferenceIndex(param0: number): void;
          public getSize(): number;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module sampleentry {
        export class MpegSampleEntry extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.MpegSampleEntry>;
          public getDataReferenceIndex(): number;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public constructor(param0: string);
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setDataReferenceIndex(param0: number): void;
          public getSize(): number;
          public toString(): string;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module sampleentry {
        export class Ovc1VisualSampleEntryImpl extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.Ovc1VisualSampleEntryImpl>;
          public static TYPE: string;
          public getDataReferenceIndex(): number;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public constructor(param0: string);
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setDataReferenceIndex(param0: number): void;
          public getSize(): number;
          public getVc1Content(): androidNative.Array<number>;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public constructor();
          public setBoxes(param0: java.util.List<any>): void;
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public setVc1Content(param0: androidNative.Array<number>): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module sampleentry {
        export class SampleEntry implements org.mp4parser.ParsableBox, org.mp4parser.Container {
          public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.SampleEntry>;
          /**
           * Constructs a new instance of the org.mp4parser.boxes.sampleentry.SampleEntry interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            getDataReferenceIndex(): number;
            setDataReferenceIndex(param0: number): void;
            parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            getBoxes(): java.util.List<org.mp4parser.Box>;
            setBoxes(param0: java.util.List<any>): void;
            getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
            getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
            writeContainer(param0: java.nio.channels.WritableByteChannel): void;
            getType(): string;
            getSize(): number;
            getBox(param0: java.nio.channels.WritableByteChannel): void;
          });
          public constructor();
          public getDataReferenceIndex(): number;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public setBoxes(param0: java.util.List<any>): void;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setDataReferenceIndex(param0: number): void;
          public getType(): string;
          public getSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module sampleentry {
        export class TextSampleEntry extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.TextSampleEntry>;
          public static TYPE1: string;
          public static TYPE_ENCRYPTED: string;
          public setScrollIn(param0: boolean): void;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public setBoxRecord(param0: org.mp4parser.boxes.sampleentry.TextSampleEntry.BoxRecord): void;
          public setScrollOut(param0: boolean): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public isScrollOut(): boolean;
          public constructor(param0: string);
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public setType(param0: string): void;
          public setBackgroundColorRgba(param0: androidNative.Array<number>): void;
          public isScrollIn(): boolean;
          public getVerticalJustification(): number;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setStyleRecord(param0: org.mp4parser.boxes.sampleentry.TextSampleEntry.StyleRecord): void;
          public setDataReferenceIndex(param0: number): void;
          public getStyleRecord(): org.mp4parser.boxes.sampleentry.TextSampleEntry.StyleRecord;
          public setHorizontalJustification(param0: number): void;
          public getSize(): number;
          public setFillTextRegion(param0: boolean): void;
          public getBackgroundColorRgba(): androidNative.Array<number>;
          public toString(): string;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public constructor();
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public setScrollDirection(param0: boolean): void;
          public isScrollDirection(): boolean;
          public setVerticalJustification(param0: number): void;
          public getDataReferenceIndex(): number;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public isFillTextRegion(): boolean;
          public getBoxRecord(): org.mp4parser.boxes.sampleentry.TextSampleEntry.BoxRecord;
          public setWriteTextVertically(param0: boolean): void;
          public isContinuousKaraoke(): boolean;
          public setContinuousKaraoke(param0: boolean): void;
          public isWriteTextVertically(): boolean;
          public getHorizontalJustification(): number;
          public setBoxes(param0: java.util.List<any>): void;
        }
        export module TextSampleEntry {
          export class BoxRecord {
            public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.TextSampleEntry.BoxRecord>;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public getSize(): number;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public parse(param0: java.nio.ByteBuffer): void;
            public constructor(param0: number, param1: number, param2: number, param3: number);
          }
          export class StyleRecord {
            public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.TextSampleEntry.StyleRecord>;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public getSize(): number;
            public constructor(param0: number, param1: number, param2: number, param3: number, param4: number, param5: androidNative.Array<number>);
            public equals(param0: any): boolean;
            public hashCode(): number;
            public parse(param0: java.nio.ByteBuffer): void;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module sampleentry {
        export class VisualSampleEntry extends org.mp4parser.boxes.sampleentry.AbstractSampleEntry implements org.mp4parser.Container {
          public static class: java.lang.Class<org.mp4parser.boxes.sampleentry.VisualSampleEntry>;
          public static TYPE1: string;
          public static TYPE2: string;
          public static TYPE3: string;
          public static TYPE4: string;
          public static TYPE5: string;
          public static TYPE6: string;
          public static TYPE7: string;
          public static TYPE_ENCRYPTED: string;
          public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
          public setCompressorname(param0: string): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getBox(param0: java.nio.channels.WritableByteChannel): void;
          public setType(param0: string): void;
          public setHeight(param0: number): void;
          public getBoxes(): java.util.List<org.mp4parser.Box>;
          public setDataReferenceIndex(param0: number): void;
          public getSize(): number;
          public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
          public constructor();
          public constructor(param0: java.util.List<org.mp4parser.Box>);
          public setHorizresolution(param0: number): void;
          public setFrameCount(param0: number): void;
          public hashCode(): number;
          public getCompressorname(): string;
          public getDataReferenceIndex(): number;
          public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
          public setWidth(param0: number): void;
          public getHeight(): number;
          public getWidth(): number;
          public setVertresolution(param0: number): void;
          public setDepth(param0: number): void;
          public getHorizresolution(): number;
          public equals(param0: any): boolean;
          public setBoxes(param0: java.util.List<any>): void;
          public getVertresolution(): number;
          public getDepth(): number;
          public getFrameCount(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module samplegrouping {
        export abstract class GroupEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.samplegrouping.GroupEntry>;
          public get(): java.nio.ByteBuffer;
          public constructor();
          public parse(param0: java.nio.ByteBuffer): void;
          public size(): number;
          public getType(): string;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module samplegrouping {
        export class RateShareEntry extends org.mp4parser.boxes.samplegrouping.GroupEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.samplegrouping.RateShareEntry>;
          public static TYPE: string;
          public get(): java.nio.ByteBuffer;
          public getMinimumBitrate(): number;
          public setMaximumBitrate(param0: number): void;
          public setOperationPointCut(param0: number): void;
          public setTargetRateShare(param0: number): void;
          public setMinimumBitrate(param0: number): void;
          public setDiscardPriority(param0: number): void;
          public setEntries(param0: java.util.List<org.mp4parser.boxes.samplegrouping.RateShareEntry.Entry>): void;
          public getDiscardPriority(): number;
          public equals(param0: any): boolean;
          public constructor();
          public getTargetRateShare(): number;
          public parse(param0: java.nio.ByteBuffer): void;
          public getOperationPointCut(): number;
          public getEntries(): java.util.List<org.mp4parser.boxes.samplegrouping.RateShareEntry.Entry>;
          public getType(): string;
          public hashCode(): number;
          public getMaximumBitrate(): number;
        }
        export module RateShareEntry {
          export class Entry {
            public static class: java.lang.Class<org.mp4parser.boxes.samplegrouping.RateShareEntry.Entry>;
            public getTargetRateShare(): number;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public setTargetRateShare(param0: number): void;
            public setAvailableBitrate(param0: number): void;
            public getAvailableBitrate(): number;
            public constructor(param0: number, param1: number);
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module samplegrouping {
        export class RollRecoveryEntry extends org.mp4parser.boxes.samplegrouping.GroupEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.samplegrouping.RollRecoveryEntry>;
          public static TYPE: string;
          public equals(param0: any): boolean;
          public get(): java.nio.ByteBuffer;
          public constructor();
          public parse(param0: java.nio.ByteBuffer): void;
          public getType(): string;
          public hashCode(): number;
          public setRollDistance(param0: number): void;
          public getRollDistance(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module samplegrouping {
        export class SampleGroupDescriptionBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.samplegrouping.SampleGroupDescriptionBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public getDefaultLength(): number;
          public getGroupEntries(): java.util.List<org.mp4parser.boxes.samplegrouping.GroupEntry>;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public getVersion(): number;
          public getGroupingType(): string;
          public setDefaultLength(param0: number): void;
          public equals(param0: any): boolean;
          public toString(): string;
          public constructor();
          public setGroupingType(param0: string): void;
          public setVersion(param0: number): void;
          public setGroupEntries(param0: java.util.List<org.mp4parser.boxes.samplegrouping.GroupEntry>): void;
          public setFlags(param0: number): void;
          public hashCode(): number;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module samplegrouping {
        export class SampleToGroupBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.samplegrouping.SampleToGroupBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public setEntries(param0: java.util.List<org.mp4parser.boxes.samplegrouping.SampleToGroupBox.Entry>): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public setGroupingTypeParameter(param0: string): void;
          public getEntries(): java.util.List<org.mp4parser.boxes.samplegrouping.SampleToGroupBox.Entry>;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public getVersion(): number;
          public getGroupingType(): string;
          public getGroupingTypeParameter(): string;
          public constructor();
          public setGroupingType(param0: string): void;
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public getContentSize(): number;
        }
        export module SampleToGroupBox {
          export class Entry {
            public static class: java.lang.Class<org.mp4parser.boxes.samplegrouping.SampleToGroupBox.Entry>;
            public getSampleCount(): number;
            public getGroupDescriptionIndex(): number;
            public setSampleCount(param0: number): void;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public setGroupDescriptionIndex(param0: number): void;
            public constructor(param0: number, param1: number);
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module samplegrouping {
        export class TemporalLevelEntry extends org.mp4parser.boxes.samplegrouping.GroupEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.samplegrouping.TemporalLevelEntry>;
          public static TYPE: string;
          public equals(param0: any): boolean;
          public get(): java.nio.ByteBuffer;
          public toString(): string;
          public constructor();
          public isLevelIndependentlyDecodable(): boolean;
          public parse(param0: java.nio.ByteBuffer): void;
          public setLevelIndependentlyDecodable(param0: boolean): void;
          public getType(): string;
          public hashCode(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module samplegrouping {
        export class UnknownEntry extends org.mp4parser.boxes.samplegrouping.GroupEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.samplegrouping.UnknownEntry>;
          public equals(param0: any): boolean;
          public getContent(): java.nio.ByteBuffer;
          public get(): java.nio.ByteBuffer;
          public toString(): string;
          public constructor(param0: string);
          public constructor();
          public parse(param0: java.nio.ByteBuffer): void;
          public setContent(param0: java.nio.ByteBuffer): void;
          public getType(): string;
          public hashCode(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module samplegrouping {
        export class VisualRandomAccessEntry extends org.mp4parser.boxes.samplegrouping.GroupEntry {
          public static class: java.lang.Class<org.mp4parser.boxes.samplegrouping.VisualRandomAccessEntry>;
          public static TYPE: string;
          public getNumLeadingSamples(): number;
          public equals(param0: any): boolean;
          public get(): java.nio.ByteBuffer;
          public toString(): string;
          public constructor();
          public setNumLeadingSamplesKnown(param0: boolean): void;
          public parse(param0: java.nio.ByteBuffer): void;
          public getType(): string;
          public hashCode(): number;
          public isNumLeadingSamplesKnown(): boolean;
          public setNumLeadingSamples(param0: number): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class AlbumBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.AlbumBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setTrackNumber(param0: number): void;
            public getAlbumTitle(): string;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setAlbumTitle(param0: string): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public setLanguage(param0: string): void;
            public getFlags(): number;
            public getTrackNumber(): number;
            public getLanguage(): string;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class AuthorBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.AuthorBox>;
            public static TYPE: string;
            public getAuthor(): string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public setAuthor(param0: string): void;
            public setLanguage(param0: string): void;
            public getFlags(): number;
            public getLanguage(): string;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class ClassificationBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.ClassificationBox>;
            public static TYPE: string;
            public constructor();
            public setClassificationTableIndex(param0: number): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getClassificationEntity(): string;
            public toString(): string;
            public setFlags(param0: number): void;
            public getClassificationTableIndex(): number;
            public setLanguage(param0: string): void;
            public getFlags(): number;
            public getLanguage(): string;
            public setClassificationEntity(param0: string): void;
            public getContentSize(): number;
            public setClassificationInfo(param0: string): void;
            public constructor(param0: string);
            public getClassificationInfo(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class CopyrightBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.CopyrightBox>;
            public static TYPE: string;
            public getCopyright(): string;
            public constructor();
            public setCopyright(param0: string): void;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public setLanguage(param0: string): void;
            public getFlags(): number;
            public getLanguage(): string;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class DescriptionBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.DescriptionBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setDescription(param0: string): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public setLanguage(param0: string): void;
            public getFlags(): number;
            public getLanguage(): string;
            public getDescription(): string;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class GenreBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.GenreBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public setGenre(param0: string): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getGenre(): string;
            public setLanguage(param0: string): void;
            public getFlags(): number;
            public getLanguage(): string;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class KeywordsBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.KeywordsBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public setLanguage(param0: string): void;
            public setKeywords(param0: androidNative.Array<string>): void;
            public getFlags(): number;
            public getKeywords(): androidNative.Array<string>;
            public getLanguage(): string;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class LocationInformationBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.LocationInformationBox>;
            public static TYPE: string;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getAltitude(): number;
            public setVersion(param0: number): void;
            public getName(): string;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public getLatitude(): number;
            public setLanguage(param0: string): void;
            public setLatitude(param0: number): void;
            public setAdditionalNotes(param0: string): void;
            public getFlags(): number;
            public setRole(param0: number): void;
            public setAstronomicalBody(param0: string): void;
            public getLanguage(): string;
            public setAltitude(param0: number): void;
            public getRole(): number;
            public getLongitude(): number;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public setName(param0: string): void;
            public getAdditionalNotes(): string;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public setFlags(param0: number): void;
            public setLongitude(param0: number): void;
            public getContentSize(): number;
            public getAstronomicalBody(): string;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class PerformerBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.PerformerBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public getPerformer(): string;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public setLanguage(param0: string): void;
            public getFlags(): number;
            public getLanguage(): string;
            public setPerformer(param0: string): void;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class RatingBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.RatingBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setRatingCriteria(param0: string): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getRatingEntity(): string;
            public setLanguage(param0: string): void;
            public getRatingCriteria(): string;
            public getFlags(): number;
            public setRatingEntity(param0: string): void;
            public getLanguage(): string;
            public getContentSize(): number;
            public setRatingInfo(param0: string): void;
            public getRatingInfo(): string;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class RecordingYearBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.RecordingYearBox>;
            public static TYPE: string;
            public setRecordingYear(param0: number): void;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public setFlags(param0: number): void;
            public getRecordingYear(): number;
            public getFlags(): number;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26244 {
          export class TitleBox extends org.mp4parser.support.AbstractFullBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26244.TitleBox>;
            public static TYPE: string;
            public constructor();
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public getVersion(): number;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public setVersion(param0: number): void;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public toString(): string;
            public setFlags(param0: number): void;
            public getTitle(): string;
            public setTitle(param0: string): void;
            public setLanguage(param0: string): void;
            public getFlags(): number;
            public getLanguage(): string;
            public getContentSize(): number;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module threegpp {
        export module ts26245 {
          export class FontTableBox extends org.mp4parser.support.AbstractBox {
            public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26245.FontTableBox>;
            public static TYPE: string;
            public constructor();
            public getEntries(): java.util.List<org.mp4parser.boxes.threegpp.ts26245.FontTableBox.FontRecord>;
            public getContent(param0: java.nio.ByteBuffer): void;
            public _parseDetails(param0: java.nio.ByteBuffer): void;
            public setEntries(param0: java.util.List<org.mp4parser.boxes.threegpp.ts26245.FontTableBox.FontRecord>): void;
            public constructor(param0: string, param1: androidNative.Array<number>);
            public getContentSize(): number;
            public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
            public constructor(param0: string);
          }
          export module FontTableBox {
            export class FontRecord {
              public static class: java.lang.Class<org.mp4parser.boxes.threegpp.ts26245.FontTableBox.FontRecord>;
              public constructor();
              public getSize(): number;
              public toString(): string;
              public parse(param0: java.nio.ByteBuffer): void;
              public getContent(param0: java.nio.ByteBuffer): void;
              public constructor(param0: number, param1: string);
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module webm {
        export class ContentLightLevelBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.webm.ContentLightLevelBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getFlags(): number;
          public getVersion(): number;
          public setMaxFALL(param0: number): void;
          public getMaxFALL(): number;
          public getMaxCLL(): number;
          public constructor();
          public setVersion(param0: number): void;
          public setFlags(param0: number): void;
          public setMaxCLL(param0: number): void;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module webm {
        export class SMPTE2086MasteringDisplayMetadataBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.webm.SMPTE2086MasteringDisplayMetadataBox>;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getWhitePointChromaticity_y(): number;
          public getFlags(): number;
          public getPrimaryRChromaticity_x(): number;
          public setWhitePointChromaticity_y(param0: number): void;
          public constructor();
          public getPrimaryBChromaticity_y(): number;
          public setFlags(param0: number): void;
          public setPrimaryBChromaticity_x(param0: number): void;
          public getLuminanceMax(): number;
          public setPrimaryRChromaticity_y(param0: number): void;
          public getPrimaryGChromaticity_x(): number;
          public setPrimaryGChromaticity_x(param0: number): void;
          public getPrimaryRChromaticity_y(): number;
          public getLuminanceMin(): number;
          public getPrimaryBChromaticity_x(): number;
          public getVersion(): number;
          public getPrimaryGChromaticity_y(): number;
          public setPrimaryBChromaticity_y(param0: number): void;
          public setVersion(param0: number): void;
          public setLuminanceMax(param0: number): void;
          public getWhitePointChromaticity_x(): number;
          public setLuminanceMin(param0: number): void;
          public setWhitePointChromaticity_x(param0: number): void;
          public getContentSize(): number;
          public setPrimaryRChromaticity_x(param0: number): void;
          public setPrimaryGChromaticity_y(param0: number): void;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module boxes {
      export module webm {
        export class VPCodecConfigurationBox extends org.mp4parser.support.AbstractFullBox {
          public static class: java.lang.Class<org.mp4parser.boxes.webm.VPCodecConfigurationBox>;
          public static TYPE: string;
          public getContent(param0: java.nio.ByteBuffer): void;
          public constructor(param0: string, param1: androidNative.Array<number>);
          public _parseDetails(param0: java.nio.ByteBuffer): void;
          public setCodecIntializationData(param0: androidNative.Array<number>): void;
          public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
          public constructor(param0: string);
          public getVideoFullRangeFlag(): number;
          public getFlags(): number;
          public setVideoFullRangeFlag(param0: number): void;
          public getColourPrimaries(): number;
          public getTransferCharacteristics(): number;
          public setTransferCharacteristics(param0: number): void;
          public toString(): string;
          public constructor();
          public setProfile(param0: number): void;
          public setFlags(param0: number): void;
          public getChromaSubsampling(): number;
          public setLevel(param0: number): void;
          public getVersion(): number;
          public setColourPrimaries(param0: number): void;
          public setMatrixCoefficients(param0: number): void;
          public setChromaSubsampling(param0: number): void;
          public getLevel(): number;
          public getCodecIntializationData(): androidNative.Array<number>;
          public setBitDepth(param0: number): void;
          public getBitDepth(): number;
          public setVersion(param0: number): void;
          public getMatrixCoefficients(): number;
          public getProfile(): number;
          public getContentSize(): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export abstract class AbstractTrack extends org.mp4parser.muxer.Track {
        public static class: java.lang.Class<org.mp4parser.muxer.AbstractTrack>;
        public getHandler(): string;
        public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
        public getDuration(): number;
        public getSyncSamples(): androidNative.Array<number>;
        public getName(): string;
        public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
        public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
        public constructor(param0: string);
        public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
        public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
        public getSampleDurations(): androidNative.Array<number>;
        public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
        public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class CencMp4TrackImplImpl extends org.mp4parser.muxer.Mp4TrackImpl implements org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack {
        public static class: java.lang.Class<org.mp4parser.muxer.CencMp4TrackImplImpl>;
        public getHandler(): string;
        public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
        public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        public getDuration(): number;
        public hasSubSampleEncryption(): boolean;
        public getName(): string;
        public getSyncSamples(): androidNative.Array<number>;
        public toString(): string;
        public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
        public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
        public constructor(param0: string);
        public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
        public constructor(param0: number, param1: org.mp4parser.Container, param2: org.mp4parser.muxer.RandomAccessSource, param3: string);
        public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
        public getSampleEncryptionEntries(): java.util.List<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat>;
        public getSampleDurations(): androidNative.Array<number>;
        public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
        public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
      }
      export module CencMp4TrackImplImpl {
        export class FindSaioSaizPair {
          public static class: java.lang.Class<org.mp4parser.muxer.CencMp4TrackImplImpl.FindSaioSaizPair>;
          public constructor(param0: org.mp4parser.muxer.CencMp4TrackImplImpl, param1: org.mp4parser.Container);
          public invoke(): org.mp4parser.muxer.CencMp4TrackImplImpl.FindSaioSaizPair;
          public getSaio(): org.mp4parser.boxes.iso14496.part12.SampleAuxiliaryInformationOffsetsBox;
          public getSaiz(): org.mp4parser.boxes.iso14496.part12.SampleAuxiliaryInformationSizesBox;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class DataSource {
        public static class: java.lang.Class<org.mp4parser.muxer.DataSource>;
        /**
         * Constructs a new instance of the org.mp4parser.muxer.DataSource interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          read(param0: java.nio.ByteBuffer): number;
          size(): number;
          position(): number;
          position(param0: number): void;
          transferTo(param0: number, param1: number, param2: java.nio.channels.WritableByteChannel): number;
          map(param0: number, param1: number): java.nio.ByteBuffer;
          close(): void;
        });
        public constructor();
        public position(): number;
        public position(param0: number): void;
        public close(): void;
        public read(param0: java.nio.ByteBuffer): number;
        public transferTo(param0: number, param1: number, param2: java.nio.channels.WritableByteChannel): number;
        public map(param0: number, param1: number): java.nio.ByteBuffer;
        public size(): number;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class Edit {
        public static class: java.lang.Class<org.mp4parser.muxer.Edit>;
        public getSegmentDuration(): number;
        public getMediaRate(): number;
        public constructor(param0: number, param1: number, param2: number, param3: number);
        public getTimeScale(): number;
        public getMediaTime(): number;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class FileDataSourceImpl extends org.mp4parser.muxer.DataSource {
        public static class: java.lang.Class<org.mp4parser.muxer.FileDataSourceImpl>;
        public constructor(param0: java.nio.channels.FileChannel, param1: string);
        public position(): number;
        public position(param0: number): void;
        public close(): void;
        public constructor(param0: java.io.File);
        public constructor(param0: java.nio.channels.FileChannel);
        public read(param0: java.nio.ByteBuffer): number;
        public transferTo(param0: number, param1: number, param2: java.nio.channels.WritableByteChannel): number;
        public map(param0: number, param1: number): java.nio.ByteBuffer;
        public toString(): string;
        public constructor(param0: string);
        public size(): number;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class FileDataSourceViaHeapImpl extends org.mp4parser.muxer.DataSource {
        public static class: java.lang.Class<org.mp4parser.muxer.FileDataSourceViaHeapImpl>;
        public constructor(param0: java.nio.channels.FileChannel, param1: string);
        public position(): number;
        public position(param0: number): void;
        public close(): void;
        public constructor(param0: java.io.File);
        public constructor(param0: java.nio.channels.FileChannel);
        public read(param0: java.nio.ByteBuffer): number;
        public transferTo(param0: number, param1: number, param2: java.nio.channels.WritableByteChannel): number;
        public map(param0: number, param1: number): java.nio.ByteBuffer;
        public toString(): string;
        public constructor(param0: string);
        public size(): number;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class FileRandomAccessSourceImpl extends org.mp4parser.muxer.RandomAccessSource {
        public static class: java.lang.Class<org.mp4parser.muxer.FileRandomAccessSourceImpl>;
        public get(param0: number, param1: number): java.nio.ByteBuffer;
        public close(): void;
        public constructor(param0: java.io.RandomAccessFile);
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class InMemRandomAccessSourceImpl extends org.mp4parser.muxer.RandomAccessSource {
        public static class: java.lang.Class<org.mp4parser.muxer.InMemRandomAccessSourceImpl>;
        public get(param0: number, param1: number): java.nio.ByteBuffer;
        public constructor(param0: java.nio.ByteBuffer);
        public close(): void;
        public constructor(param0: androidNative.Array<number>);
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class MemoryDataSourceImpl extends org.mp4parser.muxer.DataSource {
        public static class: java.lang.Class<org.mp4parser.muxer.MemoryDataSourceImpl>;
        public position(): number;
        public position(param0: number): void;
        public constructor(param0: java.nio.ByteBuffer);
        public close(): void;
        public constructor(param0: androidNative.Array<number>);
        public read(param0: java.nio.ByteBuffer): number;
        public transferTo(param0: number, param1: number, param2: java.nio.channels.WritableByteChannel): number;
        public map(param0: number, param1: number): java.nio.ByteBuffer;
        public size(): number;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class Movie {
        public static class: java.lang.Class<org.mp4parser.muxer.Movie>;
        public getNextTrackId(): number;
        public constructor(param0: java.util.List<org.mp4parser.muxer.Track>);
        public getTrackByTrackId(param0: number): org.mp4parser.muxer.Track;
        public setTracks(param0: java.util.List<org.mp4parser.muxer.Track>): void;
        public getTracks(): java.util.List<org.mp4parser.muxer.Track>;
        public getMatrix(): org.mp4parser.support.Matrix;
        public addTrack(param0: org.mp4parser.muxer.Track): void;
        public toString(): string;
        public setMatrix(param0: org.mp4parser.support.Matrix): void;
        public constructor();
        public getTimescale(): number;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class Mp4TrackImpl extends org.mp4parser.muxer.AbstractTrack {
        public static class: java.lang.Class<org.mp4parser.muxer.Mp4TrackImpl>;
        public getHandler(): string;
        public close(): void;
        public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
        public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        public getDuration(): number;
        public getSyncSamples(): androidNative.Array<number>;
        public getName(): string;
        public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
        public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
        public constructor(param0: string);
        public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
        public constructor(param0: number, param1: org.mp4parser.Container, param2: org.mp4parser.muxer.RandomAccessSource, param3: string);
        public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
        public getSampleDurations(): androidNative.Array<number>;
        public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
        public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class MultiFileDataSourceImpl extends org.mp4parser.muxer.DataSource {
        public static class: java.lang.Class<org.mp4parser.muxer.MultiFileDataSourceImpl>;
        public position(): number;
        public position(param0: number): void;
        public constructor(param0: androidNative.Array<java.io.File>);
        public close(): void;
        public read(param0: java.nio.ByteBuffer): number;
        public transferTo(param0: number, param1: number, param2: java.nio.channels.WritableByteChannel): number;
        public map(param0: number, param1: number): java.nio.ByteBuffer;
        public size(): number;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class PiffMp4TrackImpl extends org.mp4parser.muxer.Mp4TrackImpl implements org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack {
        public static class: java.lang.Class<org.mp4parser.muxer.PiffMp4TrackImpl>;
        public getHandler(): string;
        public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
        public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        public getDefaultKeyId(): java.util.UUID;
        public getDuration(): number;
        public hasSubSampleEncryption(): boolean;
        public getName(): string;
        public getSyncSamples(): androidNative.Array<number>;
        public toString(): string;
        public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
        public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
        public constructor(param0: string);
        public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
        public constructor(param0: number, param1: org.mp4parser.Container, param2: org.mp4parser.muxer.RandomAccessSource, param3: string);
        public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
        public getSampleEncryptionEntries(): java.util.List<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat>;
        public getSampleDurations(): androidNative.Array<number>;
        public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
        public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class RandomAccessSource {
        public static class: java.lang.Class<org.mp4parser.muxer.RandomAccessSource>;
        /**
         * Constructs a new instance of the org.mp4parser.muxer.RandomAccessSource interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { get(param0: number, param1: number): java.nio.ByteBuffer });
        public constructor();
        public get(param0: number, param1: number): java.nio.ByteBuffer;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class Sample {
        public static class: java.lang.Class<org.mp4parser.muxer.Sample>;
        /**
         * Constructs a new instance of the org.mp4parser.muxer.Sample interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          writeTo(param0: java.nio.channels.WritableByteChannel): void;
          getSize(): number;
          asByteBuffer(): java.nio.ByteBuffer;
          getSampleEntry(): org.mp4parser.boxes.sampleentry.SampleEntry;
        });
        public constructor();
        public getSampleEntry(): org.mp4parser.boxes.sampleentry.SampleEntry;
        public asByteBuffer(): java.nio.ByteBuffer;
        public getSize(): number;
        public writeTo(param0: java.nio.channels.WritableByteChannel): void;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class SampleImpl extends org.mp4parser.muxer.Sample {
        public static class: java.lang.Class<org.mp4parser.muxer.SampleImpl>;
        public getSampleEntry(): org.mp4parser.boxes.sampleentry.SampleEntry;
        public constructor(param0: androidNative.Array<java.nio.ByteBuffer>, param1: org.mp4parser.boxes.sampleentry.SampleEntry);
        public asByteBuffer(): java.nio.ByteBuffer;
        public getSize(): number;
        public constructor(param0: number, param1: number, param2: java.nio.ByteBuffer, param3: org.mp4parser.boxes.sampleentry.SampleEntry);
        public writeTo(param0: java.nio.channels.WritableByteChannel): void;
        public toString(): string;
        public constructor(param0: java.nio.ByteBuffer, param1: org.mp4parser.boxes.sampleentry.SampleEntry);
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class Track {
        public static class: java.lang.Class<org.mp4parser.muxer.Track>;
        /**
         * Constructs a new instance of the org.mp4parser.muxer.Track interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          getSampleDurations(): androidNative.Array<number>;
          getDuration(): number;
          getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          getSyncSamples(): androidNative.Array<number>;
          getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          getHandler(): string;
          getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          getName(): string;
          getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        });
        public constructor();
        public getHandler(): string;
        public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
        public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        public getDuration(): number;
        public getSyncSamples(): androidNative.Array<number>;
        public getName(): string;
        public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
        public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
        public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
        public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
        public getSampleDurations(): androidNative.Array<number>;
        public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
        public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class TrackMetaData {
        public static class: java.lang.Class<org.mp4parser.muxer.TrackMetaData>;
        public setHeight(param0: number): void;
        public getHeight(): number;
        public getModificationTime(): java.util.Date;
        public setLayer(param0: number): void;
        public getMatrix(): org.mp4parser.support.Matrix;
        public setGroup(param0: number): void;
        public getGroup(): number;
        public constructor();
        public setWidth(param0: number): void;
        public getVolume(): number;
        public getTrackId(): number;
        public getWidth(): number;
        public getLayer(): number;
        public setLanguage(param0: string): void;
        public setCreationTime(param0: java.util.Date): void;
        public setVolume(param0: number): void;
        public getLanguage(): string;
        public getCreationTime(): java.util.Date;
        public setModificationTime(param0: java.util.Date): void;
        public setTimescale(param0: number): void;
        public clone(): any;
        public setTrackId(param0: number): void;
        public setMatrix(param0: org.mp4parser.support.Matrix): void;
        public getTimescale(): number;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export class WrappingTrack extends org.mp4parser.muxer.Track {
        public static class: java.lang.Class<org.mp4parser.muxer.WrappingTrack>;
        public getHandler(): string;
        public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
        public close(): void;
        public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        public getDuration(): number;
        public getSyncSamples(): androidNative.Array<number>;
        public getName(): string;
        public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
        public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
        public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
        public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
        public constructor(param0: org.mp4parser.muxer.Track);
        public getSampleDurations(): androidNative.Array<number>;
        public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
        public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module builder {
        export class ByteBufferHelper {
          public static class: java.lang.Class<org.mp4parser.muxer.builder.ByteBufferHelper>;
          public constructor();
          public static mergeAdjacentBuffers(param0: java.util.List<java.nio.ByteBuffer>): java.util.List<java.nio.ByteBuffer>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module builder {
        export class DefaultFragmenterImpl extends org.mp4parser.muxer.builder.Fragmenter {
          public static class: java.lang.Class<org.mp4parser.muxer.builder.DefaultFragmenterImpl>;
          public static main(param0: androidNative.Array<string>): void;
          public sampleNumbers(param0: org.mp4parser.muxer.Track): androidNative.Array<number>;
          public constructor(param0: number);
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module builder {
        export class DefaultMp4Builder extends org.mp4parser.muxer.builder.Mp4Builder {
          public static class: java.lang.Class<org.mp4parser.muxer.builder.DefaultMp4Builder>;
          public createMovieBox(param0: org.mp4parser.muxer.Movie, param1: java.util.Map<org.mp4parser.muxer.Track, androidNative.Array<number>>): org.mp4parser.boxes.iso14496.part12.MovieBox;
          public createStsc(
            param0: org.mp4parser.muxer.Track,
            param1: java.util.Map<org.mp4parser.muxer.Track, androidNative.Array<number>>,
            param2: org.mp4parser.boxes.iso14496.part12.SampleTableBox
          ): void;
          public createStsd(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.boxes.iso14496.part12.SampleTableBox): void;
          public createSdtp(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.boxes.iso14496.part12.SampleTableBox): void;
          public createCencBoxes(
            param0: org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack,
            param1: org.mp4parser.boxes.iso14496.part12.SampleTableBox,
            param2: androidNative.Array<number>
          ): void;
          public createStts(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.boxes.iso14496.part12.SampleTableBox): void;
          public createStco(
            param0: org.mp4parser.muxer.Track,
            param1: org.mp4parser.muxer.Movie,
            param2: java.util.Map<org.mp4parser.muxer.Track, androidNative.Array<number>>,
            param3: org.mp4parser.boxes.iso14496.part12.SampleTableBox
          ): void;
          public setFragmenter(param0: org.mp4parser.muxer.builder.Fragmenter): void;
          public putSamples(param0: org.mp4parser.muxer.Track, param1: java.util.List<org.mp4parser.muxer.Sample>): java.util.List<org.mp4parser.muxer.Sample>;
          public createCtts(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.boxes.iso14496.part12.SampleTableBox): void;
          public createFileTypeBox(param0: org.mp4parser.muxer.Movie): org.mp4parser.boxes.iso14496.part12.FileTypeBox;
          public createUdta(param0: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public getTimescale(param0: org.mp4parser.muxer.Movie): number;
          public createTrackBox(
            param0: org.mp4parser.muxer.Track,
            param1: org.mp4parser.muxer.Movie,
            param2: java.util.Map<org.mp4parser.muxer.Track, androidNative.Array<number>>
          ): org.mp4parser.boxes.iso14496.part12.TrackBox;
          public createStss(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.boxes.iso14496.part12.SampleTableBox): void;
          public createStbl(
            param0: org.mp4parser.muxer.Track,
            param1: org.mp4parser.muxer.Movie,
            param2: java.util.Map<org.mp4parser.muxer.Track, androidNative.Array<number>>
          ): org.mp4parser.ParsableBox;
          public constructor();
          public build(param0: org.mp4parser.muxer.Movie): org.mp4parser.Container;
          public createStsz(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.boxes.iso14496.part12.SampleTableBox): void;
          public createEdts(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public createSubs(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.boxes.iso14496.part12.SampleTableBox): void;
        }
        export module DefaultMp4Builder {
          export class InterleaveChunkMdat extends org.mp4parser.Box {
            public static class: java.lang.Class<org.mp4parser.muxer.builder.DefaultMp4Builder.InterleaveChunkMdat>;
            public getBox(param0: java.nio.channels.WritableByteChannel): void;
            public getSize(): number;
            public getType(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module builder {
        export class FragmentedMp4Builder extends org.mp4parser.muxer.builder.Mp4Builder {
          public static class: java.lang.Class<org.mp4parser.muxer.builder.FragmentedMp4Builder>;
          public fragmenter: org.mp4parser.muxer.builder.Fragmenter;
          public getFragmenter(): org.mp4parser.muxer.builder.Fragmenter;
          public createTrex(param0: org.mp4parser.muxer.Movie, param1: org.mp4parser.muxer.Track): org.mp4parser.ParsableBox;
          public createMvhd(param0: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public createStsd(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.boxes.iso14496.part12.SampleTableBox): void;
          public getSamples(param0: number, param1: number, param2: org.mp4parser.muxer.Track): java.util.List<org.mp4parser.muxer.Sample>;
          public createDinf(param0: org.mp4parser.muxer.Movie, param1: org.mp4parser.muxer.Track): org.mp4parser.boxes.iso14496.part12.DataInformationBox;
          public createMdhd(param0: org.mp4parser.muxer.Movie, param1: org.mp4parser.muxer.Track): org.mp4parser.ParsableBox;
          public createTfhd(param0: number, param1: number, param2: org.mp4parser.muxer.Track, param3: number, param4: org.mp4parser.boxes.iso14496.part12.TrackFragmentBox): void;
          public setFragmenter(param0: org.mp4parser.muxer.builder.Fragmenter): void;
          public createMfra(param0: org.mp4parser.muxer.Movie, param1: org.mp4parser.Container): org.mp4parser.ParsableBox;
          public createTkhd(param0: org.mp4parser.muxer.Movie, param1: org.mp4parser.muxer.Track): org.mp4parser.ParsableBox;
          public createMdia(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public constructor();
          public createTfdt(param0: number, param1: org.mp4parser.muxer.Track, param2: org.mp4parser.boxes.iso14496.part12.TrackFragmentBox): void;
          public createTrak(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public createSenc(
            param0: number,
            param1: number,
            param2: org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack,
            param3: number,
            param4: org.mp4parser.boxes.iso14496.part12.TrackFragmentBox
          ): void;
          public createSaiz(
            param0: number,
            param1: number,
            param2: org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack,
            param3: number,
            param4: org.mp4parser.boxes.iso14496.part12.TrackFragmentBox
          ): void;
          public createMinf(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public getSampleSizes(param0: number, param1: number, param2: org.mp4parser.muxer.Track, param3: number): androidNative.Array<number>;
          public createMoofMdat(param0: org.mp4parser.muxer.Movie): java.util.List<org.mp4parser.Box>;
          public createStbl(param0: org.mp4parser.muxer.Movie, param1: org.mp4parser.muxer.Track): org.mp4parser.ParsableBox;
          public createMdiaHdlr(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public createTraf(param0: number, param1: number, param2: org.mp4parser.muxer.Track, param3: number, param4: org.mp4parser.boxes.iso14496.part12.MovieFragmentBox): void;
          public createMoov(param0: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public createTfra(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.Container): org.mp4parser.Box;
          public getDate(): java.util.Date;
          public createFtyp(param0: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public createFragment(param0: java.util.List<org.mp4parser.Box>, param1: org.mp4parser.muxer.Track, param2: number, param3: number, param4: number): number;
          public createTrun(param0: number, param1: number, param2: org.mp4parser.muxer.Track, param3: number, param4: org.mp4parser.boxes.iso14496.part12.TrackFragmentBox): void;
          public createSaio(
            param0: number,
            param1: number,
            param2: org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack,
            param3: number,
            param4: org.mp4parser.boxes.iso14496.part12.TrackFragmentBox,
            param5: org.mp4parser.boxes.iso14496.part12.MovieFragmentBox
          ): void;
          public createMfhd(param0: number, param1: number, param2: org.mp4parser.muxer.Track, param3: number, param4: org.mp4parser.boxes.iso14496.part12.MovieFragmentBox): void;
          public createMvex(param0: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public build(param0: org.mp4parser.muxer.Movie): org.mp4parser.Container;
          public createMdat(param0: number, param1: number, param2: org.mp4parser.muxer.Track, param3: number): org.mp4parser.Box;
          public createEdts(param0: org.mp4parser.muxer.Track, param1: org.mp4parser.muxer.Movie): org.mp4parser.ParsableBox;
          public createMoof(param0: number, param1: number, param2: org.mp4parser.muxer.Track, param3: number): org.mp4parser.ParsableBox;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module builder {
        export class Fragmenter {
          public static class: java.lang.Class<org.mp4parser.muxer.builder.Fragmenter>;
          /**
           * Constructs a new instance of the org.mp4parser.muxer.builder.Fragmenter interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { sampleNumbers(param0: org.mp4parser.muxer.Track): androidNative.Array<number> });
          public constructor();
          public sampleNumbers(param0: org.mp4parser.muxer.Track): androidNative.Array<number>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module builder {
        export class Mp4Builder {
          public static class: java.lang.Class<org.mp4parser.muxer.builder.Mp4Builder>;
          /**
           * Constructs a new instance of the org.mp4parser.muxer.builder.Mp4Builder interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { build(param0: org.mp4parser.muxer.Movie): org.mp4parser.Container });
          public constructor();
          public build(param0: org.mp4parser.muxer.Movie): org.mp4parser.Container;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module builder {
        export class StaticFragmentIntersectionFinderImpl extends org.mp4parser.muxer.builder.Fragmenter {
          public static class: java.lang.Class<org.mp4parser.muxer.builder.StaticFragmentIntersectionFinderImpl>;
          public constructor(param0: java.util.Map<org.mp4parser.muxer.Track, androidNative.Array<number>>);
          public sampleNumbers(param0: org.mp4parser.muxer.Track): androidNative.Array<number>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module builder {
        export class SyncSampleIntersectFinderImpl extends org.mp4parser.muxer.builder.Fragmenter {
          public static class: java.lang.Class<org.mp4parser.muxer.builder.SyncSampleIntersectFinderImpl>;
          public constructor(param0: org.mp4parser.muxer.Movie, param1: org.mp4parser.muxer.Track, param2: number);
          public getCommonIndices(
            param0: androidNative.Array<number>,
            param1: androidNative.Array<number>,
            param2: number,
            param3: androidNative.Array<androidNative.Array<number>>
          ): androidNative.Array<number>;
          public static getSyncSamplesTimestamps(param0: org.mp4parser.muxer.Movie, param1: org.mp4parser.muxer.Track): java.util.List<androidNative.Array<number>>;
          public sampleNumbers(param0: org.mp4parser.muxer.Track): androidNative.Array<number>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module container {
        export module mp4 {
          export class DefaultMp4SampleList extends java.util.AbstractList<org.mp4parser.muxer.Sample> {
            public static class: java.lang.Class<org.mp4parser.muxer.container.mp4.DefaultMp4SampleList>;
            public constructor(param0: number, param1: org.mp4parser.Container, param2: org.mp4parser.muxer.RandomAccessSource);
            public get(param0: number): org.mp4parser.muxer.Sample;
            public size(): number;
          }
          export module DefaultMp4SampleList {
            export class SampleImpl extends org.mp4parser.muxer.Sample {
              public static class: java.lang.Class<org.mp4parser.muxer.container.mp4.DefaultMp4SampleList.SampleImpl>;
              public writeTo(param0: java.nio.channels.WritableByteChannel): void;
              public getSampleEntry(): org.mp4parser.boxes.sampleentry.SampleEntry;
              public getSize(): number;
              public constructor(param0: org.mp4parser.muxer.container.mp4.DefaultMp4SampleList, param1: number);
              public toString(): string;
              public asByteBuffer(): java.nio.ByteBuffer;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module container {
        export module mp4 {
          export class FragmentedMp4SampleList extends java.util.AbstractList<org.mp4parser.muxer.Sample> {
            public static class: java.lang.Class<org.mp4parser.muxer.container.mp4.FragmentedMp4SampleList>;
            public constructor(param0: number, param1: org.mp4parser.Container, param2: org.mp4parser.muxer.RandomAccessSource);
            public get(param0: number): org.mp4parser.muxer.Sample;
            public size(): number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module container {
        export module mp4 {
          export class MovieCreator {
            public static class: java.lang.Class<org.mp4parser.muxer.container.mp4.MovieCreator>;
            public static build(param0: java.nio.channels.ReadableByteChannel, param1: org.mp4parser.muxer.RandomAccessSource, param2: string): org.mp4parser.muxer.Movie;
            public constructor();
            public static build(param0: string): org.mp4parser.muxer.Movie;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module container {
        export module mp4 {
          export class Mp4SampleList extends java.util.AbstractList<org.mp4parser.muxer.Sample> {
            public static class: java.lang.Class<org.mp4parser.muxer.container.mp4.Mp4SampleList>;
            public constructor(param0: number, param1: org.mp4parser.Container, param2: org.mp4parser.muxer.RandomAccessSource);
            public get(param0: number): org.mp4parser.muxer.Sample;
            public size(): number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class AACTrackImpl extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.AACTrackImpl>;
          public static SAMPLING_FREQUENCY_INDEX_MAP: java.util.Map<java.lang.Integer, java.lang.Integer>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: string);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public constructor(param0: org.mp4parser.muxer.DataSource);
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public toString(): string;
          public getDuration(): number;
          public constructor(param0: org.mp4parser.muxer.DataSource, param1: string);
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
        export module AACTrackImpl {
          export class AdtsHeader {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.AACTrackImpl.AdtsHeader>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class AC3TrackImpl extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.AC3TrackImpl>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: string);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public constructor(param0: org.mp4parser.muxer.DataSource);
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public getDuration(): number;
          public constructor(param0: org.mp4parser.muxer.DataSource, param1: string);
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export abstract class AbstractH26XTrack extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.AbstractH26XTrack>;
          public static BUFFER: number;
          public decodingTimes: androidNative.Array<number>;
          public ctts: java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public sdtp: java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public stss: java.util.List<java.lang.Integer>;
          public trackMetaData: org.mp4parser.muxer.TrackMetaData;
          public getSampleDurations(): androidNative.Array<number>;
          public static toArray(param0: java.nio.ByteBuffer): androidNative.Array<number>;
          public constructor(param0: string);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getCurrentSampleEntry(): org.mp4parser.boxes.sampleentry.SampleEntry;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public constructor(param0: org.mp4parser.muxer.DataSource);
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public constructor(param0: org.mp4parser.muxer.DataSource, param1: boolean);
          public getHandler(): string;
          public getDuration(): number;
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public findNextNal(param0: org.mp4parser.muxer.tracks.AbstractH26XTrack.LookAhead): java.nio.ByteBuffer;
          public createSampleObject(param0: java.util.List<any>): org.mp4parser.muxer.Sample;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public static cleanBuffer(param0: java.io.InputStream): java.io.InputStream;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
        export module AbstractH26XTrack {
          export class LookAhead {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.AbstractH26XTrack.LookAhead>;
            public discardByte(): void;
            public discardNext3AndMarkStart(): void;
            public nextThreeEquals001(): boolean;
            public getNal(): java.nio.ByteBuffer;
            public constructor(param0: org.mp4parser.muxer.DataSource);
            public fillBuffer(): void;
            public nextThreeEquals000or001orEof(param0: boolean): boolean;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class Amf0Track extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.Amf0Track>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: string);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public constructor(param0: java.util.Map<java.lang.Long, androidNative.Array<number>>);
          public getHandler(): string;
          public getDuration(): number;
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class AppendTrack extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.AppendTrack>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: string);
          public static appendTracknames(param0: androidNative.Array<org.mp4parser.muxer.Track>): string;
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public getDuration(): number;
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public constructor(param0: androidNative.Array<org.mp4parser.muxer.Track>);
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class Avc1ToAvc3TrackImpl extends org.mp4parser.muxer.WrappingTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.Avc1ToAvc3TrackImpl>;
          public getSampleDurations(): androidNative.Array<number>;
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public constructor(param0: org.mp4parser.muxer.Track);
          public getHandler(): string;
          public getDuration(): number;
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
        export module Avc1ToAvc3TrackImpl {
          export class ReplaceSyncSamplesList extends java.util.AbstractList<org.mp4parser.muxer.Sample> {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.Avc1ToAvc3TrackImpl.ReplaceSyncSamplesList>;
            public get(param0: number): org.mp4parser.muxer.Sample;
            public constructor(param0: java.util.List<org.mp4parser.muxer.Sample>);
            public size(): number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class ChangeTimeScaleTrack extends org.mp4parser.muxer.Track {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.ChangeTimeScaleTrack>;
          public constructor(param0: org.mp4parser.muxer.Track, param1: number, param2: androidNative.Array<number>);
          public getSampleDurations(): androidNative.Array<number>;
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public getDuration(): number;
          public toString(): string;
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class CleanInputStream {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.CleanInputStream>;
          public read(): number;
          public constructor(param0: java.io.InputStream);
          public markSupported(): boolean;
          public read(param0: androidNative.Array<number>, param1: number, param2: number): number;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class ClippedTrack extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.ClippedTrack>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: string);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public getDuration(): number;
          public constructor(param0: org.mp4parser.muxer.Track, param1: number, param2: number);
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class DTSTrackImpl extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.DTSTrackImpl>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: string);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public constructor(param0: org.mp4parser.muxer.DataSource);
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public getDuration(): number;
          public constructor(param0: org.mp4parser.muxer.DataSource, param1: string);
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
        export module DTSTrackImpl {
          export class LookAhead {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.DTSTrackImpl.LookAhead>;
            public findNextStart(): java.nio.ByteBuffer;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class DivideTimeScaleTrack extends org.mp4parser.muxer.Track {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.DivideTimeScaleTrack>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: org.mp4parser.muxer.Track, param1: number);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public getDuration(): number;
          public toString(): string;
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class EC3TrackImpl extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.EC3TrackImpl>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: string);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public constructor(param0: org.mp4parser.muxer.DataSource);
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public toString(): string;
          public getDuration(): number;
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
        export module EC3TrackImpl {
          export class BitStreamInfo extends org.mp4parser.boxes.dolby.EC3SpecificBox.Entry {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.EC3TrackImpl.BitStreamInfo>;
            public frameSize: number;
            public substreamid: number;
            public bitrate: number;
            public samplerate: number;
            public strmtyp: number;
            public chanmap: number;
            public constructor();
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class MP3TrackImpl extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.MP3TrackImpl>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: string);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public constructor(param0: org.mp4parser.muxer.DataSource);
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public toString(): string;
          public getDuration(): number;
          public constructor(param0: org.mp4parser.muxer.DataSource, param1: string);
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
        export module MP3TrackImpl {
          export class MP3Header {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.MP3TrackImpl.MP3Header>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class MultiplyTimeScaleTrack extends org.mp4parser.muxer.Track {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.MultiplyTimeScaleTrack>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: org.mp4parser.muxer.Track, param1: number);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public getDuration(): number;
          public toString(): string;
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class ReplaceSampleTrack extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.ReplaceSampleTrack>;
          public constructor(param0: org.mp4parser.muxer.Track, param1: number, param2: java.nio.ByteBuffer);
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: string);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public getDuration(): number;
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
        export module ReplaceSampleTrack {
          export class ReplaceASingleEntryList extends java.util.AbstractList<org.mp4parser.muxer.Sample> {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.ReplaceSampleTrack.ReplaceASingleEntryList>;
            public get(param0: number): org.mp4parser.muxer.Sample;
            public size(): number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class SilenceTrackImpl extends org.mp4parser.muxer.Track {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.SilenceTrackImpl>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: org.mp4parser.muxer.Track, param1: number);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public getDuration(): number;
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export class TextTrackImpl extends org.mp4parser.muxer.AbstractTrack {
          public static class: java.lang.Class<org.mp4parser.muxer.tracks.TextTrackImpl>;
          public getSampleDurations(): androidNative.Array<number>;
          public constructor(param0: string);
          public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
          public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
          public getSubs(): java.util.List<org.mp4parser.muxer.tracks.TextTrackImpl.Line>;
          public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
          public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          public getHandler(): string;
          public getDuration(): number;
          public constructor();
          public getName(): string;
          public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
          public close(): void;
          public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
          public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
          public getSyncSamples(): androidNative.Array<number>;
          public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
        }
        export module TextTrackImpl {
          export class Line {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.TextTrackImpl.Line>;
            public getFrom(): number;
            public constructor(param0: number, param1: number, param2: string);
            public getTo(): number;
            public getText(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module encryption {
          export class CencDecryptingSampleEntryTransformer {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.encryption.CencDecryptingSampleEntryTransformer>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module encryption {
          export class CencDecryptingSampleList extends java.util.AbstractList<org.mp4parser.muxer.Sample> {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.encryption.CencDecryptingSampleList>;
            public constructor(
              param0: org.mp4parser.tools.RangeStartMap<java.lang.Integer, javax.crypto.SecretKey>,
              param1: org.mp4parser.tools.RangeStartMap<java.lang.Integer, org.mp4parser.boxes.sampleentry.SampleEntry>,
              param2: java.util.List<org.mp4parser.muxer.Sample>,
              param3: java.util.List<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat>
            );
            public get(param0: number): org.mp4parser.muxer.Sample;
            public size(): number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module encryption {
          export class CencDecryptingTrackImpl extends org.mp4parser.muxer.AbstractTrack {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.encryption.CencDecryptingTrackImpl>;
            public getSyncSamples(): androidNative.Array<number>;
            public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
            public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
            public getDuration(): number;
            public close(): void;
            public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
            public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
            public getName(): string;
            public constructor(param0: org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack, param1: java.util.Map<java.util.UUID, javax.crypto.SecretKey>);
            public getHandler(): string;
            public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
            public constructor(param0: org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack, param1: javax.crypto.SecretKey);
            public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
            public getSampleDurations(): androidNative.Array<number>;
            public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
            public constructor(param0: string);
            public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module encryption {
          export class CencEncryptedTrack extends org.mp4parser.muxer.Track {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack>;
            /**
             * Constructs a new instance of the org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
              getSampleEncryptionEntries(): java.util.List<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat>;
              hasSubSampleEncryption(): boolean;
              getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
              getSampleDurations(): androidNative.Array<number>;
              getDuration(): number;
              getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
              getSyncSamples(): androidNative.Array<number>;
              getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
              getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
              getHandler(): string;
              getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
              getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
              getName(): string;
              getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
              getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
            });
            public constructor();
            public getSyncSamples(): androidNative.Array<number>;
            public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
            public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
            public getDuration(): number;
            public hasSubSampleEncryption(): boolean;
            public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
            public getSampleEncryptionEntries(): java.util.List<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat>;
            public getName(): string;
            public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
            public getHandler(): string;
            public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
            public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
            public getSampleDurations(): androidNative.Array<number>;
            public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
            public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module encryption {
          export class CencEncryptingSampleEntryTransformer {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.encryption.CencEncryptingSampleEntryTransformer>;
            public constructor();
            public transform(param0: org.mp4parser.boxes.sampleentry.SampleEntry, param1: string, param2: java.util.UUID): org.mp4parser.boxes.sampleentry.SampleEntry;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module encryption {
          export class CencEncryptingSampleList extends java.util.AbstractList<org.mp4parser.muxer.Sample> {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.encryption.CencEncryptingSampleList>;
            public get(param0: number): org.mp4parser.muxer.Sample;
            public constructor(
              param0: org.mp4parser.tools.RangeStartMap<java.lang.Integer, org.mp4parser.muxer.tracks.encryption.KeyIdKeyPair>,
              param1: org.mp4parser.tools.RangeStartMap<java.lang.Integer, org.mp4parser.boxes.sampleentry.SampleEntry>,
              param2: java.util.List<org.mp4parser.muxer.Sample>,
              param3: java.util.List<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat>
            );
            public size(): number;
          }
          export module CencEncryptingSampleList {
            export class EncryptedSampleImpl extends org.mp4parser.muxer.Sample {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.encryption.CencEncryptingSampleList.EncryptedSampleImpl>;
              public writeTo(param0: java.nio.channels.WritableByteChannel): void;
              public getSampleEntry(): org.mp4parser.boxes.sampleentry.SampleEntry;
              public getSize(): number;
              public asByteBuffer(): java.nio.ByteBuffer;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module encryption {
          export class CencEncryptingTrackImpl extends org.mp4parser.muxer.tracks.encryption.CencEncryptedTrack {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.encryption.CencEncryptingTrackImpl>;
            public getSyncSamples(): androidNative.Array<number>;
            public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
            public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
            public constructor(param0: org.mp4parser.muxer.Track, param1: java.util.UUID, param2: javax.crypto.SecretKey, param3: boolean);
            public getDuration(): number;
            public close(): void;
            public hasSubSampleEncryption(): boolean;
            public constructor(
              param0: org.mp4parser.muxer.Track,
              param1: org.mp4parser.tools.RangeStartMap<java.lang.Integer, java.util.UUID>,
              param2: java.util.Map<java.util.UUID, javax.crypto.SecretKey>,
              param3: string,
              param4: boolean,
              param5: boolean
            );
            public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
            public getSampleEncryptionEntries(): java.util.List<org.mp4parser.boxes.iso23001.part7.CencSampleAuxiliaryDataFormat>;
            public getName(): string;
            public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
            public getHandler(): string;
            public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
            public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
            public getSampleDurations(): androidNative.Array<number>;
            public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
            public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module encryption {
          export class KeyIdKeyPair {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.encryption.KeyIdKeyPair>;
            public getKeyId(): java.util.UUID;
            public constructor(param0: java.util.UUID, param1: javax.crypto.SecretKey);
            public getKey(): javax.crypto.SecretKey;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module encryption {
          export class SampleEntryTransformer {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.encryption.SampleEntryTransformer>;
            /**
             * Constructs a new instance of the org.mp4parser.muxer.tracks.encryption.SampleEntryTransformer interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { transform(param0: org.mp4parser.boxes.sampleentry.SampleEntry): org.mp4parser.boxes.sampleentry.SampleEntry });
            public constructor();
            public transform(param0: org.mp4parser.boxes.sampleentry.SampleEntry): org.mp4parser.boxes.sampleentry.SampleEntry;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h263 {
          export class H263TrackImpl extends org.mp4parser.muxer.tracks.AbstractH26XTrack {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h263.H263TrackImpl>;
            public getSyncSamples(): androidNative.Array<number>;
            public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
            public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
            public createSampleObject(param0: java.util.List<any>): org.mp4parser.muxer.Sample;
            public constructor(param0: org.mp4parser.muxer.DataSource, param1: boolean);
            public getDuration(): number;
            public constructor(param0: org.mp4parser.muxer.DataSource);
            public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
            public getName(): string;
            public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
            public getCurrentSampleEntry(): org.mp4parser.boxes.sampleentry.SampleEntry;
            public getHandler(): string;
            public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
            public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
            public getSampleDurations(): androidNative.Array<number>;
            public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
            public constructor(param0: string);
            public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export class H264NalUnitHeader {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.H264NalUnitHeader>;
            public nal_ref_idc: number;
            public nal_unit_type: number;
            public constructor();
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export class H264NalUnitTypes {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.H264NalUnitTypes>;
            /**
             * Constructs a new instance of the org.mp4parser.muxer.tracks.h264.H264NalUnitTypes interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
            public static CODED_SLICE_IDR: number;
            public static SEQ_PARAMETER_SET_EXT: number;
            public static RESERVERED_16: number;
            public static UNSPEC_30: number;
            public static UNSPEC_31: number;
            public static CODED_SLICE_DATA_PART_B: number;
            public static CODED_SLICE_DATA_PART_C: number;
            public static CODED_SLICE_NON_IDR: number;
            public static CODED_SLICE_DATA_PART_A: number;
            public static SEQ_PARAMETER_SET: number;
            public static END_OF_STREAM: number;
            public static RESERVERED_17: number;
            public static RESERVERED_18: number;
            public static PREFIX_NAL_UNIT: number;
            public static SUBSET_SEQ_PARAMETER_SET: number;
            public static PIC_PARAMETER_SET: number;
            public static CODED_SLICE_AUX_PIC: number;
            public static RESERVED_22: number;
            public static RESERVED_21: number;
            public static FILLER_DATA: number;
            public static RESERVED_23: number;
            public static UNSPEC_24: number;
            public static CODED_SLICE_EXT: number;
            public static UNSPEC_25: number;
            public static UNSPEC_26: number;
            public static UNSPEC_27: number;
            public static UNSPEC_28: number;
            public static UNSPEC_29: number;
            public static AU_UNIT_DELIMITER: number;
            public static UNSPECIFIED: number;
            public static END_OF_SEQUENCE: number;
            public static SEI: number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export class H264TrackImpl extends org.mp4parser.muxer.tracks.AbstractH26XTrack {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.H264TrackImpl>;
            public getSyncSamples(): androidNative.Array<number>;
            public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
            public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
            public constructor(param0: org.mp4parser.muxer.DataSource, param1: boolean);
            public getDuration(): number;
            public constructor(param0: org.mp4parser.muxer.DataSource);
            public static getNalUnitHeader(param0: java.nio.ByteBuffer): org.mp4parser.muxer.tracks.h264.H264NalUnitHeader;
            public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
            public static main(param0: androidNative.Array<string>): void;
            public getName(): string;
            public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
            public calcCtts(): void;
            public getCurrentSampleEntry(): org.mp4parser.boxes.sampleentry.SampleEntry;
            public constructor(param0: org.mp4parser.muxer.DataSource, param1: string, param2: number, param3: number);
            public getHandler(): string;
            public constructor(param0: org.mp4parser.muxer.DataSource, param1: string);
            public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
            public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
            public getSampleDurations(): androidNative.Array<number>;
            public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
            public constructor(param0: string);
            public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          }
          export module H264TrackImpl {
            export class ByteBufferBackedInputStream {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.H264TrackImpl.ByteBufferBackedInputStream>;
              public constructor(param0: org.mp4parser.muxer.tracks.h264.H264TrackImpl, param1: java.nio.ByteBuffer);
              public read(): number;
              public read(param0: androidNative.Array<number>, param1: number, param2: number): number;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export class SEIMessage {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.SEIMessage>;
            public constructor(param0: java.io.InputStream, param1: org.mp4parser.muxer.tracks.h264.parsing.model.SeqParameterSet);
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export class SliceHeader {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.SliceHeader>;
            public first_mb_in_slice: number;
            public slice_type: org.mp4parser.muxer.tracks.h264.SliceHeader.SliceType;
            public pic_parameter_set_id: number;
            public colour_plane_id: number;
            public frame_num: number;
            public field_pic_flag: boolean;
            public bottom_field_flag: boolean;
            public idr_pic_id: number;
            public pic_order_cnt_lsb: number;
            public delta_pic_order_cnt_bottom: number;
            public delta_pic_order_cnt_0: number;
            public delta_pic_order_cnt_1: number;
            public pps: org.mp4parser.muxer.tracks.h264.parsing.model.PictureParameterSet;
            public sps: org.mp4parser.muxer.tracks.h264.parsing.model.SeqParameterSet;
            public constructor(
              param0: java.io.InputStream,
              param1: java.util.Map<java.lang.Integer, org.mp4parser.muxer.tracks.h264.parsing.model.SeqParameterSet>,
              param2: java.util.Map<java.lang.Integer, org.mp4parser.muxer.tracks.h264.parsing.model.PictureParameterSet>,
              param3: boolean
            );
            public toString(): string;
          }
          export module SliceHeader {
            export class SliceType {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.SliceHeader.SliceType>;
              public static P: org.mp4parser.muxer.tracks.h264.SliceHeader.SliceType;
              public static B: org.mp4parser.muxer.tracks.h264.SliceHeader.SliceType;
              public static I: org.mp4parser.muxer.tracks.h264.SliceHeader.SliceType;
              public static SP: org.mp4parser.muxer.tracks.h264.SliceHeader.SliceType;
              public static SI: org.mp4parser.muxer.tracks.h264.SliceHeader.SliceType;
              public static valueOf(param0: string): org.mp4parser.muxer.tracks.h264.SliceHeader.SliceType;
              public static values(): androidNative.Array<org.mp4parser.muxer.tracks.h264.SliceHeader.SliceType>;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export class BTree {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.BTree>;
              public constructor();
              public getValue(): any;
              public addString(param0: string, param1: any): void;
              public down(param0: number): org.mp4parser.muxer.tracks.h264.parsing.BTree;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export class CharCache {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.CharCache>;
              public append(param0: string): void;
              public clear(): void;
              public toString(): string;
              public constructor(param0: number);
              public length(): number;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export class Debug {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.Debug>;
              public static debug: boolean;
              public constructor();
              public static print(param0: androidNative.Array<number>): void;
              public static print(param0: string): void;
              public static print8x8(param0: androidNative.Array<number>): void;
              public static println(param0: string): void;
              public static trace(param0: string, param1: androidNative.Array<any>): void;
              public static print8x8(param0: java.nio.ShortBuffer): void;
              public static print(param0: number): void;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module model {
              export class AspectRatio {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.AspectRatio>;
                public static Extended_SAR: org.mp4parser.muxer.tracks.h264.parsing.model.AspectRatio;
                public toString(): string;
                public getValue(): number;
                public static fromValue(param0: number): org.mp4parser.muxer.tracks.h264.parsing.model.AspectRatio;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module model {
              export abstract class BitstreamElement {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.BitstreamElement>;
                public constructor();
                public write(param0: java.io.OutputStream): void;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module model {
              export class ChromaFormat {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.ChromaFormat>;
                public static MONOCHROME: org.mp4parser.muxer.tracks.h264.parsing.model.ChromaFormat;
                public static YUV_420: org.mp4parser.muxer.tracks.h264.parsing.model.ChromaFormat;
                public static YUV_422: org.mp4parser.muxer.tracks.h264.parsing.model.ChromaFormat;
                public static YUV_444: org.mp4parser.muxer.tracks.h264.parsing.model.ChromaFormat;
                public getId(): number;
                public toString(): string;
                public constructor(param0: number, param1: number, param2: number);
                public static fromId(param0: number): org.mp4parser.muxer.tracks.h264.parsing.model.ChromaFormat;
                public getSubHeight(): number;
                public getSubWidth(): number;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module model {
              export class HRDParameters {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.HRDParameters>;
                public cpb_cnt_minus1: number;
                public bit_rate_scale: number;
                public cpb_size_scale: number;
                public bit_rate_value_minus1: androidNative.Array<number>;
                public cpb_size_value_minus1: androidNative.Array<number>;
                public cbr_flag: androidNative.Array<boolean>;
                public initial_cpb_removal_delay_length_minus1: number;
                public cpb_removal_delay_length_minus1: number;
                public dpb_output_delay_length_minus1: number;
                public time_offset_length: number;
                public toString(): string;
                public constructor();
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module model {
              export class PictureParameterSet extends org.mp4parser.muxer.tracks.h264.parsing.model.BitstreamElement {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.PictureParameterSet>;
                public entropy_coding_mode_flag: boolean;
                public num_ref_idx_l0_active_minus1: number;
                public num_ref_idx_l1_active_minus1: number;
                public slice_group_change_rate_minus1: number;
                public pic_parameter_set_id: number;
                public seq_parameter_set_id: number;
                public bottom_field_pic_order_in_frame_present_flag: boolean;
                public num_slice_groups_minus1: number;
                public slice_group_map_type: number;
                public weighted_pred_flag: boolean;
                public weighted_bipred_idc: number;
                public pic_init_qp_minus26: number;
                public pic_init_qs_minus26: number;
                public chroma_qp_index_offset: number;
                public deblocking_filter_control_present_flag: boolean;
                public constrained_intra_pred_flag: boolean;
                public redundant_pic_cnt_present_flag: boolean;
                public top_left: androidNative.Array<number>;
                public bottom_right: androidNative.Array<number>;
                public run_length_minus1: androidNative.Array<number>;
                public slice_group_change_direction_flag: boolean;
                public slice_group_id: androidNative.Array<number>;
                public extended: org.mp4parser.muxer.tracks.h264.parsing.model.PictureParameterSet.PPSExt;
                public toString(): string;
                public static read(param0: java.io.InputStream): org.mp4parser.muxer.tracks.h264.parsing.model.PictureParameterSet;
                public equals(param0: any): boolean;
                public static read(param0: androidNative.Array<number>): org.mp4parser.muxer.tracks.h264.parsing.model.PictureParameterSet;
                public constructor();
                public write(param0: java.io.OutputStream): void;
                public hashCode(): number;
              }
              export module PictureParameterSet {
                export class PPSExt {
                  public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.PictureParameterSet.PPSExt>;
                  public transform_8x8_mode_flag: boolean;
                  public scalindMatrix: org.mp4parser.muxer.tracks.h264.parsing.model.ScalingMatrix;
                  public second_chroma_qp_index_offset: number;
                  public pic_scaling_list_present_flag: androidNative.Array<boolean>;
                  public constructor();
                  public toString(): string;
                }
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module model {
              export class ScalingList {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.ScalingList>;
                public scalingList: androidNative.Array<number>;
                public useDefaultScalingMatrixFlag: boolean;
                public toString(): string;
                public static read(param0: org.mp4parser.muxer.tracks.h264.parsing.read.CAVLCReader, param1: number): org.mp4parser.muxer.tracks.h264.parsing.model.ScalingList;
                public constructor();
                public write(param0: org.mp4parser.muxer.tracks.h264.parsing.write.CAVLCWriter): void;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module model {
              export class ScalingMatrix {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.ScalingMatrix>;
                public ScalingList4x4: androidNative.Array<org.mp4parser.muxer.tracks.h264.parsing.model.ScalingList>;
                public ScalingList8x8: androidNative.Array<org.mp4parser.muxer.tracks.h264.parsing.model.ScalingList>;
                public toString(): string;
                public constructor();
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module model {
              export class SeqParameterSet extends org.mp4parser.muxer.tracks.h264.parsing.model.BitstreamElement {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.SeqParameterSet>;
                public pic_order_cnt_type: number;
                public field_pic_flag: boolean;
                public delta_pic_order_always_zero_flag: boolean;
                public weighted_pred_flag: boolean;
                public weighted_bipred_idc: number;
                public entropy_coding_mode_flag: boolean;
                public mb_adaptive_frame_field_flag: boolean;
                public direct_8x8_inference_flag: boolean;
                public chroma_format_idc: org.mp4parser.muxer.tracks.h264.parsing.model.ChromaFormat;
                public log2_max_frame_num_minus4: number;
                public log2_max_pic_order_cnt_lsb_minus4: number;
                public pic_height_in_map_units_minus1: number;
                public pic_width_in_mbs_minus1: number;
                public bit_depth_luma_minus8: number;
                public bit_depth_chroma_minus8: number;
                public qpprime_y_zero_transform_bypass_flag: boolean;
                public profile_idc: number;
                public reserved_zero_2bits: number;
                public constraint_set_0_flag: boolean;
                public constraint_set_1_flag: boolean;
                public constraint_set_2_flag: boolean;
                public constraint_set_3_flag: boolean;
                public constraint_set_4_flag: boolean;
                public constraint_set_5_flag: boolean;
                public level_idc: number;
                public seq_parameter_set_id: number;
                public residual_color_transform_flag: boolean;
                public offset_for_non_ref_pic: number;
                public offset_for_top_to_bottom_field: number;
                public num_ref_frames: number;
                public gaps_in_frame_num_value_allowed_flag: boolean;
                public frame_mbs_only_flag: boolean;
                public frame_cropping_flag: boolean;
                public frame_crop_left_offset: number;
                public frame_crop_right_offset: number;
                public frame_crop_top_offset: number;
                public frame_crop_bottom_offset: number;
                public offsetForRefFrame: androidNative.Array<number>;
                public vuiParams: org.mp4parser.muxer.tracks.h264.parsing.model.VUIParameters;
                public scalingMatrix: org.mp4parser.muxer.tracks.h264.parsing.model.ScalingMatrix;
                public num_ref_frames_in_pic_order_cnt_cycle: number;
                public toString(): string;
                public static read(param0: java.io.InputStream): org.mp4parser.muxer.tracks.h264.parsing.model.SeqParameterSet;
                public constructor();
                public write(param0: java.io.OutputStream): void;
                public static read(param0: androidNative.Array<number>): org.mp4parser.muxer.tracks.h264.parsing.model.SeqParameterSet;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module model {
              export class VUIParameters {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.VUIParameters>;
                public aspect_ratio_info_present_flag: boolean;
                public sar_width: number;
                public sar_height: number;
                public overscan_info_present_flag: boolean;
                public overscan_appropriate_flag: boolean;
                public video_signal_type_present_flag: boolean;
                public video_format: number;
                public video_full_range_flag: boolean;
                public colour_description_present_flag: boolean;
                public colour_primaries: number;
                public transfer_characteristics: number;
                public matrix_coefficients: number;
                public chroma_loc_info_present_flag: boolean;
                public chroma_sample_loc_type_top_field: number;
                public chroma_sample_loc_type_bottom_field: number;
                public timing_info_present_flag: boolean;
                public num_units_in_tick: number;
                public time_scale: number;
                public fixed_frame_rate_flag: boolean;
                public low_delay_hrd_flag: boolean;
                public pic_struct_present_flag: boolean;
                public nalHRDParams: org.mp4parser.muxer.tracks.h264.parsing.model.HRDParameters;
                public vclHRDParams: org.mp4parser.muxer.tracks.h264.parsing.model.HRDParameters;
                public bitstreamRestriction: org.mp4parser.muxer.tracks.h264.parsing.model.VUIParameters.BitstreamRestriction;
                public aspect_ratio: org.mp4parser.muxer.tracks.h264.parsing.model.AspectRatio;
                public toString(): string;
                public constructor();
              }
              export module VUIParameters {
                export class BitstreamRestriction {
                  public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.model.VUIParameters.BitstreamRestriction>;
                  public motion_vectors_over_pic_boundaries_flag: boolean;
                  public max_bytes_per_pic_denom: number;
                  public max_bits_per_mb_denom: number;
                  public log2_max_mv_length_horizontal: number;
                  public log2_max_mv_length_vertical: number;
                  public num_reorder_frames: number;
                  public max_dec_frame_buffering: number;
                  public constructor();
                  public toString(): string;
                }
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module read {
              export class BitstreamReader {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.read.BitstreamReader>;
                public static bitsRead: number;
                public debugBits: org.mp4parser.muxer.tracks.h264.parsing.CharCache;
                public peakNextBits(param0: number): number;
                public constructor(param0: java.io.InputStream);
                public getBitPosition(): number;
                public readRemainingByte(): number;
                public read1Bit(): number;
                public readNBit(param0: number): number;
                public isByteAligned(): boolean;
                public close(): void;
                public getCurBit(): number;
                public readBool(): boolean;
                public moreRBSPData(): boolean;
                public readByte(): number;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module read {
              export class CAVLCReader extends org.mp4parser.muxer.tracks.h264.parsing.read.BitstreamReader {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.read.CAVLCReader>;
                public readBool(param0: string): boolean;
                public read(param0: number): androidNative.Array<number>;
                public readAE(): boolean;
                public readZeroBitCount(param0: string): number;
                public readAEI(): number;
                public readME(param0: string): number;
                public readNBit(param0: number, param1: string): number;
                public readU(param0: number, param1: string): number;
                public readCE(param0: org.mp4parser.muxer.tracks.h264.parsing.BTree, param1: string): any;
                public readSE(param0: string): number;
                public constructor(param0: java.io.InputStream);
                public readTE(param0: number): number;
                public readUE(param0: string): number;
                public readTrailingBits(): void;
                public readNBit(param0: number): number;
                public readBool(): boolean;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module write {
              export class BitstreamWriter {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.write.BitstreamWriter>;
                public flush(): void;
                public writeRemainingZero(): void;
                public writeByte(param0: number): void;
                public constructor(param0: java.io.OutputStream);
                public write1Bit(param0: number): void;
                public writeNBit(param0: number, param1: number): void;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h264 {
          export module parsing {
            export module write {
              export class CAVLCWriter extends org.mp4parser.muxer.tracks.h264.parsing.write.BitstreamWriter {
                public static class: java.lang.Class<org.mp4parser.muxer.tracks.h264.parsing.write.CAVLCWriter>;
                public writeUE(param0: number, param1: string): void;
                public writeNBit(param0: number, param1: number, param2: string): void;
                public writeU(param0: number, param1: number): void;
                public constructor(param0: java.io.OutputStream);
                public writeUE(param0: number): void;
                public writeU(param0: number, param1: number, param2: string): void;
                public writeBool(param0: boolean, param1: string): void;
                public writeNBit(param0: number, param1: number): void;
                public writeSE(param0: number, param1: string): void;
                public writeSliceTrailingBits(): void;
                public writeTrailingBits(): void;
              }
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h265 {
          export class H265NalUnitHeader {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h265.H265NalUnitHeader>;
            public forbiddenZeroFlag: number;
            public nalUnitType: number;
            public nuhLayerId: number;
            public nuhTemporalIdPlusOne: number;
            public constructor();
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h265 {
          export class H265NalUnitTypes {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h265.H265NalUnitTypes>;
            /**
             * Constructs a new instance of the org.mp4parser.muxer.tracks.h265.H265NalUnitTypes interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
            public static NAL_TYPE_BLA_W_LP: number;
            public static NAL_TYPE_RASL_N: number;
            public static NAL_TYPE_UNSPEC48: number;
            public static NAL_TYPE_RASL_R: number;
            public static NAL_TYPE_UNSPEC49: number;
            public static NAL_TYPE_BLA_W_RADL: number;
            public static NAL_TYPE_RADL_R: number;
            public static NAL_TYPE_PREFIX_SEI_NUT: number;
            public static NAL_TYPE_RADL_N: number;
            public static NAL_TYPE_RSV_VCL31: number;
            public static NAL_TYPE_RSV_VCL30: number;
            public static NAL_TYPE_BLA_N_LP: number;
            public static NAL_TYPE_EOS_NUT: number;
            public static NAL_TYPE_RSV_IRAP_VCL23: number;
            public static NAL_TYPE_RSV_IRAP_VCL22: number;
            public static NAL_TYPE_VPS_NUT: number;
            public static NAL_TYPE_AUD_NUT: number;
            public static NAL_TYPE_RSV_NVCL43: number;
            public static NAL_TYPE_RSV_NVCL42: number;
            public static NAL_TYPE_RSV_NVCL44: number;
            public static NAL_TYPE_IDR_N_LP: number;
            public static NAL_TYPE_EOB_NUT: number;
            public static NAL_TYPE_SPS_NUT: number;
            public static NAL_TYPE_RSV_NVCL41: number;
            public static NAL_TYPE_STSA_R: number;
            public static NAL_TYPE_TSA_R: number;
            public static NAL_TYPE_TSA_N: number;
            public static NAL_TYPE_PPS_NUT: number;
            public static NAL_TYPE_RSV_VCL_N14: number;
            public static NAL_TYPE_UNSPEC52: number;
            public static NAL_TYPE_RSV_VCL_R11: number;
            public static NAL_TYPE_UNSPEC53: number;
            public static NAL_TYPE_UNSPEC54: number;
            public static NAL_TYPE_RSV_VCL_R13: number;
            public static NAL_TYPE_UNSPEC55: number;
            public static NAL_TYPE_RSV_VCL_R15: number;
            public static NAL_TYPE_CRA_NUT: number;
            public static NAL_TYPE_STSA_N: number;
            public static NAL_TYPE_RSV_VCL_N10: number;
            public static NAL_TYPE_RSV_VCL_N12: number;
            public static NAL_TYPE_TRAIL_N: number;
            public static NAL_TYPE_RSV_VCL28: number;
            public static NAL_TYPE_RSV_VCL29: number;
            public static NAL_TYPE_FD_NUT: number;
            public static NAL_TYPE_RSV_VCL26: number;
            public static NAL_TYPE_RSV_VCL27: number;
            public static NAL_TYPE_RSV_VCL24: number;
            public static NAL_TYPE_RSV_VCL25: number;
            public static NAL_TYPE_IDR_W_RADL: number;
            public static NAL_TYPE_TRAIL_R: number;
            public static NAL_TYPE_UNSPEC50: number;
            public static NAL_TYPE_UNSPEC51: number;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h265 {
          export class H265TrackImpl extends org.mp4parser.muxer.tracks.AbstractH26XTrack implements org.mp4parser.muxer.tracks.h265.H265NalUnitTypes {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h265.H265TrackImpl>;
            public getSyncSamples(): androidNative.Array<number>;
            public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
            public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
            public constructor(param0: org.mp4parser.muxer.DataSource, param1: boolean);
            public getDuration(): number;
            public wrapUp(param0: java.util.List<java.nio.ByteBuffer>, param1: androidNative.Array<boolean>, param2: androidNative.Array<boolean>): void;
            public constructor(param0: org.mp4parser.muxer.DataSource);
            public static getNalUnitHeader(param0: java.nio.ByteBuffer): org.mp4parser.muxer.tracks.h265.H265NalUnitHeader;
            public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
            public static main(param0: androidNative.Array<string>): void;
            public getName(): string;
            public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
            public getCurrentSampleEntry(): org.mp4parser.boxes.sampleentry.SampleEntry;
            public getHandler(): string;
            public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
            public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
            public getSampleDurations(): androidNative.Array<number>;
            public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
            public constructor(param0: string);
            public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h265 {
          export class HrdParameters {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h265.HrdParameters>;
            public constructor(param0: boolean, param1: number, param2: org.mp4parser.muxer.tracks.h264.parsing.read.CAVLCReader);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h265 {
          export class PicTiming {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h265.PicTiming>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h265 {
          export class SEIMessage {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h265.SEIMessage>;
            public constructor(param0: org.mp4parser.boxes.iso14496.part1.objectdescriptors.BitReaderBuffer);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h265 {
          export class SequenceParameterSetRbsp {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h265.SequenceParameterSetRbsp>;
            public vuiParameters: org.mp4parser.muxer.tracks.h265.VuiParameters;
            public pic_width_in_luma_samples: number;
            public pic_height_in_luma_samples: number;
            public general_profile_space: number;
            public general_tier_flag: boolean;
            public general_profile_idc: number;
            public general_profile_compatibility_flags: number;
            public general_constraint_indicator_flags: number;
            public general_level_idc: number;
            public chroma_format_idc: number;
            public bit_depth_luma_minus8: number;
            public bit_depth_chroma_minus8: number;
            public sps_max_sub_layers_minus1: number;
            public sps_temporal_id_nesting_flag: boolean;
            public constructor(param0: java.io.InputStream);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h265 {
          export class SubLayerHrdParameters {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h265.SubLayerHrdParameters>;
            public constructor(param0: number, param1: androidNative.Array<number>, param2: boolean, param3: org.mp4parser.muxer.tracks.h264.parsing.read.CAVLCReader);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h265 {
          export class VideoParameterSet {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h265.VideoParameterSet>;
            public toByteBuffer(): java.nio.ByteBuffer;
            public constructor(param0: java.nio.ByteBuffer);
            public profile_tier_level(param0: number, param1: org.mp4parser.muxer.tracks.h264.parsing.read.CAVLCReader): void;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module h265 {
          export class VuiParameters {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.h265.VuiParameters>;
            public aspect_ratio_info_present_flag: boolean;
            public aspect_ratio_idc: number;
            public sar_width: number;
            public sar_height: number;
            public video_signal_type_present_flag: boolean;
            public video_format: number;
            public video_full_range_flag: boolean;
            public colour_description_present_flag: boolean;
            public colour_primaries: number;
            public transfer_characteristics: number;
            public matrix_coeffs: number;
            public vui_timing_info_present_flag: boolean;
            public vui_num_units_in_tick: number;
            public vui_time_scale: number;
            public min_spatial_segmentation_idc: number;
            public constructor(param0: number, param1: org.mp4parser.muxer.tracks.h264.parsing.read.CAVLCReader);
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module mjpeg {
          export class OneJpegPerIframe extends org.mp4parser.muxer.AbstractTrack {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.mjpeg.OneJpegPerIframe>;
            public getSyncSamples(): androidNative.Array<number>;
            public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
            public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
            public getDuration(): number;
            public close(): void;
            public constructor(param0: string, param1: androidNative.Array<java.io.File>, param2: org.mp4parser.muxer.Track);
            public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
            public getName(): string;
            public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
            public getHandler(): string;
            public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
            public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
            public getSampleDurations(): androidNative.Array<number>;
            public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
            public constructor(param0: string);
            public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module ttml {
          export class TtmlHelpers {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.ttml.TtmlHelpers>;
            public static SMPTE_TT_NAMESPACE: string;
            public static TTML_NAMESPACE: string;
            public static NAMESPACE_CONTEXT: javax.xml.namespace.NamespaceContext;
            public static getAllNamespaces(param0: org.w3c.dom.Document): androidNative.Array<string>;
            public constructor();
            public static toTimeExpression(param0: number, param1: number): string;
            public static toTime(param0: string): number;
            public static getEndTime(param0: org.w3c.dom.Node): number;
            public static toTimeExpression(param0: number): string;
            public static pretty(param0: org.w3c.dom.Document, param1: java.io.OutputStream, param2: number): void;
            public static main(param0: androidNative.Array<string>): void;
            public static getStartTime(param0: org.w3c.dom.Node): number;
            public static deepCopyDocument(param0: org.w3c.dom.Document, param1: java.io.File): void;
          }
          export module TtmlHelpers {
            export class TextTrackNamespaceContext {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.ttml.TtmlHelpers.TextTrackNamespaceContext>;
              public getPrefix(param0: string): string;
              public getPrefixes(param0: string): java.util.Iterator<any>;
              public getNamespaceURI(param0: string): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module ttml {
          export class TtmlSegmenter {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.ttml.TtmlSegmenter>;
            public static trimWhitespace(param0: org.w3c.dom.Node): void;
            public constructor();
            public static split(param0: org.w3c.dom.Document, param1: number): java.util.List<org.w3c.dom.Document>;
            public static changeTime(param0: org.w3c.dom.Node, param1: string, param2: number): void;
            public static normalizeTimes(param0: org.w3c.dom.Document): org.w3c.dom.Document;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module ttml {
          export class TtmlTrackImpl extends org.mp4parser.muxer.AbstractTrack {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.ttml.TtmlTrackImpl>;
            public getSyncSamples(): androidNative.Array<number>;
            public lastTimestamp(param0: org.w3c.dom.Document): number;
            public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
            public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
            public getDuration(): number;
            public close(): void;
            public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
            public static getLanguage(param0: org.w3c.dom.Document): string;
            public firstTimestamp(param0: org.w3c.dom.Document): number;
            public getName(): string;
            public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
            public extractLanguage(param0: java.util.List<org.w3c.dom.Document>): void;
            public extractMimeTypes(param0: org.w3c.dom.Document): java.util.List<string>;
            public constructor(param0: string, param1: java.util.List<org.w3c.dom.Document>);
            public getHandler(): string;
            public static extractImages(param0: org.w3c.dom.Document): java.util.List<androidNative.Array<number>>;
            public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
            public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
            public getSampleDurations(): androidNative.Array<number>;
            public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
            public constructor(param0: string);
            public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module webvtt {
          export class WebVttTrack extends org.mp4parser.muxer.AbstractTrack {
            public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.WebVttTrack>;
            public getSyncSamples(): androidNative.Array<number>;
            public getCompositionTimeEntries(): java.util.List<org.mp4parser.boxes.iso14496.part12.CompositionTimeToSample.Entry>;
            public getSubsampleInformationBox(): org.mp4parser.boxes.iso14496.part12.SubSampleInformationBox;
            public getDuration(): number;
            public close(): void;
            public getEdits(): java.util.List<org.mp4parser.muxer.Edit>;
            public getName(): string;
            public getSampleGroups(): java.util.Map<org.mp4parser.boxes.samplegrouping.GroupEntry, androidNative.Array<number>>;
            public getHandler(): string;
            public getTrackMetaData(): org.mp4parser.muxer.TrackMetaData;
            public getSamples(): java.util.List<org.mp4parser.muxer.Sample>;
            public constructor(param0: java.io.InputStream, param1: string, param2: java.util.Locale);
            public getSampleDurations(): androidNative.Array<number>;
            public getSampleDependencies(): java.util.List<org.mp4parser.boxes.iso14496.part12.SampleDependencyTypeBox.Entry>;
            public constructor(param0: string);
            public getSampleEntries(): java.util.List<org.mp4parser.boxes.sampleentry.SampleEntry>;
          }
          export module WebVttTrack {
            export class BoxBearingSample extends org.mp4parser.muxer.Sample {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.WebVttTrack.BoxBearingSample>;
              public writeTo(param0: java.nio.channels.WritableByteChannel): void;
              public getSampleEntry(): org.mp4parser.boxes.sampleentry.SampleEntry;
              public getSize(): number;
              public constructor(param0: java.util.List<org.mp4parser.Box>);
              public asByteBuffer(): java.nio.ByteBuffer;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module webvtt {
          export module sampleboxes {
            export abstract class AbstractCueBox extends org.mp4parser.Box {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.sampleboxes.AbstractCueBox>;
              public getBox(param0: java.nio.channels.WritableByteChannel): void;
              public getContent(): string;
              public setContent(param0: string): void;
              public getSize(): number;
              public constructor(param0: string);
              public getType(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module webvtt {
          export module sampleboxes {
            export class CueIDBox extends org.mp4parser.muxer.tracks.webvtt.sampleboxes.AbstractCueBox {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueIDBox>;
              public constructor();
              public getBox(param0: java.nio.channels.WritableByteChannel): void;
              public getSize(): number;
              public constructor(param0: string);
              public getType(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module webvtt {
          export module sampleboxes {
            export class CuePayloadBox extends org.mp4parser.muxer.tracks.webvtt.sampleboxes.AbstractCueBox {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.sampleboxes.CuePayloadBox>;
              public constructor();
              public getBox(param0: java.nio.channels.WritableByteChannel): void;
              public getSize(): number;
              public constructor(param0: string);
              public getType(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module webvtt {
          export module sampleboxes {
            export class CueSettingsBox extends org.mp4parser.muxer.tracks.webvtt.sampleboxes.AbstractCueBox {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueSettingsBox>;
              public constructor();
              public getBox(param0: java.nio.channels.WritableByteChannel): void;
              public getSize(): number;
              public constructor(param0: string);
              public getType(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module webvtt {
          export module sampleboxes {
            export class CueSourceIDBox extends org.mp4parser.muxer.tracks.webvtt.sampleboxes.AbstractCueBox {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueSourceIDBox>;
              public constructor();
              public getBox(param0: java.nio.channels.WritableByteChannel): void;
              public getSize(): number;
              public constructor(param0: string);
              public getType(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module webvtt {
          export module sampleboxes {
            export class CueTimeBox extends org.mp4parser.muxer.tracks.webvtt.sampleboxes.AbstractCueBox {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueTimeBox>;
              public constructor();
              public getBox(param0: java.nio.channels.WritableByteChannel): void;
              public getSize(): number;
              public constructor(param0: string);
              public getType(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module webvtt {
          export module sampleboxes {
            export class VTTAdditionalTextBox extends org.mp4parser.muxer.tracks.webvtt.sampleboxes.AbstractCueBox {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.sampleboxes.VTTAdditionalTextBox>;
              public constructor();
              public getBox(param0: java.nio.channels.WritableByteChannel): void;
              public getSize(): number;
              public constructor(param0: string);
              public getType(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module webvtt {
          export module sampleboxes {
            export class VTTCueBox extends org.mp4parser.Box {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.sampleboxes.VTTCueBox>;
              public constructor();
              public getBox(param0: java.nio.channels.WritableByteChannel): void;
              public getCueSourceIDBox(): org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueSourceIDBox;
              public setCueTimeBox(param0: org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueTimeBox): void;
              public setCueSourceIDBox(param0: org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueSourceIDBox): void;
              public getCuePayloadBox(): org.mp4parser.muxer.tracks.webvtt.sampleboxes.CuePayloadBox;
              public setCuePayloadBox(param0: org.mp4parser.muxer.tracks.webvtt.sampleboxes.CuePayloadBox): void;
              public getSize(): number;
              public setCueIDBox(param0: org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueIDBox): void;
              public setCueSettingsBox(param0: org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueSettingsBox): void;
              public getCueIDBox(): org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueIDBox;
              public getCueSettingsBox(): org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueSettingsBox;
              public getType(): string;
              public getCueTimeBox(): org.mp4parser.muxer.tracks.webvtt.sampleboxes.CueTimeBox;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module muxer {
      export module tracks {
        export module webvtt {
          export module sampleboxes {
            export class VTTEmptyCueBox extends org.mp4parser.Box {
              public static class: java.lang.Class<org.mp4parser.muxer.tracks.webvtt.sampleboxes.VTTEmptyCueBox>;
              public constructor();
              public getBox(param0: java.nio.channels.WritableByteChannel): void;
              public getSize(): number;
              public getType(): string;
            }
          }
        }
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module support {
      export abstract class AbstractBox extends org.mp4parser.ParsableBox {
        public static class: java.lang.Class<org.mp4parser.support.AbstractBox>;
        public type: string;
        public content: java.nio.ByteBuffer;
        public parseDetails(): void;
        public getType(): string;
        public getSize(): number;
        public constructor(param0: string, param1: androidNative.Array<number>);
        public _parseDetails(param0: java.nio.ByteBuffer): void;
        public getUserType(): androidNative.Array<number>;
        public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
        public isParsed(): boolean;
        public constructor(param0: string);
        public getContentSize(): number;
        public getContent(param0: java.nio.ByteBuffer): void;
        public getBox(param0: java.nio.channels.WritableByteChannel): void;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module support {
      export class AbstractContainerBox extends org.mp4parser.BasicContainer implements org.mp4parser.ParsableBox {
        public static class: java.lang.Class<org.mp4parser.support.AbstractContainerBox>;
        public type: string;
        public largeBox: boolean;
        public getType(): string;
        public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
        public setBoxes(param0: java.util.List<any>): void;
        public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
        public constructor(param0: string);
        public constructor();
        public getHeader(): java.nio.ByteBuffer;
        public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
        public constructor(param0: java.util.List<org.mp4parser.Box>);
        public setParent(param0: org.mp4parser.Container): void;
        public getSize(): number;
        public getBoxes(): java.util.List<org.mp4parser.Box>;
        public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
        public getBox(param0: java.nio.channels.WritableByteChannel): void;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module support {
      export abstract class AbstractFullBox extends org.mp4parser.support.AbstractBox implements org.mp4parser.FullBox {
        public static class: java.lang.Class<org.mp4parser.support.AbstractFullBox>;
        public version: number;
        public flags: number;
        public getType(): string;
        public writeVersionAndFlags(param0: java.nio.ByteBuffer): void;
        public setVersion(param0: number): void;
        public getVersion(): number;
        public getSize(): number;
        public constructor(param0: string, param1: androidNative.Array<number>);
        public getFlags(): number;
        public parseVersionAndFlags(param0: java.nio.ByteBuffer): number;
        public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
        public setFlags(param0: number): void;
        public constructor(param0: string);
        public getBox(param0: java.nio.channels.WritableByteChannel): void;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module support {
      export class BoxComparator {
        public static class: java.lang.Class<org.mp4parser.support.BoxComparator>;
        public static check(param0: org.mp4parser.Container, param1: org.mp4parser.Box, param2: org.mp4parser.Container, param3: org.mp4parser.Box, param4: androidNative.Array<string>): void;
        public static isIgnore(param0: org.mp4parser.Container, param1: org.mp4parser.Box, param2: androidNative.Array<string>): boolean;
        public static check(
          param0: org.mp4parser.Container,
          param1: org.mp4parser.Container,
          param2: org.mp4parser.Container,
          param3: org.mp4parser.Container,
          param4: androidNative.Array<string>
        ): void;
        public static check(param0: org.mp4parser.Container, param1: org.mp4parser.Container, param2: androidNative.Array<string>): void;
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module support {
      export class DoNotParseDetail {
        public static class: java.lang.Class<org.mp4parser.support.DoNotParseDetail>;
        /**
         * Constructs a new instance of the org.mp4parser.support.DoNotParseDetail interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {});
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module support {
      export abstract class FullContainerBox extends org.mp4parser.support.AbstractContainerBox implements org.mp4parser.FullBox {
        public static class: java.lang.Class<org.mp4parser.support.FullContainerBox>;
        public getType(): string;
        public getBoxes(param0: java.lang.Class<any>): java.util.List<any>;
        public setBoxes(param0: java.util.List<any>): void;
        public parse(param0: java.nio.channels.ReadableByteChannel, param1: java.nio.ByteBuffer, param2: number, param3: org.mp4parser.BoxParser): void;
        public toString(): string;
        public setFlags(param0: number): void;
        public constructor(param0: string);
        public constructor();
        public getHeader(): java.nio.ByteBuffer;
        public writeContainer(param0: java.nio.channels.WritableByteChannel): void;
        public constructor(param0: java.util.List<org.mp4parser.Box>);
        public writeVersionAndFlags(param0: java.nio.ByteBuffer): void;
        public setVersion(param0: number): void;
        public getVersion(): number;
        public getSize(): number;
        public getFlags(): number;
        public getBoxes(): java.util.List<org.mp4parser.Box>;
        public parseVersionAndFlags(param0: java.nio.ByteBuffer): number;
        public getBoxes(param0: java.lang.Class<any>, param1: boolean): java.util.List<any>;
        public getBox(param0: java.nio.channels.WritableByteChannel): void;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module support {
      export class Matrix {
        public static class: java.lang.Class<org.mp4parser.support.Matrix>;
        public static ROTATE_0: org.mp4parser.support.Matrix;
        public static ROTATE_90: org.mp4parser.support.Matrix;
        public static ROTATE_180: org.mp4parser.support.Matrix;
        public static ROTATE_270: org.mp4parser.support.Matrix;
        public constructor(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number);
        public static fromByteBuffer(param0: java.nio.ByteBuffer): org.mp4parser.support.Matrix;
        public hashCode(): number;
        public static fromFileOrder(
          param0: number,
          param1: number,
          param2: number,
          param3: number,
          param4: number,
          param5: number,
          param6: number,
          param7: number,
          param8: number
        ): org.mp4parser.support.Matrix;
        public equals(param0: any): boolean;
        public toString(): string;
        public getContent(param0: java.nio.ByteBuffer): void;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module support {
      export class ParseDetail {
        public static class: java.lang.Class<org.mp4parser.support.ParseDetail>;
        /**
         * Constructs a new instance of the org.mp4parser.support.ParseDetail interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {});
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module support {
      export class RequiresParseDetailAspect {
        public static class: java.lang.Class<org.mp4parser.support.RequiresParseDetailAspect>;
        public static hasAspect(): boolean;
        public static aspectOf(): org.mp4parser.support.RequiresParseDetailAspect;
        public before(param0: org.aspectj.lang.JoinPoint): void;
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class Ascii {
        public static class: java.lang.Class<org.mp4parser.tools.Ascii>;
        public static convert(param0: androidNative.Array<number>): string;
        public static convert(param0: string): androidNative.Array<number>;
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class ByteBufferByteChannel {
        public static class: java.lang.Class<org.mp4parser.tools.ByteBufferByteChannel>;
        public constructor(param0: java.nio.ByteBuffer);
        public close(): void;
        public write(param0: java.nio.ByteBuffer): number;
        public constructor(param0: androidNative.Array<number>);
        public read(param0: java.nio.ByteBuffer): number;
        public isOpen(): boolean;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class CastUtils {
        public static class: java.lang.Class<org.mp4parser.tools.CastUtils>;
        public static l2i(param0: number): number;
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class DateHelper {
        public static class: java.lang.Class<org.mp4parser.tools.DateHelper>;
        public static convert(param0: number): java.util.Date;
        public static convert(param0: java.util.Date): number;
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class Hex {
        public static class: java.lang.Class<org.mp4parser.tools.Hex>;
        public static encodeHex(param0: androidNative.Array<number>, param1: number): string;
        public static encodeHex(param0: androidNative.Array<number>): string;
        public static decodeHex(param0: string): androidNative.Array<number>;
        public constructor();
        public static encodeHex(param0: java.nio.ByteBuffer): string;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class IsoTypeReader {
        public static class: java.lang.Class<org.mp4parser.tools.IsoTypeReader>;
        public static read4cc(param0: java.nio.ByteBuffer): string;
        public static readIso639(param0: java.nio.ByteBuffer): string;
        public static readUInt24(param0: java.nio.ByteBuffer): number;
        public static readFixedPoint1616(param0: java.nio.ByteBuffer): number;
        public static readUInt48(param0: java.nio.ByteBuffer): number;
        public static readUInt64(param0: java.nio.ByteBuffer): number;
        public static byte2int(param0: number): number;
        public static readFixedPoint0230(param0: java.nio.ByteBuffer): number;
        public static readFixedPoint88(param0: java.nio.ByteBuffer): number;
        public constructor();
        public static readUInt32(param0: java.nio.ByteBuffer): number;
        public static readString(param0: java.nio.ByteBuffer): string;
        public static readUInt16BE(param0: java.nio.ByteBuffer): number;
        public static readUInt8(param0: java.nio.ByteBuffer): number;
        public static readUInt16(param0: java.nio.ByteBuffer): number;
        public static readString(param0: java.nio.ByteBuffer, param1: number): string;
        public static readUInt32BE(param0: java.nio.ByteBuffer): number;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class IsoTypeReaderVariable {
        public static class: java.lang.Class<org.mp4parser.tools.IsoTypeReaderVariable>;
        public static read(param0: java.nio.ByteBuffer, param1: number): number;
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class IsoTypeWriter {
        public static class: java.lang.Class<org.mp4parser.tools.IsoTypeWriter>;
        public static writeUInt16BE(param0: java.nio.ByteBuffer, param1: number): void;
        public static writeIso639(param0: java.nio.ByteBuffer, param1: string): void;
        public static writeUInt32(param0: java.nio.ByteBuffer, param1: number): void;
        public static writeZeroTermUtf8String(param0: java.nio.ByteBuffer, param1: string): void;
        public static writeUInt32BE(param0: java.nio.ByteBuffer, param1: number): void;
        public static writeUInt48(param0: java.nio.ByteBuffer, param1: number): void;
        public static writeFixedPoint88(param0: java.nio.ByteBuffer, param1: number): void;
        public static writeUInt24(param0: java.nio.ByteBuffer, param1: number): void;
        public static writeUInt16(param0: java.nio.ByteBuffer, param1: number): void;
        public constructor();
        public static writePascalUtfString(param0: java.nio.ByteBuffer, param1: string): void;
        public static writeFixedPoint0230(param0: java.nio.ByteBuffer, param1: number): void;
        public static writeUtf8String(param0: java.nio.ByteBuffer, param1: string): void;
        public static writeUInt64(param0: java.nio.ByteBuffer, param1: number): void;
        public static writeUInt8(param0: java.nio.ByteBuffer, param1: number): void;
        public static writeFixedPoint1616(param0: java.nio.ByteBuffer, param1: number): void;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class IsoTypeWriterVariable {
        public static class: java.lang.Class<org.mp4parser.tools.IsoTypeWriterVariable>;
        public static write(param0: number, param1: java.nio.ByteBuffer, param2: number): void;
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class Mp4Arrays {
        public static class: java.lang.Class<org.mp4parser.tools.Mp4Arrays>;
        public static copyOfAndAppend(param0: androidNative.Array<number>, param1: androidNative.Array<number>): androidNative.Array<number>;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class Mp4Math {
        public static class: java.lang.Class<org.mp4parser.tools.Mp4Math>;
        public static gcd(param0: number, param1: number): number;
        public static lcm(param0: androidNative.Array<number>): number;
        public static lcm(param0: number, param1: number): number;
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class Offsets {
        public static class: java.lang.Class<org.mp4parser.tools.Offsets>;
        public static find(param0: org.mp4parser.Container, param1: org.mp4parser.ParsableBox, param2: number): number;
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class Path {
        public static class: java.lang.Class<org.mp4parser.tools.Path>;
        public static component: java.util.regex.Pattern;
        public static getPaths(param0: org.mp4parser.Container, param1: string): java.util.List<any>;
        public static getPaths(param0: org.mp4parser.Box, param1: string): java.util.List<any>;
        public static getPath(param0: org.mp4parser.Container, param1: string): org.mp4parser.Box;
        public static getPath(param0: org.mp4parser.support.AbstractContainerBox, param1: string): org.mp4parser.Box;
        public static getPath(param0: org.mp4parser.Box, param1: string): org.mp4parser.Box;
        public static isContained(param0: org.mp4parser.Container, param1: org.mp4parser.Box, param2: string): boolean;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class RangeStartMap<K, V> extends java.util.Map<any, any> {
        public static class: java.lang.Class<org.mp4parser.tools.RangeStartMap<any, any>>;
        public values(): java.util.Collection<any>;
        public get(param0: any): any;
        public putAll(param0: java.util.Map<any, any>): void;
        public entrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
        public containsKey(param0: any): boolean;
        public keySet(): java.util.Set<any>;
        public constructor();
        public size(): number;
        public constructor(param0: any, param1: any);
        public put(param0: any, param1: any): any;
        public remove(param0: any): any;
        public clear(): void;
        public isEmpty(): boolean;
        public containsValue(param0: any): boolean;
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class UUIDConverter {
        public static class: java.lang.Class<org.mp4parser.tools.UUIDConverter>;
        public static convert(param0: java.util.UUID): androidNative.Array<number>;
        public static convert(param0: androidNative.Array<number>): java.util.UUID;
        public constructor();
      }
    }
  }
}

declare module org {
  export module mp4parser {
    export module tools {
      export class Utf8 {
        public static class: java.lang.Class<org.mp4parser.tools.Utf8>;
        public static utf8StringLengthInBytes(param0: string): number;
        public static convert(param0: androidNative.Array<number>): string;
        public static convert(param0: string): androidNative.Array<number>;
        public constructor();
      }
    }
  }
}

//Generics information:
//org.mp4parser.tools.RangeStartMap:2
