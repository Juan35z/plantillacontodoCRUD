import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity, TextInput, Alert } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";
function InventarioScreen() {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [unidad, setUnidad] = useState('');
  const [gramos, setGramos] = useState('');
  const [precio, setPrecio] = useState('');
  const [producto, setProducto] = useState(null);
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const limpiarCampos = () => {
    setCodigo('');
    setNombre('');
    setUnidad('');
    setGramos('');
    setPrecio('');
    setProducto(null);
    setProductoEncontrado(null);
  };
  const agregarProducto = async() => {
    try {
        const response = await fetch('https://mi-api.com.mx/API.php?action=productos', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          codigo,
          nombre,
          unidad,
          gramos,
          precio,
        }),
      });
      const data =await response.json();
      Alert.alert('Exito', `Producto agregado correctamente`);
      limpiarCampos();
    } catch(error) {
      console.error(error);
      Alert.alert('Codigo vacio', 'Completa todos los campos antes de continuar');
    }
  };
  const buscarProducto = async () => {
     if(!codigo) {
      Alert.alert('Codigo vacio', 'Ingresa un codigo antes de buscar');
      return;
    }
    try {
      const response = await fetch(`https://mi-api.com.mx/API.php?action=productos/${codigo}`);
      if (!response.ok) {
        if(response.status === 404) {
          Alert.alert('No encontrado', 'Producto no encontrado');
        } else {
          Alert.alert('Error', 'Error en la búsqueda');
        }
        return;
      }
      const data = await response.json();
      setProductoEncontrado(data);
      setNombre(data.nombre);
      setUnidad(data.unidad);
      setGramos(data.gramos);
      setPrecio(data.precio);
      Alert.alert('Éxito', `Producto encontrado: ${data.nombre}`);
    } catch (error) {
      console.error('Error al buscar el producto', error);
      Alert.alert('Error', 'No se pudo buscar el producto');
    }
  };
  const modificarProducto = async() => {
    try{
      const response = await fetch(`https://mi-api.com.mx/API.php?action=productos/${codigo}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          nombre,
          unidad,
          gramos,
          precio,
        }),
      });
      const data = await response.json();
      Alert.alert('Exito', data.message);
      limpiarCampos();
    } catch(error) {
      console.error(error);
      Alert.alert('Error', error.message || 'No se pudo modificar el producto');
    }
  };
  const eliminarProducto = async() => {
    if(!codigo) {
      Alert.alert('Codigo vacio', 'Ingresa o busca un codigo antes de eliminar')
    }
    console.log("Codigo a eliminar:", codigo);
    try{
      const response = await fetch(`https://mi-api.com.mx/API.php?action=productos/${codigo}`, {
        method: 'DELETE'
      });
      if (response.status ===404) {
        Alert.alert('No encontrado', 'Producto no encontrado');
      } else {
        const data = await response.json();
        Alert.alert('Éxito', data.message);
        setProducto (null);
        setCodigo('');
        setNombre('');
        setUnidad('');
        setGramos('');
        setPrecio('');
      }
    } catch(error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo eliminar el producto')
    }
  };
  return(
        <View style={styles.container}>
            <Text style={styles.title}>Inventario</Text>
        <TextInput
        style={styles.input}
        placeholder="Codigo del producto"
        value={codigo}
        onChangeText={setCodigo}
        />
        <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
        />
        <TextInput
        style={styles.input}
        placeholder="Unidad del producto"
        value={unidad}
        onChangeText={setUnidad}
        keyboardType="numeric"
        />
        <TextInput
        style={styles.input}
        placeholder="Gramos del producto"
        value={gramos}
        onChangeText={setGramos}
        keyboardType="numeric"
        />
        <TextInput
        style={styles.input}
        placeholder="Precio del producto"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={agregarProducto}>
            <Ionicons name='save-outline' size={24} color='white'/>
            <Text style={styles.additionalText}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={buscarProducto}>
            <Ionicons name='search-outline' size={24} color='white'/>
            <Text style={styles.additionalText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={modificarProducto}>
            <Ionicons name='create-outline' size={24} color='white'/>
            <Text style={styles.additionalText}>Modificar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={eliminarProducto}>
            <Ionicons name='trash-outline' size={24} color='white'/>
             <Text style={styles.additionalText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
        </View>
  );
}
function VentasScreen() {
    const [Codigo, setCodigo] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Unidad, setUnidad] = useState('');
    const [Gramos, setGramos] = useState('');
    const [Precio, setPrecio] = useState('');
    const [producto, setProducto] = useState(null);
    const [productoEncontrado, setProductoEncontrado] = useState(null);
    const limpiarCampos = () => {
      setCodigo('');
      setNombre('');
      setUnidad('');
      setGramos('');
      setPrecio('');
      setProducto(null);
      setProductoEncontrado(null);
    };
    const agregarVenta = async() => {
      try {
        const response = await fetch('https://mi-api.com.mx/API.php?action=ventas', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            Codigo,
            Nombre,
            Unidad,
            Gramos,
            Precio,
          }),
        });
        const data = await response.json();
        Alert.alert('Exito', `Producto agregado correctamente`);
        limpiarCampos();
      } catch (error) {
        console.error(error);
        Alert.alert('Codigo vacio', 'Completa todos los campos antes de continuar');
      }
    };
    const buscarVenta = async() => {
      if(!Codigo) {
        Alert.alert('Codigo vacio', 'Ingresa un codigo antes de buscar');
        return;
      }
      try{
       const response = await fetch(`https://mi-api.com.mx/API.php?action=ventas/${Codigo}`);
        if(!response.ok) {
          if(response.status === 404) {
            Alert.alert('No encontrado', 'Producto no encontrado')
          } else {
            Alert.alert('Error', 'Error en la búsqueda');
          }
          return;
        }
        const data = await response.json();
        setProductoEncontrado(data);
        setNombre(data.Nombre);
        setUnidad(data.Unidad);
        setGramos(data.Gramos);
        setPrecio(data.Precio);
        Alert.alert('Éxito', `Producto encontrado: ${data.Nombre}`);
      } catch (error) {
        console.error('Error al buscar el producto', error);
        Alert.alert('Error', 'No se pudo buscar el producto');
      }
    };
