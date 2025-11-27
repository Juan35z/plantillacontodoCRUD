import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
export default function Trabajador() {
  const [Codigo, setCodigo] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Unidad, setUnidad] = useState('');
  const [Gramos, setGramos] = useState('');
  const [Precio, setPrecio] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [pagoCliente, setPagoCliente] = useState('');
  const total = carrito.reduce((sum, item) => sum + item.subtotal, 0);
  const cambio = parseFloat(pagoCliente || 0) - total;
  const agregarVenta = async() => {
    if(!Codigo || !Unidad || !Gramos || !Precio) {
      Alert.alert('Faltan datos');
      return;
    }
    const nuevo = {
      Codigo,
      Nombre,
      Unidad,
      Gramos,
      Precio: parseFloat(Precio),
      subtotal: parseFloat(Precio) * parseInt(Unidad),
    };
    setCarrito([...carrito, nuevo]);
    setCodigo('');
    setUnidad('');
    setGramos('');
    setPrecio('');
  };
  const confrimarVenta = async() => {
    if(carrito.length === 0) {
      Alert.alert('No hay productos');
      return;
    };
    if(cambio < 0) {
      Alert.alert('El pago es insuficiente');
      return;
    }
    try {
      const response = await fetch ('https://mi-api.com.mx/ventas.php', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ ventas: carrito }),
      });
      const data = await response.json();
      console.log(data);
      Alert.alert('Venta confirmada', `Total: $${total.toFixed(2)}\nCambio: $${cambio.toFixed(2)}`);
      setCarrito([]);
      setPagoCliente('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al guardar el inventario');
    }
  };
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Ventas</Text>
      <TextInput
      style={styles.input}
      placeholder="Código del producto"
      value={Codigo}
      onChangeText={setCodigo}
      />
      <TextInput
      style={styles.input}
      placeholder="Unidad del producto"
      value={Unidad}
      onChangeText={setUnidad}
      keyboardType="numeric"
      />
      <TextInput
      style={styles.input}
      placeholder="Gramos del producto"
      value={Gramos}
      onChangeText={setGramos}
      keyboardType='numeric'
      />
      <TextInput
      style={styles.input}
      placeholder="Precio del producto"
      value={Precio}
      onChangeText={setPrecio}
      keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={agregarVenta}>
        <Text style={styles.buttonText}>Agregar a la lista</Text>
      </TouchableOpacity>
      <FlatList
      data={carrito}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text> {item.Nombre} - {item.Unidad} - {item.Gramos}g -{item.Precio.toFixed(2)} </Text>
          </View>
    )}
      style={{ maxHeight: 200 }}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <TextInput
      style={styles.input}
      placeholder='Pago del cliente'
      value={pagoCliente}
      onChangeText={setPagoCliente}
      keyboardType='numeric'
      />
      {pagoCliente !== '' && (
        <Text style={styles.total}>
          {cambio >= 0 ? `Cambio: $${cambio.toFixed(2)}` : 'Pago insuficiente'}
        </Text>
      )}
      <TouchableOpacity style={styles.buttonConfirm} onPress={confirmarVenta}>
        <Text style={styles.buttonText}>Confirmar ingreso</Text>
      </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8BE00',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4A00F8',
    padding: 12,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonConfirm: {
    backgroundColor: '#4A00F8',
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: '#F8BE00',
  },
  total: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
})