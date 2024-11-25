import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const ContainerView = ({isLoading, children}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Your main content */}
      <View style={styles.content}>{children}</View>

      {/* Loading Modal */}
      <Modal transparent animationType="none" visible={isLoading || false}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color="black" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    // Additional styles for your main content
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ContainerView;
