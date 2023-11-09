import React, {useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import colors from 'app/styles/colors';

type Props = {
  size: 's' | 'm' | 'l';
  direction: 'up' | 'right' | 'down' | 'left';
};

function NavArrow({size, direction}: Props): JSX.Element {
  const {containerStyle, arrowStyle} = useMemo<{
    containerStyle: ViewStyle;
    arrowStyle: ViewStyle;
  }>(() => {
    const rotationValue: number = (() => {
      switch (direction) {
        case 'up':
          return -45;
        case 'right':
          return 45;
        case 'down':
          return 135;
        case 'left':
          return -135;
      }
    })();
    const sizeValue: number = (() => {
      switch (size) {
        case 's':
          return 10;
        case 'm':
          return 15;
        case 'l':
          return 20;
      }
    })();
    return {
      containerStyle: {
        ...styles.container,
        width: sizeValue * 2,
        height: sizeValue * 2,
      },
      arrowStyle: {
        ...styles.arrow,
        width: sizeValue,
        height: sizeValue,
        transform: `rotate(${rotationValue}deg)`,
      },
    };
  }, [size, direction]);

  return (
    <View style={containerStyle}>
      <View style={arrowStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.navArrow.color,
  },
});

export default NavArrow;
