import { colors } from "./design-system"

/**
 * This file provides a convenient way to access design system values in components
 * It's particularly useful for dynamic styling where Tailwind classes aren't sufficient
 */

export const theme = {
  colors: {
    primary: colors.primary.main,
    primaryHover: colors.primary.hover,
    primaryLight: colors.primary.light,
    primaryDark: colors.primary.dark,

    // Add more theme values as needed
  },
}

export default theme
