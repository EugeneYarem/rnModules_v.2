/**
 * This module contains screen that presents features of the react-native-image-crop-picker.
 *
 * @format
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Button } from 'react-native-material-ui';
import { Platform, StatusBar, View } from 'react-native';
import { withTranslation } from 'react-i18next';

import Gallery from '../../components/Gallery';
import createStyles from './CropPicker.styles';
import intoThemeWrapper from '../../utils/intoThemeWrapper';

class CropPickerScreen extends Component {
  static propTypes = {
    bufferConfig: PropTypes.object.isRequired,
    chosenMedia: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    navigationBarStyle: PropTypes.object.isRequired,
    onGetMedia: PropTypes.func.isRequired,
    onMediaLongPress: PropTypes.func.isRequired,
    onMediaPress: PropTypes.func.isRequired,
    takenMedia: PropTypes.array.isRequired,
    t: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { navigation, navigationBarStyle } = this.props;
    this._navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(navigationBarStyle.backgroundColor);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    const {
      bufferConfig,
      chosenMedia,
      onGetMedia,
      onMediaLongPress,
      onMediaPress,
      takenMedia,
      t,
      theme
    } = this.props;
    const styles = createStyles(theme.palette);

    return (
      <View style={styles.screen}>
        <Button
          text={t('buttonTitle')}
          accent
          raised
          onPress={onGetMedia}
          style={{ container: styles.letButton }}
        />
        <ScrollableTabView>
          <Gallery
            tabLabel={t('chosenMedias')}
            bufferConfig={bufferConfig}
            media={chosenMedia}
            onMediaPress={onMediaPress(chosenMedia)}
            onMediaLongPress={onMediaLongPress}
          />
          <Gallery
            tabLabel={t('takenMedias')}
            bufferConfig={bufferConfig}
            media={takenMedia}
            onMediaPress={onMediaPress(takenMedia)}
            onMediaLongPress={onMediaLongPress}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

export default intoThemeWrapper(withTranslation()(CropPickerScreen));
