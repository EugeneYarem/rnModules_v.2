/**
 * This module contains styles for RootNavigator.
 *
 * @format
 */

import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

const createStyles = ({
  accentColor,
  additionalColor_2,
  additionalColor_3,
  additionalColor_4,
  alternateTextColor,
  primaryColor
}) =>
  StyleSheet.create({
    admobNavigationBarStyle: { backgroundColor: accentColor },
    chatNavigationBarStyle: { backgroundColor: additionalColor_4 },
    cropPickerNavigationBarStyle: { backgroundColor: primaryColor },
    fastImageNavigationBarStyle: { backgroundColor: additionalColor_2 },
    videoNavigationBarStyle: { backgroundColor: additionalColor_3 },
    screen: { flex: 1 },
    title: { color: alternateTextColor }
  });

createStyles.propTypes = { palette: PropTypes.object.isRequired };

export default createStyles;
