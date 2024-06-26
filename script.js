var carrito = [];

function buscar() {
    var input, filtro, tabla, tr, td, i, txtValor;
    input = document.getElementById("busqueda");
    filtro = input.value.toUpperCase();
    tabla = document.getElementById("miTabla");
    tr = tabla.getElementsByTagName("tr"); 
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]; // Solo buscamos en la primera columna (productos)
        if (td) {
            txtValor = td.textContent || td.innerText;
            if (txtValor.toUpperCase().indexOf(filtro) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function agregarAlCarrito(idProducto) {
    var producto = document.getElementById("miTabla").rows[idProducto].cells;
    var nombre = producto[0].innerText;
    var descripcion = producto[1].innerText;
    var precio = parseFloat(producto[2].innerText);
    var unidades = parseInt(producto[3].innerText);

    // Verificar si hay suficientes unidades en existencia
    if (unidades <= 0) {
        alert("Lo siento, no hay suficientes unidades en existencia para este producto.");
        return;
    }

    // Reducir las unidades en existencia en uno
    producto[3].innerText = unidades - 1;

    // Verificar si el producto ya está en el carrito
    var encontrado = false;
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombre) {
            carrito[i].cantidad++; // Incrementar la cantidad del producto en el carrito
            encontrado = true;
            break;
        }
    }

    // Si el producto no está en el carrito, agregarlo
    if (!encontrado) {
        carrito.push({ nombre: nombre, descripcion: descripcion, precio: precio, cantidad: 1 });
    }

    // Actualizar el carrito en la interfaz
    actualizarCarrito();
}

function actualizarCarrito() {
    var carritoBody = document.getElementById("carrito-body");
    carritoBody.innerHTML = "";

    var totalCarrito = 0; // Variable para calcular el total del carrito

    carrito.forEach(function(item) {
        var row = document.createElement("tr");
        var subtotal = item.precio * item.cantidad;
        row.innerHTML = "<td>" + item.nombre + "</td><td>" + item.descripcion + "</td><td>" + item.precio.toFixed(2) +
            "</td><td><button onclick='restarCantidad(\"" + item.nombre + "\")'>-</button>" + item.cantidad + "<button onclick='sumarCantidad(\"" +
            item.nombre + "\")'>+</button></td><td>" + subtotal.toFixed(2) + "</td>";
        carritoBody.appendChild(row);

        totalCarrito += subtotal; // Sumar el subtotal de cada producto al total del carrito
    });

    // Actualizar el total del carrito en la interfaz
    document.getElementById("total-carrito").innerText = totalCarrito.toFixed(2);
}

function sumarCantidad(nombreProducto) {
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombreProducto) {
            carrito[i].cantidad++;
            break;
        }
    }
    actualizarCarrito();
}

function restarCantidad(nombreProducto) {
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombreProducto) {
            if (carrito[i].cantidad > 1) {
                carrito[i].cantidad--;
                break;
            } else {
                // Si la cantidad es 1, se elimina el producto del carrito
                carrito.splice(i, 1);
                break;
            }
        }
    }
    actualizarCarrito();
}

function abrirFormularioPago() {
    document.getElementById("pago-formulario").style.display = "block";
}

function abrirVentanaPago() {
    var ventanaPago = window.open("pago_formulario.html", "_blank", "width=400, height=400");
    // Puedes ajustar el tamaño de la ventana emergente según tus necesidades
}