// Alterar tema
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

// Carregar produtos em destaque
async function loadFeaturedProducts () {
    try {
        const url = await fetch ("https://dummyjson.com/products?limit=4");
        const dados = await url.json();

        const container = document.getElementById("featured-products");
        container.innerHTML = "";

        dados.products.forEach(element => {
            container.innerHTML += `
                <article class="product-card">
                    <div class="product-card-img">
                        <img src="${element.thumbnail}" alt="${element.title}">
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

// Carregar detalhes do produto
async function renderProductCard () {
    try {

        const parametros = new URLSearchParams(window.location.search);
        const id = parametros.get("id");

        const url = await fetch (`https://dummyjson.com/products/${id}`);
        const dados = await url.json();


        let estrelasHTML = "";
        const rating = Math.round(dados.rating);

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                estrelasHTML += "⭐";
            } else {
                estrelasHTML += "☆";
            }
        }

        const container = document.getElementById("product-detail");
        container.innerHTML = "";

        container.innerHTML = `
        <!-- ===== GALERIA DE IMAGENS ===== -->
            <div class="detail-gallery">
                <!-- 
                    IMAGEM PRINCIPAL
                    Usar o ID "main-image" para trocar a imagem ao clicar nas thumbnails.
                -->
                <div class="detail-main-img">
                    <img 
                        id="main-image" 
                        src="${dados.images[0]}" 
                        alt="Imagem do produto"
                    >
                </div>
                
                <!-- 
                    THUMBNAILS
                    Usar o ID "thumbnails-container" para inserir as imagens miniatura.
                    Ao clicar em uma thumbnail, trocar a imagem principal.
                -->
                <div id="thumbnails-container" class="detail-thumbnails">
                    <div class="detail-thumb"></div>
                    <div class="detail-thumb"></div>
                    <div class="detail-thumb"></div>
                </div>
            </div>

            <!-- ===== INFORMACOES DO PRODUTO ===== -->
            <div class="detail-info">
                <!-- Categoria -->
                <span id="detail-category" class="detail-category">${dados.category}</span>
                
                <!-- Marca -->
                <span id="detail-brand" class="detail-brand">Marca: ${dados.brand}</span>
                
                <!-- Titulo -->
                <h1 id="detail-title" class="detail-title">${dados.title}</h1>
                
                <!-- Rating -->
                <div class="detail-rating">
                    <div id="detail-stars" class="stars">
                        <i class="star">${estrelasHTML}</i>
                        <span style="width: 120px; height: 24px;"></span>
                    </div>
                    <span id="detail-rating-text" class="detail-rating-text">${dados.rating} avaliacao</span>
                </div>
                
                <!-- Precos -->
                <div class="detail-prices">
                    <span id="detail-price" class="detail-price-current">R$ ${dados.price}</span>
                    <span id="detail-original-price" class="detail-price-original hidden">R$ ${dados.price}</span>
                    <span id="detail-discount" class="detail-discount hidden">-${dados.discountPercentage}%</span>
                </div>
                
                <!-- Descricao -->
                <p id="detail-description" class="detail-description">
                    ${dados.description}
                </p>
                
                <!-- Informacoes Adicionais -->
                <div class="detail-meta">
                    <div class="meta-item">
                        <span class="meta-label">${dados.availabilityStatus}</span>
                        <span id="detail-stock" class="meta-value">${dados.stock}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Status</span>
                        <span id="detail-availability" class="meta-value">--</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">SKU</span>
                        <span id="detail-sku" class="meta-value">${dados.sku}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Garantia</span>
                        <span id="detail-warranty" class="meta-value">${dados.returnPolicy}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Envio</span>
                        <span id="detail-shipping" class="meta-value">--</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Devolucao</span>
                        <span id="detail-return" class="meta-value">${dados.returnPolicy}</span>
                    </div>
                </div>
                
                <!-- Botoes de Acao -->
                <div class="detail-actions">
                    <button id="btn-add-cart" class="btn-primary" disabled>
                        Adicionar ao Carrinho
                    </button>
                    <button id="btn-buy-now" class="btn-secondary" disabled>
                        Comprar Agora
                    </button>
                </div>
            </div>
       
        `
    renderReviews(dados.reviews);

    } catch (error) {
        console.log(error);
    }
}
renderProductCard()

