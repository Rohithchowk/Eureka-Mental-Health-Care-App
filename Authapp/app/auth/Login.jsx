import React, { useEffect } from "react"; // Import useEffect
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../(services)/api/api";
import { loginUserAction } from "../(redux)/authSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Setting up the mutation
  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await loginUser(values);
      if (response.status === 'error' || response?.message === 'invalid credentials') {
        throw new Error(response?.message || 'Invalid credentials');
      }
      return response;
    },
    mutationKey: ['login'],
  });

  // Reset mutation state when component mounts
  useEffect(() => {
    mutation.reset();
  }, [mutation]);

  return (
    // <View style={styles.container}>
      <ImageBackground source={{uri:"data:image/jpeg;base64,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"}} style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Display error message */}
      {mutation?.isError && (
        <Text style={styles.errorText}>
          {mutation?.error?.message?.data || "An error occurred"}
        </Text>
      )}

      {/* Display success message */}
      {mutation?.isSuccess && (
        <Text style={styles.successText}>Logged in Successfully</Text>
      )}

      <Formik
        initialValues={{ email: "rochowki@gmail.com", password: "Rohith@123" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log("Form values:", values);

          mutation
            .mutateAsync(values)
            .then((data) => {
              console.log("Login successful:", data);
              dispatch(loginUserAction(data));
              router.push("/(tabs)");
            })
            .catch((error) => {
              console.error("Login error:", error.message);
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={mutation?.isLoading}
            >
              {mutation?.isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      </ImageBackground>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  successText: {
    color: "green",
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
