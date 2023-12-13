module.exports = {
  message: 'NativeScript Plugins ~ made with ❤️  Choose a command to start...',
  pageSize: 32,
  scripts: {
    default: 'nps-i',
    nx: {
      script: 'nx',
      description: 'Execute any command with the @nrwl/cli',
    },
    format: {
      script: 'nx format:write',
      description: 'Format source code of the entire workspace (auto-run on precommit hook)',
    },
    '🔧': {
      script: `npx cowsay "NativeScript plugin demos make developers 😊"`,
      description: '_____________  Apps to demo plugins with  _____________',
    },
    // demos
    apps: {
      '...Vanilla...': {
        script: `npx cowsay "Nothing wrong with vanilla 🍦"`,
        description: ` 🔻 Vanilla`,
      },
      demo: {
        clean: {
          script: 'nx run demo:clean',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx run demo:ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx run demo:android',
          description: '⚆  Run Android  🤖',
        },
      },
      '...Angular...': {
        script: `npx cowsay "Test all the Angles!"`,
        description: ` 🔻 Angular`,
      },
      'demo-angular': {
        clean: {
          script: 'nx run demo-angular:clean',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx run demo-angular:ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx run demo-angular:android',
          description: '⚆  Run Android  🤖',
        },
      },
    },
    '⚙️': {
      script: `npx cowsay "@voicethread/* packages will keep your ⚙️ cranking"`,
      description: '_____________  @voicethread/*  _____________',
    },
    // packages
    // build output is always in dist/packages
    '@voicethread': {
      // @voicethread/nativescript-custom-rotors
      'nativescript-custom-rotors': {
        build: {
          script: 'nx run nativescript-custom-rotors:build.all',
          description: '@voicethread/nativescript-custom-rotors: Build',
        },
      },
      // @voicethread/nativescript-filepicker
      'nativescript-filepicker': {
        build: {
          script: 'nx run nativescript-filepicker:build.all',
          description: '@voicethread/nativescript-filepicker: Build',
        },
      },
      // @voicethread/nativescript-downloader
      'nativescript-downloader': {
        build: {
          script: 'nx run nativescript-downloader:build.all',
          description: '@voicethread/nativescript-downloader: Build',
        },
      },
      // @voicethread/nativescript-audio-player
      'nativescript-audio-player': {
        build: {
          script: 'nx run nativescript-audio-player:build.all',
          description: '@voicethread/nativescript-audio-player: Build',
        },
      },
      // @voicethread/nativescript-audio-recorder
      'nativescript-audio-recorder': {
        build: {
          script: 'nx run nativescript-audio-recorder:build.all',
          description: '@voicethread/nativescript-audio-recorder: Build',
        },
      },
      // @voicethread/nativescript-rive
      'nativescript-rive': {
        build: {
          script: 'nx run nativescript-rive:build.all',
          description: '@voicethread/nativescript-rive: Build',
        },
      },
      'build-all': {
        script: 'nx run-many --target=build.all --all',
        description: 'Build all packages',
      },
    },
    '⚡': {
      script: `npx cowsay "Focus only on source you care about for efficiency ⚡"`,
      description: '_____________  Focus (VS Code supported)  _____________',
    },
    focus: {
      'nativescript-custom-rotors': {
        script: 'nx run nativescript-custom-rotors:focus',
        description: 'Focus on @voicethread/nativescript-custom-rotors',
      },
      'nativescript-filepicker': {
        script: 'nx run nativescript-filepicker:focus',
        description: 'Focus on @voicethread/nativescript-filepicker',
      },
      'nativescript-downloader': {
        script: 'nx run nativescript-downloader:focus',
        description: 'Focus on @voicethread/nativescript-downloader',
      },
      'nativescript-audio-player': {
        script: 'nx run nativescript-audio-player:focus',
        description: 'Focus on @voicethread/nativescript-audio-player',
      },
      'nativescript-audio-recorder': {
        script: 'nx run nativescript-audio-recorder:focus',
        description: 'Focus on @voicethread/nativescript-audio-recorder',
      },
      'nativescript-rive': {
        script: 'nx run nativescript-rive:focus',
        description: 'Focus on @voicethread/nativescript-rive',
      },
      reset: {
        script: 'nx g @voicethread/plugin-tools:focus-packages',
        description: 'Reset Focus',
      },
    },
    '.....................': {
      script: `npx cowsay "That's all for now folks ~"`,
      description: '.....................',
    },
  },
};
