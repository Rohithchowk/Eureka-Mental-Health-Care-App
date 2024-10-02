import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';

const App = () => {
  // Sample data for images and names
  const data = [
    { id: 1, name: 'Item 1', image: 'https://via.placeholder.com/100', details: 'Details about Item 1' },
    { id: 2, name: 'Item 2', image: 'https://via.placeholder.com/100', details: 'Details about Item 2' },
    { id: 3, name: 'Item 3', image: 'https://via.placeholder.com/100', details: 'Details about Item 3' },
    { id: 4, name: 'Item 4', image: 'https://via.placeholder.com/100', details: 'Details about Item 4' },
    { id: 5, name: 'Item 5', image: 'https://via.placeholder.com/100', details: 'Details about Item 5' },
    { id: 6, name: 'Item 6', image: 'https://via.placeholder.com/100', details: 'Details about Item 6' },
    { id: 7, name: 'Item 7', image: 'https://via.placeholder.com/100', details: 'Details about Item 7' },
    { id: 8, name: 'Item 8', image: 'https://via.placeholder.com/100', details: 'Details about Item 8' },
    { id: 9, name: 'Item 9', image: 'https://via.placeholder.com/100', details: 'Details about Item 9' },
    { id: 10, name: 'Item 10', image: 'https://via.placeholder.com/100', details: 'Details about Item 10' },
    { id: 11, name: 'Item 11', image: 'https://via.placeholder.com/100', details: 'Details about Item 11' },
    { id: 12, name: 'Item 12', image: 'https://via.placeholder.com/100', details: 'Details about Item 12' },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Open modal with selected item
  const handleImageClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Main Header</Text>
      
      {/* Sub-header */}
      <Text style={styles.subHeader}>Sub Header</Text>

      {/* Grid Section */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {data.map((item) => (
          <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => handleImageClick(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for Image Preview and Details */}
      {selectedItem && (
        <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Image source={{ uri: selectedItem.image }} style={styles.modalImage} />
              <Text style={styles.modalItemName}>{selectedItem.name}</Text>
              <Text style={styles.modalDetails}>{selectedItem.details}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '30%', // 3 items per row
    marginVertical: 16,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalItemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
