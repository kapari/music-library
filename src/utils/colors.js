import { transparentize, meetsContrastGuidelines } from 'polished';

const colors = {
  white: '#fff',
  black: '#000',
  orange: '#c64a01',
  lightGray: '#777',
  darkGray: '#444'
}

const getContrastText = (color) => {
  if (meetsContrastGuidelines(colors.orange, colors.white)) {
    return colors.white
  } else {
    return colors.black
  }
}

const theme = {
  contentBg: transparentize(0.2, colors.black),
  contentBorder: colors.lightGray,
  headingText: getContrastText(colors.black),
  cardBg: colors.darkGray,
  cardText: getContrastText(colors.darkGray),
  primary: colors.orange,
  primaryText: getContrastText(colors.orange),
  iconBtnHover: colors.darkGray
}

export default theme;
