import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import Bodeguero from './screens/Bodeguero';
import Trabajador from './screens/Trabajador';
import InventarioTabs from './screens/InventarioTabs';
const Stack = createNativeStackNavigator();
function IniciarSesion({navigation}) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
   const [adminUsuario, setAdminUsuario] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [nuevoUsuario, setNuevoUsuario] = useState('');
  const [nuevoPass, setNuevoPass] = useState('');
  const [nuevoRol, setNuevoRol] = useState('');
  const [mostrarCampos, setMostrarCampos] = useState('');
  const URL = "https://mi-api.com.mx/login.php"
  const handleLogin = async () => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          operacion: 'login',
          usuario,
          contrasena,
        }),
      });
      const data = await response.json();
      if(data.success) {
        const rol = data.rol.toLowerCase();
        switch (rol) {
          case 'admin':
            navigation.navigate('InventarioTabs');
            break;
            case 'bodeguero':
            navigation.navigate('Bodeguero');
            break;
            case 'trabajador':
              navigation.navigate('Trabajador');
              break;
              default:
                Alert.alert("Error", "Rol no reconocido");
        }
      } else {
        Alert.alert('Error', data.message);
      }
    } catch(error) {
      Alert.alert('Error de red', error.message);
    }
  };
  const handleRegistrarUsuario = async() => {
    try{
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          operacion: 'agregar_usuario',
          admin: adminUsuario,
          admin_pass: adminPass,
          nuevo_usuario: nuevoUsuario,
          nuevo_contrasena: nuevoPass,
          rol: nuevoRol,
        }),
      });
      const json = await response.json();
      if(json.success) {
        Alert.alert("Éxito", json.message);
        setAdminUsuario('');
        setAdminPass('');
        setNuevoUsuario('');
        setNuevoPass('');
        setNuevoRol('');
        setMostrarCampos(false);
      } else {
        Alert.alert("Error", json.message)
      }
    } catch(error) {
      Alert.alert("Error de red", error.message)
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
      style={styles.input}
      placeholder='Nombre del usuario'
      value={usuario}
      onChangeText={setUsuario}
      />
      <TextInput
      style={styles.input}
      placeholder='Contraseña del usuario'
      value={contrasena}
      onChangeText={setContrasena}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setMostrarCampos(!mostrarCampos)}>
        <Text style={styles.link}>Registrar nuevo usuario</Text>
      </TouchableOpacity>
      {mostrarCampos && (
        <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '%80'}}>
          <TextInput
          style={[styles.input, {flex: 1, marginRight: 5 }]}
          placeholder='Usuario del admin'
          value={adminUsuario}
          onChangeText={setAdminUsuario}
          />
          <TextInput
          style={styles.input}
          placeholder='Contraseña del admin'
          value={adminPass}
          onChangeText={setAdminPass}
          />
          </View>
          <TextInput
          style={styles.input}
          placeholder='Nombre del nuevo usuario'
          value={nuevoUsuario}
          onChangeText={setNuevoUsuario}
          />
          <TextInput
          style={styles.input}
          placeholder='Contraseña del nuevo usuario'
          value={nuevoPass}
          onChangeText={setNuevoPass}
          />
          <TextInput
          style={styles.input}
          placeholder='Rol del nuevo usuario (trabajador/bodeguero)'
          value={nuevoRol}
          onChangeText={setNuevoRol}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegistrarUsuario}>
            <Text style={styles.buttonText}>Registrar Usuario</Text>
          </TouchableOpacity>
          </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='IniciarSesion' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='IniciarSesion' component={IniciarSesion}/>
        <Stack.Screen name='InventarioTabs' component={InventarioTabs}/>
        <Stack.Screen name='Bodeguero' component={Bodeguero}/>
        <Stack.Screen name='Trabajador' component={Trabajador}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8BE00',
    padding: 20,
    paddingTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2B2B2B',
  },
  input: {
    borderWidth: 1,
    marginVertical: 5,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 8
  },
  button: {
    backgroundColor: '#4A00F8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: '70%',
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  link: {
    fontSize: 16,
    color: '#4A00F8',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