// Carregar todo catálogo
async function loadProducts () {
    try {
        const url = await fetch ("https://dummyjson.com/products?")
        const dados = await url.json();

        const produto = document.getElementById("products-list");
        produto.innerHTML = "";

        dados.products.forEach (element => {
            produto.innerHTML += `
             <article class="product-card">
                <div class="product-card-img">
                    <img src="${element.thumbnail}" alt="${element.title}">
                    <span class="badge badge-discount">-${element.discountPercentage}%</span>
                    <span class="badge badge-stock in-stock">Em estoque</span>
                </div>

                <div class="product-card-content">
                    <span class="product-card-category">${element.category}</span>
                    <span class="product-card-brand">Marca: ${element.brand}</span>
                    <h3 class="product-card-title">${element.title}</h3>

                    <div class="product-card-rating">
                        <span class="rating-value">${element.rating}</span>
                    </div>

                    <div class="product-card-footer">
                        <div class="product-card-prices">
                            <span class="price-current">R$ ${element.price}</span>
                        </div>

                        <a href="detalhes.html?id=${element.id}" class="btn-primary btn-small">Ver</a>
                    </div>
                </div>
            </article>
            
            `
        })

    } catch (error) {
        console.log(error)
    }
}

// Mostrar categorias disponíveis
async function loadCategories () {
    try {
        const url = await fetch ("https://dummyjson.com/products/categories");
        const dados = await url.json();

        const container = document.getElementById("category-filter");

        dados.forEach(categoria => {
            container.innerHTML += `
                <option value="${categoria.slug}">${categoria.name}</option>
            `
        })

    } catch (error) {
        console.log(error)
    }
}

// Filtrar por categorias
async function filterByCategory (categoriaEscolhida) {
    try {

        const url = await fetch(`https://dummyjson.com/products/category/${categoriaEscolhida}`);
        const dados = await url.json();

        const listaProdutos = document.getElementById("products-list");

        if (categoriaEscolhida === ""){
            loadProducts();
            return;

        } else {

            listaProdutos.innerHTML = "";

            dados.products.forEach(element => {
            listaProdutos.innerHTML += `
              <article class="product-card">
                <div class="product-card-img">
                    <img src="${element.thumbnail}" alt="${element.title}">
                    <span class="badge badge-discount">-${element.discountPercentage}%</span>
                    <span class="badge badge-stock in-stock">Em estoque</span>
                </div>

                <div class="product-card-content">
                    <span class="product-card-category">${element.category}</span>
                    <span class="product-card-brand">Marca: ${element.brand}</span>
                    <h3 class="product-card-title">${element.title}</h3>

                    <div class="product-card-rating">
                        <span class="rating-value">${element.rating}</span>
                    </div>

                    <div class="product-card-footer">
                        <div class="product-card-prices">
                            <span class="price-current">R$ ${element.price}</span>
                        </div>

                        <a href="detalhes.html?id=${element.id}" class="btn-primary btn-small">Ver</a>
                    </div>
                </div>
            </article>
            `
        })
        }

        
    } catch (error) {
        console.log(error)
    }
    
}

// FUNÇÃO DE PESQUISA
let searchTimeout;

async function handleSearch (query) {
    clearTimeout(searchTimeout);

    // Se a barra de pesquisa ficar vazia, recarrega a SUA função de produtos
    if (query.trim() === "") {
        loadProducts();
        return;
    }

    // Espera o usuário parar de digitar por 300ms
    searchTimeout = setTimeout(async () => {
        try {
            const url = await fetch(`https://dummyjson.com/products/search?q=${query}`);
            const dados = await url.json();

            const listaProdutos = document.getElementById("products-list");
            listaProdutos.innerHTML = ""; // Limpa a lista atual para mostrar a pesquisa

            // Se achou produtos, desenha usando o SEU modelo de card
            if (dados.products && dados.products.length > 0) {
                dados.products.forEach(element => {
                    listaProdutos.innerHTML += `
                    <article class="product-card">
                        <div class="product-card-img">
                            <img src="${element.thumbnail}" alt="${element.title}">
                            <span class="badge badge-discount">-${element.discountPercentage}%</span>
                            <span class="badge badge-stock in-stock">Em estoque</span>
                        </div>
                        <div class="product-card-content">
                            <span class="product-card-category">${element.category}</span>
                            <span class="product-card-brand">Marca: ${element.brand}</span>
                            <h3 class="product-card-title">${element.title}</h3>
                            <div class="product-card-rating">
                                <span class="rating-value">${element.rating}</span>
                            </div>
                            <div class="product-card-footer">
                                <div class="product-card-prices">
                                    <span class="price-current">R$ ${element.price}</span>
                                </div>
                                <a href="detalhes.html?id=${element.id}" class="btn-primary btn-small">Ver</a>
                            </div>
                        </div>
                    </article>
                    `;
                });
            } else {
                listaProdutos.innerHTML = "<p>Nenhum produto encontrado na pesquisa.</p>";
            }

        } catch (error) {
            console.log(error);
        }
    }, 300);
}

