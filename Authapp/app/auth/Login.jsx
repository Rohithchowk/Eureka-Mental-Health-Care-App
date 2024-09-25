import React, { useEffect } from "react"; // Import useEffect
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
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
    <View style={styles.container}>
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
    </View>
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
