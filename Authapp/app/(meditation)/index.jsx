import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const MeditationGuide = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Meditation Guide</Text>
            
            <Text style={styles.subtitle}>What is Meditation?</Text>
            <Text style={styles.content}>
                Meditation is a practice where an individual uses a technique  such as mindfulness, or focusing the mind on a particular object, thought, or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state.
            </Text>

            <Image
                source={{ uri: 'https://example.com/meditation_image.jpg' }} // Replace with your image URL
                style={styles.image}
                resizeMode="cover"
            />

            <Text style={styles.subtitle}>Benefits of Meditation</Text>
            <Text style={styles.content}>
                Regular meditation can provide numerous benefits, including:
            </Text>
            <Text style={styles.list}>
                - Reducing stress and anxiety{"\n"}
                - Improving focus and concentration{"\n"}
                - Enhancing emotional health{"\n"}
                - Increasing self-awareness{"\n"}
                - Promoting better sleep{"\n"}
            </Text>

            <Text style={styles.subtitle}>Proper Posture for Meditation</Text>
            <Text style={styles.content}>
                Maintaining the right posture during meditation is essential for maximizing the benefits. Here are some tips for proper meditation posture:
            </Text>
            <Text style={styles.list}>
                - Sit comfortably on a chair or cushion, ensuring your back is straight but not rigid.{"\n"}
                - Keep your hands resting on your knees or in your lap, palms facing up or down.{"\n"}
                - Close your eyes gently or keep them slightly open with a soft gaze.{"\n"}
                - Relax your shoulders and take deep breaths.{"\n"}
            </Text>

            <Image
                source={{ uri: 'https://example.com/posture_image.jpg' }} // Replace with your image URL
                style={styles.image}
                resizeMode="cover"
            />

            <Text style={styles.subtitle}>Meditation Guide Video</Text>
            <Video
                source={{ uri: 'https://example.com/meditation_video.mp4' }} // Replace with your video URL
                style={styles.video}
                controls
                resizeMode="contain"
            />

            <Text style={styles.subtitle}>Tips for Successful Meditation</Text>
            <Text style={styles.content}>
                Here are some tips to help you maintain a successful meditation practice:
            </Text>
            <Text style={styles.list}>
                - Start with short sessions, gradually increasing the duration as you become more comfortable.{"\n"}
                - Find a quiet space free from distractions.{"\n"}
                - Set a regular time for your meditation practice.{"\n"}
                - Be patient and gentle with yourself; it’s normal for thoughts to wander.{"\n"}
            </Text>

            <Text style={styles.subtitle}>Conclusion</Text>
            <Text style={styles.content}>
                Meditation is a powerful tool that can help improve your mental and emotional well-being. By incorporating proper posture and consistent practice, you can cultivate a deeper sense of awareness and peace in your daily life.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#e8f5e9',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2e7d32',
    },
    subtitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        color: '#388e3c',
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
        color: '#424242',
    },
    list: {
        fontSize: 16,
        lineHeight: 24,
        marginLeft: 10,
        marginBottom: 10,
        color: '#424242',
    },
    image: {
        width: width - 40,
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    video: {
        width: width - 40,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
});

export default MeditationGuide;
