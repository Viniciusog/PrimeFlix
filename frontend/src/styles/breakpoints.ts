export const size = {
    mobileMin: '320px',
    mobileMax: '480px',
    tabletMin: '481px',
    tabletMax: '768px',
    laptopMin: '769px', 
    laptopMax: '1024px',
    desktop: '1025px'
  }

  export const device = {
    mobile: `(max-width: ${size.mobileMax})`,
    tablet: `(max-width: ${size.tabletMax})`,
    laptop: `(max-width: ${size.laptopMax})`
  };