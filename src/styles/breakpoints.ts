export const size = {
  mobileS: 320,
  mobileM: 375,
  mobile: 576,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
  desktopL: 3260,
};

/**
 * @description half-baked css for allowing media queries to be like this: @media ${device.mobile} { ... };
 *
 */
export const device = {
  mobileS: `(max-width: ${size.mobileS}px)`,
  mobileM: `(max-width: ${size.mobileM}px)`,
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
  laptop: `(max-width: ${size.laptop}px)`,
  laptopL: `(max-width: ${size.laptopL}px)`,
  desktop: `(max-width: ${size.desktop}px)`,
  desktopL: `(max-width: ${size.desktopL}px)`,
};
