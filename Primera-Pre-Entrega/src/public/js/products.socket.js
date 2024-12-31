// Establece la conexión con el servidor usando Socket.IO
const socket = io();

const productList = document.getElementById("product-list");
const productForm = document.getElementById("product-form");
const errorMessage = document.getElementById("error-message");
const inputProductId = document.getElementById("input-product-id");
const btnDeleteProduct = document.getElementById("btn-delete-product");



socket.on("product-list", (data) => {
    const products = data.products.docs ?? [];
    productsList.innerText = "";

    products.forEach((product) => {
        productsList.innerHTML += `<li class='products__box__list__item'>Id: ${product.id} - Nombre: ${product.title}</li>`;
    })
});

productsForm.onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    errorMessage.innerText = "";

    form.reset();

    socket.emit("insert-product", {
        title: formData.get("title"),
        status: formData.get("status") || "off",
        stock: formData.get("stock"),
    });
};

btnDeleteProduct.onclick = () => {
    const id = Number(inputProductId.value);
    inputProductId.value = "";
    errorMessage.innerText = "";

    if (id > 0) {
        socket.emit("delete-product", { id });
    }
};

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
});