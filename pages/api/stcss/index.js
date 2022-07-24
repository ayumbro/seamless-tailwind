export default function handler(req, res) {
  const less = `
  @breakpoints: {
    xs: @xs;
    sm: @sm;
    md: @md;
    lg: @lg;
    xl: @xl;
    2xl: @2xl;
  }
  
  @below: {
    xs: ~"(max-width: @{xs})";
    sm: ~"(max-width: @{sm})";
    md: ~"(max-width: @{md})";
    lg: ~"(max-width: @{lg})";
    xl: ~"(max-width: @{xl})";
    2xl: ~"(max-width: @{2xl})";
  }
  
  @above: {
    xs: ~"(min-width: @{xs})";
    sm: ~"(min-width: @{sm})";
    md: ~"(min-width: @{md})";
    lg: ~"(min-width: @{lg})";
    xl: ~"(min-width: @{xl})";
    2xl: ~"(min-width: @{2xl})";
  }
  
  .max-vp {
    max-width: @vpMax;
    margin-inline: auto;
    @media (max-width: @vpMax) {
      max-width: calc(100% - @vpPadX);
    }
  }
  
  // Patch for updated breakpoints
  .container {
    width: 100%
  }
  
  each(@breakpoints, {
    .max-w-screen-@{key} {
      max-width: @value;
    }
    @media (min-width: @value) {
      .container {
        max-width: @value;
      }
    }
  });
  
  // Other updates
  html {
    font-family: @fontFamily;
  }
  `;
  res.status(200).send(less);
}
