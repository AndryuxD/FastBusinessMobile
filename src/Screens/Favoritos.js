import React, { Component } from 'react'
import { Text, View, StyleSheet, Modal } from 'react-native';
import { Button } from "react-native-paper"

export default class app extends Component {

  constructor(){
    super();
    this.state={
      show: false
    }
  }

  render() {
    return (
      <View style={styles.vista}>
        <Text style={ styles.texuwu}>PREGUNTAS FRECUENTES</Text>
        <View>
          <Button style ={ styles.espa}  mode="contained" onPress={()=> this.setState( {show:true})}>¿Como cambiar la Contraseña?</Button>
          <Modal  transparent={true} visible={this.state.show} >
            <View style={styles.vistamodal}> 
              <View style={styles.vimodal} >
                <Text style={ styles.texto}>HUHIHI </Text>
                <Button style={styles.btn} mode="contained" onPress={()=> this.setState( {show:false})}>Cerrar uwu</Button>
              </View>
            </View>
          </Modal>
        </View>
        <View>
          
          <Button style ={ styles.espa}  mode="contained" onPress={()=> this.setState( {show:true})}>¿Como cambiar la ?</Button>
          <Modal  transparent={true} visible={this.state.show} >
            <View style={styles.vistamodal}> 
              <View style={styles.vimodal}>
                <Text style={ styles.texto}>XXDXD</Text>
                <Button style={styles.btn} mode="contained" onPress={()=> this.setState( {show:false})}>Cerrar</Button>
              </View>
            </View>
          </Modal>
        </View>
        
      </View>
    )
  }
}

const styles= StyleSheet.create({
  vista:{
    flex: 1,
    marginTop: 50,
  },
  texuwu:{
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
  },
  texto:{
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
    
  }, 
  vistamodal:{
    flex: 1,
    maxHeight: "70%"
  },
  vimodal:{
    backgroundColor: "#FFFAFA",
    margin: 50,
    padding:40,
    borderRadius: 10,
    flex: 1,
  },
  espa:{
    marginBottom: 22,
    backgroundColor: "#4169E1",
  }, 
  btn:{
    backgroundColor: "#1E90FF",
  }
})
