import { useState } from "react";
import { Alert, StyleSheet, TextInput, Text, TouchableOpacity, View } from "react-native";
export default function Bodeguero () {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [unidad, setUnidad] = useState('');
  const [gramos, setGramos] = useState('');
  const [precio, setPrecio] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [pagoCliente, setPagoCliente] = useState('');
  const total = carrito.reduce((sum, item) => sum + item.subtotal, 0);
  const cambio = parseFloat(pagoCliente) - total;
  const agregarProducto = async () => {
    if(!codigo || !nombre || !unidad || !gramos || !precio) {
      Alert.alert('Faltan datos');
      return;
    }
    const nuevo = {
      codigo,
      nombre,
      unidad,
      gramos,
      precio: parseFloat(precio),
      subtotal: parseFloat(precio) * parseInt(unidad),
    };
    setCarrito([...carrito, nuevo]);
    setCodigo('');
    setNombre('');
    setUnidad('');
    setGramos('');
    setPrecio('');
  };
  const confirmarIngreso = async() => {
    if(carrito.length === 0) {
      Alert.alert('No hay productos');
      return;
    }
    try {
      const response = await fetch('https://mi-api.com.mx/inventario.php', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ productos : carrito}),
      });
      const data = await response.json();
      console.log(data);
      Alert.alert('Compra confirmada', `Total: $${total.toFixed(2)}\nCambio: $${cambio.toFixed(2)}`);
      setCarrito([]);
      setPagoCliente('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al guardar el inventario');
    }
  };
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Inventario</Text>
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
      <TouchableOpacity style={styles.button} onPress={agregarProducto}>
        <Text style={styles.buttonText}>Agregar a la lista</Text>
      </TouchableOpacity>
      <FlatList
      data={carrito}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.nombre} - {item.unidad} - {item.gramos}g -{item.precio.toFixed(2)}</Text>
          </View>
      )}
      style={{ maxHeight: 160 }}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <TextInput
      style={styles.input}
      placeholder='Pago del personal'
      value={pagoCliente}
      onChangeText={setPagoCliente}
      keyboardType='numeric'
      />
      {pagoCliente !== '' && (
        <Text style={styles.total}>
          {cambio >= 0 ? `Cambio: $${cambio.toFixed(2)}` : 'Pago insuficiente'}
        </Text>
      )}
      <TouchableOpacity style={styles.buttonConfirm} onPress={confirmarIngreso}>
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