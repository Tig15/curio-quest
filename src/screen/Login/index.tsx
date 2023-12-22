import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../asset/color/color';

const windowWidth = Dimensions.get('window').width;

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = ({navigation}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values: {email: string; password: string}) => {
    try {
      await auth().signInWithEmailAndPassword(values.email, values.password);
      navigation.replace('Home');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../asset/image/curioquest-bg.png')}
      style={styles.backgroundImage}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.logContainer}>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={handleLogin}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <View style={{height: windowWidth * 0.19}}>
                  <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="Email"
                    style={styles.input}
                  />
                  {touched.email && errors.email && (
                    <View style={{position: 'absolute', bottom: 0}}>
                      <Text style={styles.error}>{errors.email}</Text>
                    </View>
                  )}
                </View>

                <View style={{height: windowWidth * 0.19}}>
                  <View style={styles.passwordInput}>
                    <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      style={styles.passwordField}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}>
                      <MaterialIcons
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={24}
                        color={COLORS.neutral}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <View style={{position: 'absolute', bottom: 0}}>
                      <Text style={styles.error}>{errors.password}</Text>
                    </View>
                  )}
                </View>

                <View style={{marginTop: 2}}>
                  <Button
                    onPress={handleSubmit}
                    title="Login"
                    color={COLORS.primary}
                  />
                </View>
                <TouchableOpacity
                  style={{marginTop: 12, alignSelf: 'center'}}
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text>Don't Have any Account? Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.light_primary,
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    height: windowWidth * 0.9,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  input: {
    width: windowWidth * 0.8,
    borderColor: COLORS.dark_border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.dark_border,
    marginBottom: 10,
    borderRadius: 8,
  },
  passwordField: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginBottom: 5,
    marginLeft: 4,
  },
});

export default LoginForm;
