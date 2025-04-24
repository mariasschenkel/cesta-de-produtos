
const ovos = [
  {
      nome: "Ovo de Páscoa Ferrero Rocher 225g",
      preco: 89.99,
      imagem: "./ovo ferrero.webp"
  },
  {
      nome: "Ovo de Páscoa Chocolate ao Leite Tripla Camada Oreo 320g",
      preco: 84.99,
      imagem: "./ovo oreo.webp"
  },
  {
      nome: "Ovo de Páscoa Alpino Chocolate 349,5g - Nestlé",
      preco: 84.99,
      imagem: "./ovo alpino.webp"
  },
  {
      nome: "Ovo De Páscoa Cacau Show Recheado Lacreme Ao Leite 400g",
      preco: 149.99,
      imagem: "./ovo la creme.webp"
  },
  {
      nome: "Ovo de Páscoa Sonho de Valsa Chocolate ao Leite 277g - Lacta",
      preco: 49.99,
      imagem: "./sonho de valsa.webp"
  }
];

let cesta = [];
let subtotal = 0;

const listagem = document.getElementById('listagem');
const cestaElement = document.getElementById('cesta');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');

ovos.forEach(ovo => {
  const li = document.createElement('li');
  li.classList.add('box');
  li.innerHTML = `
      <img src="${ovo.imagem}" alt="${ovo.nome}">
      <p class="text1">${ovo.nome}</p>
      <p class="preco">R$ ${ovo.preco.toFixed(2)}</p>
      <button class="btn-adicionar">Adicionar ao carrinho</button>
  `;
  listagem.appendChild(li);

  li.querySelector('.btn-adicionar').addEventListener('click', () => {
      adicionarAoCarrinho(ovo);
  });
});

function atualizarCarrinho() {
  cestaElement.innerHTML = '';
  cesta.forEach((item, index) => {
      const itemCesta = document.createElement('div');
      itemCesta.classList.add('cesta-item');
      itemCesta.innerHTML = `
          <img src="${item.imagem}" alt="${item.nome}">
          <p>${item.nome}</p>
          <div class="quantidade">
              <button onclick="alterarQuantidade(${index}, -1)">-</button>
              <span>${item.quantidade}</span>
              <button onclick="alterarQuantidade(${index}, 1)">+</button>
          </div>
          <button onclick="removerItem(${index})">Remover</button>
      `;
      cestaElement.appendChild(itemCesta);
  });

  subtotal = cesta.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  subtotalElement.textContent = subtotal.toFixed(2);
  totalElement.textContent = `Total: R$ ${subtotal.toFixed(2)}`;
}

function adicionarAoCarrinho(ovo) {
  const itemExistente = cesta.find(item => item.nome === ovo.nome);
  if (itemExistente) {
      itemExistente.quantidade++;
  } else {
      cesta.push({ ...ovo, quantidade: 1 });
  }
  atualizarCarrinho();
}

function alterarQuantidade(index, delta) {
  const item = cesta[index];
  item.quantidade += delta;
  if (item.quantidade <= 0) {
      cesta.splice(index, 1);
  }
  atualizarCarrinho();
}

function removerItem(index) {
  cesta.splice(index, 1);
  atualizarCarrinho();
}