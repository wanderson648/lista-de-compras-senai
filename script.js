const btnAdd = document.querySelector('#salvar-produto');
const btnCleanList = document.querySelector('#limpar-lista');

const getProductLocalStorage = ()=> JSON.parse(localStorage.getItem('db_product')) ?? [];
const setProductLocalStorage = (db_product) => localStorage.setItem('db_product', JSON.stringify(db_product));


saveProducts = (product) => {
  const dbProduct = getProductLocalStorage()
  dbProduct.push(product)
  setProductLocalStorage(dbProduct)
}

cleanAndFocusInput = () => {
  document.querySelector('#produto').value = '';
  document.querySelector('#produto').focus();
}

listProducts = () => {
  const products = getProductLocalStorage();
  products.sort();
  cleanScreen();
  products.forEach((item, id) => {
    liElement = document.querySelector('#compras');
    liElement.innerHTML += `
      <li>${id+1} - ${item}</li>
    `
  })
} 

cleanList = (index) => {
  let products = getProductLocalStorage();
  products.splice(index, products.length);
  setProductLocalStorage(products);
}

cleanScreen = ()=> {
  document.querySelector('#compras').innerHTML = '';
}


btnAdd.addEventListener('click', ()=> {
  const product = document.querySelector('#produto').value;
  if(product === '') {
    swal("Error","Adicione um produto", "error");
  } else {
    saveProducts(product);
    cleanAndFocusInput();
    listProducts();
  }
})

btnCleanList.addEventListener('click', ()=> {
  let products = getProductLocalStorage();

  if(products.length > 0) {
    swal({
      title: "Você tem certeza?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Produto(s) deletado com sucesso!", {
          icon: "success",
        });
        cleanList();
        cleanScreen();
      } else {
        swal("Produtos salvos!");
      }
    });
  }
})  

listProducts();



