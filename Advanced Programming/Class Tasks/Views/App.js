import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.vertbox}>
          <View style={[colors.red, styles.smallbox ]}>
            <Text style={styles.paragraph}>
              red
            </Text>
          </View>

          <View style={[colors.green, styles.smallbox ]}>
            <Text style={styles.paragraph}>
              green
            </Text>
          </View>

          <View style={[colors.blue, styles.smallbox ]}>
            <Text style={styles.paragraph}>
              blue
            </Text>
          </View>

        </View>

        <View style={styles.vertbox}>
          <View style={[colors.red, styles.smallbox ]}>
            <Text style={styles.paragraph}>
              red
            </Text>
          </View>

          <View style={[colors.green, styles.smallbox ]}>
            <Text style={styles.paragraph}>
              green
            </Text>
          </View>

          <View style={[colors.blue, styles.smallbox ]}>
            <Text style={styles.paragraph}>
              blue
            </Text>
          </View>

        </View>

      </View>
    );
  }
}

const colors = StyleSheet.create({
  red: {
    backgroundColor:"red"
  },

  green: {
    backgroundColor:"green"
  },

  blue: {
    backgroundColor:"blue"
  },

});
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#ecf0f1',
    border: "1px solid black",
    flexDirection:"row",
    
  },
  vertbox: {
    flex: 1,
    padding: 12,
    backgroundColor: '#d3d3d3',
    border: "1px solid black",
    flexDirection:"column",
    margin: 5
  },
  smallbox:{
    justifyContent: 'center',
    padding: 12,
    border: "1px solid black",
    height: 100,
    margin: 3
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
