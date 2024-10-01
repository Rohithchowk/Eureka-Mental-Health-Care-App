import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Modal, Button, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Import the local image
const bannerImage = ''; // Add your image source here

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

  // Reset date and isDateSelected when app starts or reloads
  useEffect(() => {
    setDate(new Date());
    setIsDateSelected(false);  // Reset the date to none
  }, []);  // Empty dependency array ensures this runs only on mount

  const handleDateChange = (event, selectedDate) => {
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

  const openBookingModal = (doctor) => {
   
    setSelectedDoctor(doctor);
    setShowModal(true);
    console.log("opening model")
  };

  const closeBookingModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
    setSelectedSlot('');
    setPatientName('');
    setGender('');
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot || !patientName || !gender) {
      Alert.alert('Error', 'Please fill all the details.');
      return;
    }

    if (!selectedDoctor) {
      Alert.alert('Error', 'No doctor selected.');
      return;
    }

    const appointmentData = {
      patientName,
      gender,
      doctorName: selectedDoctor.name,
      date: date.toISOString().split('T')[0],
      slot: selectedSlot,
    };

    console.log("Appointment Data: ", appointmentData); // Log the data being sent

    try {
      const response = await fetch('http://10.0.2.2:9000/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', result.message);
        closeBookingModal();
      } else {
        const error = await response.json();
        console.error('Booking error response:', error); // Log error response
        Alert.alert('Error', error.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to book the appointment. Please try again later.');
      console.error('Booking error:', error); // Log full error details
    }
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
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  dateContainer: {
    marginVertical: 16,
  },
  centeredDate: {
    alignItems: 'center',
  },
  selectedDate: {
    fontSize: 18,
  },
  clearLink: {
    color: 'blue',
    marginTop: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  specialization: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
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
    justifyContent: 'space-around',
  },
  slotBox: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  selectedSlot: {
    backgroundColor: '#007bff',
  },
  selectedSlotText: {
    color: '#fff',
  },
  slotText: {
    color: '#000',
  },
  patientNameHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginTop: 8,
  },
  genderHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  genderBox: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e9ecef',
    margin: 5,
    flex: 1,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#007bff',
  },
  selectedGenderText: {
    color: '#fff',
  },
  genderText: {
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    width: '48%',
  },
  cancelText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Doctor;
