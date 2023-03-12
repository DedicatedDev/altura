import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

interface OverlayProps {
  isLoading: boolean;
}

const Overlay: React.FC<OverlayProps> = ({isLoading}) => {
  return isLoading ? (
    <View style={styles.overlay}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Overlay;
