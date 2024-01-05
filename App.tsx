import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import Animated, { RollInLeft, RollOutRight } from 'react-native-reanimated'
import { SafeAreaProvider } from "react-native-safe-area-context"

const BackgroundImage = require('./assets/bg.png')
const SheepImage = require('./assets/sheep.png')

type TButtonState = {
  title: string;
  onPress?: () => void;
  isNumeric?: boolean;
}

export default function App() {

  const [input, setInput] = useState<number>(0)
  const [sheep, setSheep] = useState<number>(1)

  const Buttons: TButtonState[] = [
    { title: '1', isNumeric: true },
    { title: '2', isNumeric: true },
    { title: '3', isNumeric: true },

    { title: '4', isNumeric: true },
    { title: '5', isNumeric: true },
    { title: '6', isNumeric: true },

    { title: '7', isNumeric: true },
    { title: '8', isNumeric: true },
    { title: '9', isNumeric: true },

    { title: 'x', onPress: () => setInput(0) },
    { title: '0', isNumeric: true },
    { title: 'ok', onPress: () => { if (input === sheep) { setSheep(sheep + 1); setInput(0) } } },
  ]

  return (
    <SafeAreaProvider>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={{ height: 450, alignItems: 'center', justifyContent: 'center' }}>
            {sheep % 2 == 0 ? <Animated.Image key={1} source={SheepImage} style={{ width: 196, resizeMode: 'contain' }} entering={RollInLeft} exiting={RollOutRight} /> : <Animated.Image key={2} source={SheepImage} style={{ width: 196, resizeMode: 'contain' }} entering={RollInLeft} exiting={RollOutRight} />}
          </View>
          <View style={styles.keypad}>
            <View style={styles.input_box}>
              <Text style={styles.text}>{input}</Text>
            </View>
            <FlatList numColumns={3} data={Buttons} keyExtractor={(_, index) => index.toString()} scrollEnabled={false} renderItem={({ item: b }) => (
              <TouchableOpacity onPress={b.isNumeric === true ? () => setInput((input * 10) + parseInt(b.title)) : b.onPress} >
                <View style={styles.keypad_btn}>
                  <Text style={styles.text}>{b.title}</Text>
                </View>
              </TouchableOpacity>
            )} />

          </View>
        </View>
      </ImageBackground >
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  keypad: {
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center'
  },
  keypad_btn: {
    width: 96,
    backgroundColor: '#345feb',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10
  },
  text: {
    color: 'white'
  },
  input_box: {
    width: (96 * 3) + 40,
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#345feb',
  }
});
