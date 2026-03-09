
function toggleTheme () {
    try {

        let temaAtual = document.documentElement.getAttribute('data-theme');

        let novoTema = 'dark';
        if(temaAtual === 'dark'){
            novoTema = 'light';
        }

        document.documentElement.setAttribute('data-theme', novoTema);
        localStorage.setItem('theme', novoTema);

    } catch (error){
        console.error(error);
    }
}
toggleTheme();

async function loadFeaturedProducts () {
    try {
        const url = await fetch ("https://dummyjson.com/products?limit=4");
        const dados = await url.json();

        const container = document.getElementById("featured-products");
        container.innerHTML = "";

        dados.products.forEach(element => {
            container.innerHTML += `
                <article class="product-card placeholder-card">
                    <div class="product-card-img">
                        <div class="card" src="${element.images[0]}"></div>
                    </div>
                    <div class="product-card-content">
                        <div class="text short"></div>
                        <div class="title"><h3>${element.title}</h3></div>
                        <div class="text"><p>${element.description}</p></div>
                    </div>
                </article>
            `
        });

    } catch (error) {
        console.log(error);
    }
}
loadFeaturedProducts()

async function renderProductCard(product) {
    try {
        const url = await fetch ("https://dummyjson.com/products?limit=4")
        const dados = await url.json();

        const produto = document.getElementById("product-detail");
        produto.innerHTML = "";

        dados.products.forEach (element => {
            produto.innerHTML += `
            <article class="product-card">
                <div class="product-card-img">
                    <img src="${element.images[0]}" alt="...">
                    <span class="badge badge-discount">-${element.discountPercentage}%</span>
                    <span class="badge badge-stock in-stock">Em estoque</span>
                </div>

                <div class="product-card-content">
                    <span class="product-card-category">${element.category}</span>
                    <span class="product-card-brand">Marca: ${element.brand}</span>
                    <h3 class="product-card-title">${element.title}</h3>
                    <div class="product-card-rating">
                        <div class="stars">...</div>
                        <span class="rating-value">${element.rating}</span>
                    </div>

                    <div class="product-card-footer">
                        <div class="product-card-prices">
                            <span class="price-current">R$ </span>
                            <span class="price-original">R$ ${element.price}</span>
                        </div>

                        <a href="detalhes.html?id=1" class="btn-primary btn-small">Ver</a>
                    </div>

                </div>
            </article>

            
            `
        })

    } catch (error) {
        console.log(error)
    }
}
renderProductCard()