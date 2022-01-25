attributeChangedCallback(name, oldValue, newValue){
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}.`);
}

static get observedAttributes(){
    return ['c','l'];
}