async function sortProducts () {
    try {
        
        const select = document.getElementById("sort-filter");
        let lista = document.getElementById("products-list");


        select.addEventListener("change", async () => {

            let URL = "";

            if (select.value === "price-asc"){
                URL = `https://dummyjson.com/products?sortBy=price&order=asc`

            } else if (select.value === "price-desc") {
                URL = `https://dummyjson.com/products?sortBy=price&order=desc`

            } else if (select.value === "rating-desc") {
                URL = `https://dummyjson.com/products?sortBy=rating&order=desc`

            } else if (select.value === "title-asc") {
                URL = `https://dummyjson.com/products?sortBy=title&order=asc`

            } else if (select.value === "title-desc"){
                URL = `https://dummyjson.com/products?sortBy=title&order=desc`

            }

            lista.innerHTML = "";
            const url = await fetch(URL);
            const dados = await url.json();

            dados.products.forEach(element => {
                lista.innerHTML += `
                <article class="product-card">
                <div class="product-card-img">
                    <img src="${element.thumbnail}" alt="${element.title}">
                    <span class="badge badge-discount">-${element.discountPercentage}%</span>
                    <span class="badge badge-stock in-stock">Em estoque</span>
                </div>

                <div class="product-card-content">
                    <span class="product-card-category">${element.category}</span>
                    <span class="product-card-brand">Marca: ${element.brand}</span>
                    <h3 class="product-card-title">${element.title}</h3>

                    <div class="product-card-rating">
                        <span class="rating-value">${element.rating}</span>
                    </div>

                    <div class="product-card-footer">
                        <div class="product-card-prices">
                            <span class="price-current">R$ ${element.price}</span>
                        </div>

                        <a href="detalhes.html?id=${element.id}" class="btn-primary btn-small">Ver</a>
                    </div>
                </div>
            </article>
            `
            })
        })


    } catch (error) {
        console.log (error)
    }
}
sortProducts()

// FUNÇÃO DE AVALIAÇÕES (TAREFA 11)
function renderReviews(reviews) {
    try {
        const container = document.getElementById("reviews-list");
        
        // Se a div não existir na página, a função para por aqui
        if (!container) return; 
        
        container.innerHTML = ""; // Limpa o container antes de adicionar

        // Se não tiver nenhuma avaliação
        if (!reviews || reviews.length === 0) {
            container.innerHTML = "<p>Nenhuma avaliação para este produto.</p>";
            return;
        }

        reviews.forEach(review => {
            // 1. Lógica das estrelas (igual a que você já usou)
            let estrelasHTML = "";
            const rating = Math.round(review.rating);
            
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    estrelasHTML += "⭐";
                } else {
                    estrelasHTML += "☆";
                }
            }

            // 2. Formatar a data (ex: transforma "2024-05-23T..." em "23 de maio de 2024")
            const dataFormatada = new Date(review.date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            // 3. Inserir o HTML exatamente como pedido na tarefa
            container.innerHTML += `
            <div class="review-card">
                <div class="review-header">
                    <span class="review-author" style="font-weight: bold;">${review.reviewerName}</span>
                    <span class="review-date" style="color: gray; font-size: 14px; margin-left: 10px;">${dataFormatada}</span>
                </div>
                <div class="stars" style="margin: 5px 0;">
                    ${estrelasHTML}
                </div>
                <p class="review-comment">"${review.comment}"</p>
            </div>
            
            `;
        });

    } catch (error) {
        console.log("Erro ao carregar as avaliações:", error);
    }
}

// CARREGAR CATEGORIAS POPULARES (HOME)
async function loadPopularCategories() {
    try {
        const url = await fetch("https://dummyjson.com/products/categories");
        const dados = await url.json();

        const container = document.getElementById("categories-grid");
        
        if (!container) return;

        container.innerHTML = ""; 

        // Pega apenas as 4 primeiras categorias para encaixar nos 4 espaços do seu HTML
        const categoriasPopulares = dados.slice(0, 4);

        categoriasPopulares.forEach(categoria => {
            container.innerHTML += `
                <div class="product-card" style="cursor: pointer; transition: transform 0.2s;">
                    <div class="product-card-content" style="padding: 2rem; text-align: center;">
                        <h3 style="margin: 0; text-transform: capitalize;">${categoria.name}</h3>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.log("Erro ao carregar categorias populares:", error);
    }
}

// Esse bloco avisa o navegador a hora exata de carregar os produtos
document.addEventListener('DOMContentLoaded', () => {
    const listaProdutos = document.getElementById("products-list");
    
    // Se a lista existir na tela, ele carrega os produtos e as categorias!
    if (listaProdutos) {
        loadProducts();
        loadCategories();
    }

    const gridCategorias = document.getElementById("categories-grid");
    if (gridCategorias) {
        loadPopularCategories(); 
    }
});
