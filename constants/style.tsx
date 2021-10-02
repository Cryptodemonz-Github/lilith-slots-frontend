const customTheme = {
  rangeInput: {
    thumb: {
      color: "#9933FF",
      extend: `
        border-radius: 0px;
      `,
    },
    track: {
      color: "#fff",
    },
  },
  button: {
    border: {
      radius: "4px",
    },
    hover: {
      color: "#81FCED",
    },
  },
  global: {
    hover: {
      color: "#2D2102",
    },
    font: {
      family: "MonoPixel-Awesome",
    },
    colors: {
      active: "#9832FE",
      border: "#000",
      placeholder: "#fff",
      text: "#fff",
    },
    focus: {
      shadow: {
        color: "#33FFFF",
      },
      border: {
        color: "#000",
      },
    },
    drop: {
      background: "#000",
      elevation: "none",
      hover: "#33FFFF",
      extend: `
              font-size: 14px;
              border-bottom-left-radius: 1px;
              border-bottom-right-radius: 1px;
              li {
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
              }
              overflow: hidden;
            `,
    },
  },
};

export default customTheme;
