const productList = document.getElementById("product-list");
const btnRefreshList = document.getElementById("btn-refresh-product-list");

const loadProducts = async () => {
    const response = await fetch("api/products", { method: "GET"});
    const data = await response.json();
    const products = data.payload;

    productList.innerText = "";

    products.forEach((product) => {
        productList.innerHTML += `<li>Id: ${product.id} - Name: ${product.title}</li>`
    });
};

btnRefreshList.addEventListener("click", () => {
    loadProducts();
});

loadProducts();