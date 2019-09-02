/**
 * This module contains screen that presents features of the react-native-fs.
 *
 * @format
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Picker, Platform, StatusBar, View } from 'react-native';
import { ListItem } from 'react-native-material-ui';

import createStyles from './FileSystem.styles';
import intoThemeWrapper from '../../utils/intoThemeWrapper';

class FileSystemScreen extends Component {
  static propTypes = {
    dirContent: PropTypes.array.isRequired,
    dirName: PropTypes.string.isRequired,
    directoryHasBeenChanged: PropTypes.func.isRequired,
    dirs: PropTypes.object.isRequired,
    isBackFolderLineVisible: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    navigationBarStyle: PropTypes.object.isRequired,
    onBackFolderPress: PropTypes.func.isRequired,
    onItemLongPress: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onItemRemove: PropTypes.func.isRequired,
    pathInDirectoryHasBeenChanged: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { navigation, navigationBarStyle } = this.props;
    this._navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(navigationBarStyle.backgroundColor);
    });

    this.props.directoryHasBeenChanged(this.props.dirName);
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    const {
      dirContent,
      dirName,
      directoryHasBeenChanged,
      dirs,
      isBackFolderLineVisible,
      onBackFolderPress,
      onItemLongPress,
      onItemPress,
      onItemRemove,
      pathInDirectoryHasBeenChanged,
      theme
    } = this.props;

    // console.log(dirs);

    const styles = createStyles(theme.palette);

    console.log(dirs);
    Object.keys(dirs).forEach(key => dirs[key] == null && delete dirs[key]);
    console.log(dirs);

    return (
      <View style={styles.screen}>
        <Picker
          selectedValue={dirName}
          style={styles.dirPicker}
          onValueChange={(itemValue) => {
            console.log(itemValue);
            directoryHasBeenChanged(itemValue);
          }}
        >
          {Object.keys(dirs).map(item => (
            <Picker.Item label={item} value={item} key={item} />
          ))}
        </Picker>
        {isBackFolderLineVisible ? (
          <ListItem divider centerElement="..." onPress={onBackFolderPress} />
        ) : null}
        <FlatList
          data={dirContent}
          keyExtractor={item => item.path}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <ListItem
                divider
                centerElement={item.name}
                leftElement={item.isDirectory() ? 'folder' : ''}
                rightElement="delete"
                onLongPress={() => {
                  console.log(item.path);
                  console.log(onItemLongPress(item.path));
                }}
                onPress={() => {
                  item.isDirectory()
                    ? pathInDirectoryHasBeenChanged(item.path)
                    : onItemPress(item.path);
                }}
                onRightElementPress={() => {
                  console.log(item.path);
                  // onItemRemove(item.path);
                }}
              />
            );
          }}
        />
      </View>
    );
  }
}

export default intoThemeWrapper(FileSystemScreen);
