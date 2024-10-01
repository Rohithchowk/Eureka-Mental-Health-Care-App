import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Modal, Button, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Import the local image
const bannerImage = 'https://via.placeholder.com/100';

// Sample data for psychiatrists
const psychiatrists = [
  {
    id: '1',
    name: 'Dr. Rohit Chowki',
    image: 'https://via.placeholder.com/100', // Placeholder image
    specialization: 'Child Psychiatry',
  },
  {
    id: '2',
    name: 'Dr. Yatish Manne',
    image: 'https://via.placeholder.com/100', // Placeholder image
    specialization: 'Adult Psychiatry',
  },
  {
    id: '3',
    name: 'Dr. Vamshi Nayak',
    image: 'https://via.placeholder.com/100', // Placeholder image
    specialization: 'Geriatric Psychiatry',
  },
  {
    id: '4',
    name: 'Dr. Manitej Jilla',
    image: 'https://via.placeholder.com/100', // Placeholder image
    specialization: 'Forensic Psychiatry',
  },
];

const Doctor = () => {
  const [date, setDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    setDate(new Date());
    setIsDateSelected(false); 
  }, []);  

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setIsDateSelected(true);
    setShowDatePicker(false);
  };

  const clearDate = () => {
    setDate(new Date());
    setIsDateSelected(false);
  };

  const openBookingModal = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const closeBookingModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
    setSelectedSlot('');
    setPatientName('');
    setGender('');
  };

  const handleBookAppointment = () => {
    if (!selectedSlot || !patientName || !gender) {
      Alert.alert('Error', 'Please fill all the details.');
      return;
    }
    Alert.alert('Success', 'Appointment booked successfully!');
    closeBookingModal();
  };

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.specialization}>{item.specialization}</Text>

      {/* Book Appointment Button */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => openBookingModal(item)}
      >
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book Your Appointment</Text>
      <View style={styles.imageContainer}>
        <Image source={bannerImage} style={styles.bannerImage} />
      </View>
      <Button title="Pick a Date" onPress={() => setShowDatePicker(true)} />

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()} // Disable past dates
        />
      )}

      <View style={styles.dateContainer}>
        <View style={styles.centeredDate}>
          <Text style={styles.selectedDate}>
            Selected Date: {isDateSelected ? date.toLocaleDateString() : 'None'}
          </Text>
          {isDateSelected && (
            <Text style={styles.clearLink} onPress={clearDate}>
              (clear)
            </Text>
          )}
        </View>
      </View>

      {isDateSelected && (
        <FlatList
          data={psychiatrists}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}

      {/* Modal for booking */}
      {selectedDoctor && (
        <Modal
          transparent={true}
          visible={showModal}
          animationType="slide"
          onRequestClose={closeBookingModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedDoctor.image }} style={styles.modalImage} />
              <Text style={styles.modalName}>{selectedDoctor.name}</Text>
              <Text style={styles.modalSpecialization}>{selectedDoctor.specialization}</Text>

              {/* Available Slots Section */}
              <Text style={styles.availableSlotsHeading}>Available Slots</Text>
              <View style={styles.slotContainer}>
                {['10-12 AM', '12-2 PM', '3-5 PM', '5-7 PM', '7-9 PM', '9-11 PM'].map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.slotBox, selectedSlot === slot && styles.selectedSlot]}
                    onPress={() => setSelectedSlot(slot)}
                  >
                    <Text style={selectedSlot === slot ? styles.selectedSlotText : styles.slotText}>{slot}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Patient Name Section */}
              <Text style={styles.patientNameHeading}>Patient Name</Text>
              <TextInput
                style={styles.textInput}
                value={patientName}
                onChangeText={setPatientName}
                placeholder="Enter your name"
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="off"
                keyboardType="default"
                importantForAutofill="no"
                underlineColorAndroid="transparent"
              />


              {/* Gender Selection Section */}
              <Text style={styles.genderHeading}>Select Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity onPress={() => setGender('Male')} style={[styles.genderBox, gender === 'Male' && styles.selectedGender]}>
                  <Text style={gender === 'Male' ? styles.selectedGenderText : styles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setGender('Female')} style={[styles.genderBox, gender === 'Female' && styles.selectedGender]}>
                  <Text style={gender === 'Female' ? styles.selectedGenderText : styles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>

              {/* Confirm Booking Button */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
                  <Text style={styles.buttonText}>Confirm Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeBookingModal} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialization: {
    fontSize: 14,
    color: '#666',
  },
  availableText: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  bookButton: {
    backgroundColor: '#6ec007', // Green color for the button
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  centeredDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  clearLink: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalSpecialization: {
    fontSize: 16,
    color: '#666',
  },
  availableSlotsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  slotBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
  },
  slotText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSlot: {
    backgroundColor: '#0B0BFF', // Green color for selected slot
  },
  selectedSlotText: {
    color: '#fff',
  },
  patientNameHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 15,
  },
  genderHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  genderBox: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    alignItems: 'center',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  selectedGender: {
    backgroundColor: '#0B0BFF', 
  },
  selectedGenderText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Doctor;