

let loadProducts = (productsJSON, productsXML) => {

    let arrRow = document.getElementsByClassName("row")
    let divContainer = arrRow[3]

    fetch(productsJSON)
        .then(response => response.json())
        .then(result => {

            for(let i=0 ; i < result.length ; i++){
                let src = result[i].src
                let name = result[i].name
                let type = result[i].type
                let price = result[i].price

                let plantilla = `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                                    <div class="card card-blog card-plain">
                                    <div class="card-header p-0 mt-n4 mx-3">
                                        <a class="d-block shadow-xl border-radius-xl">
                                        <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                                        </a>
                                    </div>
                                    <div class="card-body p-3">
                                        <p class="mb-0 text-sm">${type}</p>
                                        <a href="javascript:;">
                                        <h5>
                                            ${name}
                                        </h5>
                                        </a>
                                        <p class="mb-4 text-sm">
                                        <b>Price: </b> $ ${price}
                                        </p>
                                    </div>
                                    </div>
                                  </div>`

                divContainer.innerHTML = divContainer.innerHTML + plantilla

            }

        })
        .catch(error => {
            console.log( error );
        })


    fetch(productsXML)
        .then(response => response.text())
        .then(result => {
            let xml = (new DOMParser()).parseFromString(result, 'application/xml'); //ok
            let productos = xml.getElementsByTagName("product") //ok

            for(let x=0 ; x < productos.length ; x++){

                let srcArr = productos[x].getElementsByTagName("src")
                let src = srcArr[0].innerHTML                               //ok
                let nameArr = productos[x].getElementsByTagName("name")
                let name = nameArr[0].innerHTML                             //ok
                let typeArr = productos[x].getElementsByTagName("type")
                let type = typeArr[0].innerHTML                             //ok
                let priceArr = productos[x].getElementsByTagName("price")
                let price = priceArr[0].innerHTML                           //ok


                let plantilla = `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                                    <div class="card card-blog card-plain">
                                    <div class="card-header p-0 mt-n4 mx-3">
                                        <a class="d-block shadow-xl border-radius-xl">
                                        <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                                        </a>
                                    </div>
                                    <div class="card-body p-3">
                                        <p class="mb-0 text-sm">${type}</p>
                                        <a href="javascript:;">
                                        <h5>
                                            ${name}
                                        </h5>
                                        </a>
                                        <p class="mb-4 text-sm">
                                        <b>Price: </b> $ ${price}
                                        </p>
                                    </div>
                                    </div>
                                </div>`
                
                divContainer.innerHTML = divContainer.innerHTML + plantilla;

            }

        })
        .catch(error => {
            console.log( error );
        })


}

//loadProducts("https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.json","https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.xml")

loadProducts("https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json","https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml")


let elementoButton = document.getElementById("filter")

elementoButton.addEventListener('click', (event)=>{

    let elementoInput = document.getElementById("text").value
    console.log(elementoInput)
    let arrProd = document.getElementsByClassName("col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4")

    //let test1 = arrProd[0].getElementsByTagName("h5")[0].innerHTML.trim() //name
    //console.log(test1)
    //let test2 = arrProd[0].getElementsByClassName("mb-0 text-sm")[0].innerHTML //type
    //console.log(test2)
    

    let productosFiltrados = Object.values(arrProd).filter( producto => (producto.getElementsByClassName("mb-0 text-sm")[0].innerHTML.includes(elementoInput)) || (producto.getElementsByTagName("h5")[0].innerHTML.trim().includes(elementoInput)) )
    console.log(productosFiltrados)

    //console.log(productosFiltrados[0])
    //console.log(productosFiltrados[0].innerHTML)

    let arrayRows = document.getElementsByClassName("row")
    let container = arrayRows[3]
    container.innerHTML = ''

    if(productosFiltrados.length != 0){
        for(let i = 0 ; i < productosFiltrados.length ; i++){
            container.innerHTML = container.innerHTML + productosFiltrados[i].innerHTML
        }
    }else{
        container.innerHTML = 'Su búsqueda no tuvo resultados...'
    }

})