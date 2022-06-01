import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

export const HCButton = (props) => {
  const { title, color, style, onPress } = props;
  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      android_ripple={{ color: '#031926' }}
      style={({ pressed }) => [
        { backgroundColor: pressed ? '#373F51' : color },
        styles.button,
        { ...style },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
  },
});
