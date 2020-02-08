let config = {
  props: {
    app: false,
    progress: 0,
    appNotInitialized: p => p.app && !p.initialized
  },
  nodes: {
    root: {
      isMain: true,
      root: "top-0 left-0 w-full h-1 bg-$color-100 overflow-hidden relative",
      app: "fixed z-50",
      appNotInitialized: "hidden"
    },
    trackInc: {
      root: "bg-$color-500 h-1 absolute inc",
      progress: "transition remove:inc"
    },
    trackDec: {
      root: "bg-$color-500 h-1 absolute dec",
      progress: "hidden"
    }
  }
};

export default config;