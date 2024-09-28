import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ImageBackground, TouchableOpacity, Share } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

const SleepView = () => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [liked, setLiked] = useState(false);
    const [shuffled,setshuffle]=useState(false);

    const like = () => {
        setLiked(!liked); 
    };
    const shuffle = () => {
        setshuffle(!shuffled); 
    };

    const images = [
        { id: '1', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfiEOSKeDi4EwYLrCUM1sJiJITD7V5_mibAQ&s', audioUri: 'https://soundcloud.com/guitar-mp3/rockrhythm12?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
        { id: '2', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKEXpYiYyyJ5ITnRwpRXB6aNMXP6qqEb-qPg&s', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        { id: '3', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHyZ2uPPVeK0jLpecBPryoAaUrHx05xjvGg&s', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        { id: '4', uri: 'https://cdn.pixabay.com/photo/2017/10/17/01/45/rain-2859322_1280.jpg', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
        { id: '5', uri: 'https://media.istockphoto.com/id/517643357/photo/thunderstorm-lightning-with-dark-cloudy-sky.jpg?s=1024x1024&w=is&k=20&c=Bj1lc-TNwhlv1JDNLqCdMetB9ji1wrqA84ZsPDXZAgY=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
        { id: '6', uri: 'https://media.istockphoto.com/id/2152193820/photo/fire-png-burning-flame-isolated-on-a-black-background.jpg?s=1024x1024&w=is&k=20&c=ypvaeZisl8b_sb0NLdRm_GFqrpKiOlvI-sK_ON-lCA4=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
        { id: '7', uri: 'https://media.istockphoto.com/id/494762400/photo/womans-hands-on-the-keyboard-of-the-piano-in-night.jpg?s=612x612&w=0&k=20&c=y14vShIODHuKYJ4pienHq7ZOsAor2bnzYh4uvXU8oQ8=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
        { id: '8', uri: 'https://media.istockphoto.com/id/980819208/photo/flautist.jpg?s=612x612&w=0&k=20&c=Tf7lN34DRrIR8riHKNbtqMNBclMJQvc7XkKcBL139fI=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
        { id: '9', uri: 'https://media.istockphoto.com/id/1481333687/photo/sunset-beach-and-silhouette-of-a-woman-in-a-lotus-pose-while-doing-a-yoga-exercise-by-the-sea.jpg?s=612x612&w=0&k=20&c=ICwCdh3kIQpyrkAQYaUqXlMUjTuwGmHZBSv6_cL1uRI=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
        { id: '10', uri: 'https://media.istockphoto.com/id/2152193820/photo/fire-png-burning-flame-isolated-on-a-black-background.jpg?s=1024x1024&w=is&k=20&c=ypvaeZisl8b_sb0NLdRm_GFqrpKiOlvI-sK_ON-lCA4=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
        { id: '11', uri: 'https://media.istockphoto.com/id/494762400/photo/womans-hands-on-the-keyboard-of-the-piano-in-night.jpg?s=612x612&w=0&k=20&c=y14vShIODHuKYJ4pienHq7ZOsAor2bnzYh4uvXU8oQ8=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
        { id: '12', uri: 'https://media.istockphoto.com/id/980819208/photo/flautist.jpg?s=612x612&w=0&k=20&c=Tf7lN34DRrIR8riHKNbtqMNBclMJQvc7XkKcBL139fI=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
        { id: '13', uri: 'https://media.istockphoto.com/id/1481333687/photo/sunset-beach-and-silhouette-of-a-woman-in-a-lotus-pose-while-doing-a-yoga-exercise-by-the-sea.jpg?s=612x612&w=0&k=20&c=ICwCdh3kIQpyrkAQYaUqXlMUjTuwGmHZBSv6_cL1uRI=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
        { id: '14', uri: 'https://media.istockphoto.com/id/494762400/photo/womans-hands-on-the-keyboard-of-the-piano-in-night.jpg?s=612x612&w=0&k=20&c=y14vShIODHuKYJ4pienHq7ZOsAor2bnzYh4uvXU8oQ8=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
        { id: '15', uri: 'https://media.istockphoto.com/id/980819208/photo/flautist.jpg?s=612x612&w=0&k=20&c=Tf7lN34DRrIR8riHKNbtqMNBclMJQvc7XkKcBL139fI=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
        { id: '16', uri: 'https://media.istockphoto.com/id/1481333687/photo/sunset-beach-and-silhouette-of-a-woman-in-a-lotus-pose-while-doing-a-yoga-exercise-by-the-sea.jpg?s=612x612&w=0&k=20&c=ICwCdh3kIQpyrkAQYaUqXlMUjTuwGmHZBSv6_cL1uRI=', audioUri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
    
    ];

    const headers = ['Relaxing Guitar Music', 'Nature Sounds', 'Music for Meditation', 'Relaxing Flute Music'];

    const playSound = async (audioUri) => {
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
            setIsPlaying(false);
        }

        const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
        setSound(newSound);

        newSound.setOnPlaybackStatusUpdate(status => {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
            if (status.didJustFinish) {
                setIsPlaying(false);
            }
        });

        await newSound.playAsync();
        setIsPlaying(true);
    };

    const handlePlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = async (value) => {
        if (sound) {
            await sound.setPositionAsync(value);
        }
    };

    const handleForward = async () => {
        if (sound) {
            const newPosition = Math.min(position + 15000, duration); // Skip forward 15 seconds
            await sound.setPositionAsync(newPosition);
            setPosition(newPosition);
        }
    };

    const handleBackward = async () => {
        if (sound) {
            const newPosition = Math.max(position - 15000, 0); // Skip backward 15 seconds
            await sound.setPositionAsync(newPosition);
            setPosition(newPosition);
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: 'Check out this amazing sound!',
                url: sound.audioUri, // Assuming sound.uri is available
            });
        } catch (error) {
            console.error('Error sharing: ', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => playSound(item.audioUri)}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.uri }} style={styles.image} />
            </View>
        </TouchableOpacity>
    );

    const renderRows = () => {
        return headers.map((header, rowIndex) => {
            const rowImages = images.slice(rowIndex * 4, rowIndex * 4 + 4); // Update to get the correct images
            return (
                <View key={header} style={styles.rowContainer}>
                    <Text style={styles.header}>{header}</Text>
                    <FlatList
                        data={rowImages}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                    />
                </View>
            );
        });
    };

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync(); // Cleanup the sound
        } : undefined;
    }, [sound]);

    return (
        <ImageBackground source='https://images.pexels.com/photos/1136575/pexels-photo-1136575.jpeg?auto=compress&cs=tinysrgb&w=600' style={styles.background}>
            <View style={styles.container}>
                {renderRows()}
                <View style={styles.controls}>
                    <TouchableOpacity onPress={like}>
                        <AntDesign name="heart" size={24} color={liked ? "#FF4E88" : "white"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleBackward}>
                        <AntDesign name="stepbackward" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause}>
                        <Feather name={isPlaying ? "pause" : "play"} size={24} color="white" />
                    </TouchableOpacity>
                   
                    <TouchableOpacity onPress={handleForward}>
                        <AntDesign name="stepforward" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={shuffle}>
                        <Ionicons name="shuffle" size={32} color={shuffled ? "#6EC207" : "white"} />
                    </TouchableOpacity>
                </View>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    onValueChange={handleSeek}
                />
                <TouchableOpacity onPress={handleShare}>
                    <Entypo name="share" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 16,
        marginTop:10
    },
    rowContainer: {
        marginBottom: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color:'white'
    },
    imageContainer: {
        marginRight: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    slider: {
        width: '100%',
        height: 40,
    },
});

export default SleepView;
