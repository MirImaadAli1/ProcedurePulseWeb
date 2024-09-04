function navbar(theme, ownerState) {
  // Destructuring properties from the theme and ownerState
  const { palette, boxShadows, functions, transitions, breakpoints, borders } = theme;
  const { transparentNavbar, absolute, light, darkMode } = ownerState; // Navbar-specific state values

  const { dark, white, text, transparent, background } = palette; // Color palette from theme
  const { navbarBoxShadow } = boxShadows; // Box shadow for navbar
  const { rgba, pxToRem } = functions; // Utility functions (rgba for colors, pxToRem for rem conversions)
  const { borderRadius } = borders; // Border radius from theme

  return {
    // Set the box shadow based on the navbar state
    boxShadow: transparentNavbar || absolute ? 'none' : navbarBoxShadow,

    // Backdrop filter adds a blur effect if not transparent or absolute
    backdropFilter: transparentNavbar || absolute ? 'none' : `saturate(200%) blur(${pxToRem(30)})`,

    // Background color adjusts based on the navbar state and theme (transparent, dark mode, or light mode)
    backgroundColor:
      transparentNavbar || absolute
        ? `${transparent.main} !important` // Fully transparent navbar if state demands
        : rgba(darkMode ? background.default : white.main, 0.8), // Set background color with some opacity based on mode

    // Color adjustments for navbar text
    color: () => {
      let color;
      if (light) {
        color = white.main; // Light mode text color
      } else if (transparentNavbar) {
        color = text.main; // Transparent navbar text color
      } else {
        color = dark.main; // Dark mode text color
      }
      return color;
    },

    // Position and spacing for the navbar based on absolute positioning
    top: absolute ? 0 : pxToRem(12),
    minHeight: pxToRem(75), // Minimum height for the navbar
    display: 'grid', // Use grid layout to align items
    alignItems: 'center',
    borderRadius: borderRadius.xl, // Set border radius
    paddingTop: pxToRem(8),
    paddingBottom: pxToRem(8),
    paddingRight: absolute ? pxToRem(8) : 0, // Conditionally add padding based on absolute state
    paddingLeft: absolute ? pxToRem(16) : 0,

    // Apply transitions to all elements within the navbar for smooth animations
    '& > *': {
      transition: transitions.create('all', {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    // Specific styles for the toolbar inside the navbar
    '& .MuiToolbar-root': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      // Responsive adjustments for larger screens
      [breakpoints.up('sm')]: {
        minHeight: 'auto',
        padding: `${pxToRem(4)} ${pxToRem(16)}`,
      },
    },
  };
}
