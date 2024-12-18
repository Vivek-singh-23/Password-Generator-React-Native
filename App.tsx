import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useState } from 'react';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should me min of 4 characters')
    .max(16, 'Should me min of 16 characters')
    .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '~!@#$%^&*_-+=';

    if (upperCase) {
      characterList += upperCaseChars;
    }

    if (lowerCase) {
      characterList += lowerCaseChars;
    }

    if (numbers) {
      characterList += digitChars;
    }

    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);

      result += characters.charAt(characterIndex);
    }

    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={values=>{
          generatePasswordString( Number(values.passwordLength))
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleBlur,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
          <View style={styles.inputWrapper}>
            <View style={styles.inputColumn}>
              
              <Text style={styles.heading}>Password Length</Text>
              {touched.passwordLength && errors.passwordLength && (
                <Text style={styles.errorText}>
                  {errors.passwordLength}
                </Text>
              ) }
              <TextInput
              style={styles.inputStyle}
              value={values.passwordLength}
              onChangeText={handleChange('passwordLength')}
              placeholder="Ex. 8"
              keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.heading}>
            <Text style={styles.includeText}>
              Include lowercase
            </Text>
            <BouncyCheckbox
              // disableBuiltInState
              ischecked={lowerCase}
              onPress={()=> setLowerCase(!lowerCase)}
              fillColor='#29AB87'
            />
          </View>

          <View style={styles.heading}>
            <Text>
              Include upperCase
            </Text>
            <BouncyCheckbox
              // disableBuiltInState
              ischecked={lowerCase}
              onPress={()=> setUpperCase(!upperCase)}
              fillColor='#29AB87'
            />
          </View>

          <View style={styles.heading}>
            <Text>
              Include Numbers
            </Text>
            <BouncyCheckbox
              // disableBuiltInState
              ischecked={lowerCase}
              onPress={()=> setNumbers(!numbers)}
              fillColor='#29AB87'
            />
          </View>

          <View style={styles.heading}>
            <Text>
              Include Symbols
            </Text>
            <BouncyCheckbox
              // disableBuiltInState
              style={styles.checkBox}
              ischecked={lowerCase}
              onPress={()=> setSymbols(!symbols)}
              fillColor='#29AB87'
            />
          </View>


          <View style={styles.formActions}>
            <TouchableOpacity disabled={!isValid}
            style={styles.primaryBtn}
            onPress={handleSubmit}
            ><Text style={styles.primaryBtnTxt}>Generate Password
              </Text></TouchableOpacity>
            <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={()=>{
              handleReset();
              resetPasswordState();
            }}><Text style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>
          </View>
         </>
       )}
     </Formik>
        </View>

        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Added a background color for better contrast.
  },
  formContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2, // Slight elevation for better visibility.
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16213E',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#16213E',
    textAlign: 'center',
  },
  description: {
    color: '#758283',
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  heading: {
    fontSize: 16,
    flex:1,
    flexDirection:'row',
    fontWeight: '600',
    marginBottom: 10,
    color: '#16213E',
    // justifyContent: 'center',
    alignItems:'center',
  },


  inputWrapper: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputColumn: {
    flex: 1,
  },
  inputStyle: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#16213E',
    fontSize: 16,
    color: '#000',
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 12,
    color: '#FF0D10',
    marginTop: 4,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  primaryBtn: {
    width: 140,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#29AB87',
    alignItems: 'center',
  },
  primaryBtnTxt: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryBtn: {
    width: 140,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
    alignItems: 'center',
  },
  secondaryBtnTxt: {
    color: '#16213E',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  cardElevated: {
    elevation: 3,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  generatedPassword: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#16213E',
    marginTop: 8,
  },
});

