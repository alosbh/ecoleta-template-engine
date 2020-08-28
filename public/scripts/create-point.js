function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{ return res.json()})
    .then( states =>{

        for(const state of states){
            ufSelect.innerHTML +=  `<option value=${state.id}>${state.sigla}</option>`
        }
            
        
        
    })
}
populateUFs()
function getCities(event){

    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    
    const uFvalue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text
    

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uFvalue}/distritos`
    citySelect.innerHTML="<option value>Selecione a Cidade</option>"
    citySelect.disabled=true

    fetch(url)
    .then((res)=>{ return res.json()})
    .then( cities =>{
        
        
        for(const city of cities){
            citySelect.innerHTML +=  `<option value=${city.nome}>${city.nome}</option>`
        }
        
        citySelect.disabled=false
        
    })

}

document.querySelector("select[name=uf]")
.addEventListener("change",getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems=[];
function handleSelectedItem(event){

    const itemLi = event.target
    const itemId = itemLi.dataset.id

    itemLi.classList.toggle("selected")


    const alreadySelected = selectedItems.findIndex(item => item==itemId)

    if(alreadySelected>=0){
        const filteredItems = selectedItems.filter(item=>{
            const itemisDifferent = item != itemId  
            return itemisDifferent
        })
        selectedItems = filteredItems
    }
    else{
        selectedItems.push(itemId)
    }

    collectedItems.value=selectedItems
}