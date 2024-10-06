
<h1 align="center">
  <br>
  <a href=""><img src="https://framerusercontent.com/images/P0dKPcpigYABpDCmkzNJLOdEFU.png" width="300" height= "300" marginTop="-50"></a>
</h1>

<h4 align="center">A Real-time Android App that helps for Student's and Employees Mental Health care.</h4>
<h6 align="center">Note: The repo also contains AI enabled codes but we have'nt integrated in the Wincibl App, due to deployment issues. But you can view them separately</h6>

<p align="center">
  
  <a href="https://mulberry-calendula-c8e.notion.site/CBIT-MANAGEMENT-IN4882b3934c377745f79b">Documentation</a> 
  
</p>

## PROJECT DESCRIPTION

This is a App that we built, when we've  participated in T-hub hackthon coducted by Wincibl (Doctorite.ai)


## TECHNOLOGIES USED
### For Frontend

* React-Native
* Redux for State Management

### For Backend
* Node.js
* Express.js
* MongoDB

### AI& ML
* Gemini API
* Regression Model


## CORE FEATURES 

<img src="https://github.com/Rohithchowk/Eureka-Mental-Health-Care-App/blob/main/Flow%20Diagram.png?raw=true" alt="Flow Diagram" height="400" width="500"></img>

<h2>1.Genrating Health Score frequently with Alexa based Model</h2>

* User Interaction
Users engage in conversations with the Alexa-powered virtual assistant, answering questions related to their daily activities, mood, stress levels, and overall health.
Alexa may ask questions like:
"How are you feeling today?"
"How much physical activity did you get?"
"Did you experience any stress?"
"How was your energy level at work or school?"

* Data Collection Alexa collects user responses, including tone and voice pitch, and sends them to AWS Lambda for initial processing to extract mood, stress, and activity data.

* Data Storage Processed data is stored in DynamoDB to track user health information over time, enabling historical analysis.

* Data Processing & Sentiment Analysis Lambda processes stored data, using NLP to assess sentiment and voice features, gaining insights into the user’s mental health.

* Health Score Generation The processed data is passed to an ML model, generating a health score (1-100) based on mood, activity, and stress indicators, reflecting overall wellness.

* Score Storage & Feedback The score is stored in DynamoDB, and Alexa provides immediate feedback with wellness tips or recommendations.

* Integration with General Health Score The Alexa-based score integrates with the app’s general health score, offering personalized daily activities and recommendations.

* Future Recommendations & Insights The system learns from ongoing data to improve assessments, using the combined health score for future wellness suggestions and doctor consultations.


<h2> 2.Google Fit Integration</h2>
<img src="https://developers.google.com/static/fit/images/arch_rest.png" alt="google-fit api" width="400" height="300"></img>
 *  The app integrates seamlessly with the Google Fit API, allowing it to collect data from your Google Fit watch. By analyzing this data, the app provides a comprehensive physical and mental health score, offering insights into your overall well-being based on your activity levels, heart rate, sleep patterns, and more. This feature helps you stay informed about your health and make improvements where needed.


## FEATURES

* **Login and SignUp Screens** - Users can sign up and log in to their accounts seamlessly. We've implemented React-Redux for efficient state management, ensuring smooth handling of different user sessions and personalized experiences.
  
* **Music** - The app features a Music section that includes a variety of general music, as well as calming tones and binaural beats designed to promote relaxation and focus. Whether you're looking for everyday tunes or peaceful sounds to enhance your mental well-being, this feature has something for everyone.
  
* **Meditation& Yoga** - The app offers a Meditation & Yoga section with 50+ yoga asanas, each with descriptions highlighting their health benefits. Whether for flexibility, stress relief, or overall well-being, this feature provides guided practices to support both physical and mental health.

* **Initial Analysis** The app begins with an **initial questionnaire** focused on key areas such as today's physical activity, screen time, food habits, mood, stress level, energy at school/work, progress on goals, and age. Based on the user's responses, a **health score** between **1-100** is generated—higher scores indicate better health. This score serves multiple purposes:
  - Suggesting personalized daily activities.
  - Being shared with a doctor when the user books an appointment.
  - Forming the foundation for future recommendations and customized app features to improve overall well-being.


* **Daily Activities**  The previously generated health score is then mapped to the score retrieved from the **Alexa-based model**. This model analyzes the user's emotional and mental health through conversational data collected via Alexa, including mood, stress, and energy levels. By combining both scores—one based on the initial questionnaire and the other from Alexa's insights—we create a more comprehensive understanding of the user's overall health. This combined score is used to further tailor personalized recommendations, suggest daily activities, and offer more accurate insights when interacting with healthcare professionals.

* **Games**  The app includes a variety of brain-boosting games like **Sudoku, Tower of Hanoi**, and more, designed to enhance mental sharpness, problem-solving, and relaxation. These games offer fun and engaging ways to stimulate the mind and support mental wellness.

* **Doctor Appointment**  The app features a **Doctor Appointment** option, allowing users to book appointments based on available dates and time slots. Users can choose between **in-person** and **virtual meetings**. For virtual consultations, we've implemented a **video call feature** to ensure seamless communication with healthcare professionals from the comfort of their homes.

* **User Profile Feature** The app includes a User Profile tab that generates insightful graphs to visualize the user's daily, weekly, and monthly activities. These graphs help users assess their productivity levels and mental well-being, indicating whether they are feeling productive or experiencing depression. The plotted points are derived from the health scores generated based on the **Alexa conversations and the general health assessment**, providing a comprehensive overview of the user's health journey.