const modificarVenta = async() => {
      try {
        const response = await fetch(`https://mi-api.com.mx/API.php?action=ventas/${Codigo}`, {
          method: 'PUT',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            Nombre,
            Unidad,
            Gramos,
            Precio,
          }),
        });
        const data = await response.json();
        Alert.alert('Exito', 'Producto modificado correctamente');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message || 'No se pudo modificar el producto');
      }
    };
    const eliminarVenta = async() => {
       if(!Codigo) {
        Alert.alert('Codigo vacio', 'Ingresa o busca un codigo antes de eliminar')
      }
      console.log("Codigo a eliminar:", Codigo);
      try {
        const response = await fetch(`https://mi-api.com.mx/API.php?action=ventas/${Codigo}`, {
          method: 'DELETE'
        });
        if (response.status === 404) {
          Alert.alert('No encontrado', 'Producto no encontrado');
        } else {
          const data = await response.json();
          Alert.alert('Éxito', data.message);
          setProducto(null);
          setCodigo('');
          setNombre('');
          setUnidad('');
          setGramos('');
          setPrecio('');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo eliminar el producto');
      }
    };
    return(
          <View style={styles.container}>
            <Text style={styles.title}>Ventas</Text>
        <TextInput
        style={styles.input}
        placeholder='Codigo del producto'
        value={Codigo}
        onChangeText={setCodigo}
        />
        <TextInput
        style={styles.input}
        placeholder='Nombre del producto'
        value={Nombre}
        onChangeText={setNombre}
        />
        <TextInput
        style={styles.input}
        placeholder='Unidad del producto'
        value={Unidad}
        onChangeText={setUnidad}
        keyboardType="numeric"
        />
        <TextInput
        style={styles.input}
        placeholder='Gramos del producto'
        value={Gramos}
        onChangeText={setGramos}
        keyboardType="numeric"
        />
        <TextInput
        style={styles.input}
        placeholder='Precio del producto'
        value={Precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={agregarVenta}>
            <Ionicons name='save-outline' size={24} color='white'/>
            <Text style={styles.additionalText}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={buscarVenta}>
            <Ionicons name='search-outline' size={24} color='white'/>
            <Text style={styles.additionalText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={modificarVenta}>
            <Ionicons name='create-outline' size={24} color='white'/>
            <Text style={styles.additionalText}>Modificar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={eliminarVenta}>
            <Ionicons name='trash-outline' size={24} color='white'/>
            <Text style={styles.additionalText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
          </View>
      );
    }
      function AyudaScreen() {
        const handlePress=()=> {
            Linking.openURL('https://drive.google.com/drive/folders/1tQ52Yy1NTXgHPUJUAsebQ7iKVb5_HSWV?usp=sharing')
        };
        return(
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manual de Usuario</Text>
      <Text style={styles.content}>
        En la pantalla de inventario tienes cinco espacios 
donde de acuerdo a lo que dice vas a meter, como el nombre, 
codigo, precio, etc... 
        tienes 4 botones que te ayudan, cada nombre es lo que 
hace, con los espacios y los botones vas a poder llevar el 4
inventario
        {"\n\n"}
        Al igual que el inventario, tienes cinco espacios 
donde vas a meter lo que te piden, pero esta vez es para 
registrar las ventas
        en este caso tienes 4 botones donde te ayudaran a 
registrar las ventas
        {"\n\n"}
        Aqui esta el manual de usuario para ayudarte mejor ya 
que en este espacio no podre explicarte todo, aqui es para 
recordar pequeñas cosas:
      </Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.link}>Aqui esta el manual</Text>
      </TouchableOpacity>
    </ScrollView>
  );
      }
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
    tabBarStyle: {
      backgroundColor: '#F8BE00', // ✔ pone el mismo color que tu fondo
      borderTopWidth: 0,          // ✔ quita línea gris
      elevation: 0,               // ✔ sombra en Android OFF
    },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inventario') {
            iconName = focused ? 'folder' : 'folder-outline';
          } else if (route.name === 'Ventas') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inventario" component={InventarioScreen} />
      <Tab.Screen name="Ventas" component={VentasScreen} />
    </Tab.Navigator>
  );
}
const DrawerNav = createDrawerNavigator();
export default function InventarioTabs() {
    return(
      <DrawerNav.Navigator  
        screenOptions={{
          headerStyle: {
            backgroundColor: "#5E1BFA",
          },
          headerTintColor: "#fff",
          drawerActiveTintColor: "#F8BE00",
          drawerInactiveTintColor: "#999",
          drawerStyle: {
            backgroundColor: "#7135FB",
          },
        }}
      >
        <DrawerNav.Screen
          name="Home"
          component={TabNavigator}
          options={{
            title: "Admin",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        <DrawerNav.Screen
          name="Ayuda"
          component={AyudaScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="help-circle" size={size} color={color} />
            ),
          }}
        />
      </DrawerNav.Navigator>
);
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F8BE00',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 40,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2B2B2B',
  },
    content: {
        fontSize: 16,
        color: '#2B2B2B',
        textAlign: 'justify',
    },
    link: {
        fontSize: 16,
        color: '#0000EE',
        textDecorationLine: 'underline',
        marginTop: 20,
    },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4A00F8",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    height: 70,
  },
  additionalText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});