// Establece la conexión con el servidor usando Socket.IO
const socket = io();

const productList = document.getElementById("product-list");
const productForm = document.getElementById("product-form");
const errorMessage = document.getElementById("error-message");
const productId = document.getElementById("product-id");
const btnDeleteProduct = document.getElementById("btn-delete-product");



socket.on("product-list", (data) => {
    const products = data.products || [];
    
    productList.innerText = "";

    products.forEach((product) => {
        productList.innerHTML += `<li>Id: ${product.id} - Name: ${product.title}</li>`
    })
});

productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    errorMessage.innerText = "";
    form.reset();

    socket.emit("insert-product", {
        title: formData.get("title"),
        status: formData.get("status") || "off",
        stock: formData.get("stock"),
        code: formData.get("code"),
        description: formData.get("description"),
        price: formData.get("price")
    })
});

socket.on("product-list", (data) => {
    const products = data.products || [];
    
    productList.innerText = "";

    products.forEach((product) => {
        productList.innerHTML += `<li>Id: ${product.id} - Name: ${product.title}</li>`
    })
});

btnDeleteProduct.addEventListener("click", () => {
    const id = productId.value;
    productId.innerText = "";
    errorMessage.innerText = "";
    
    if (id > 0) {
        socket.emit("delete-product", { id })
    }
});

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
});

