function generateRandomName(startText, length = 5) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < length; i++) {
        randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `${startText}${randomPart}`;
}


function generateUID(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uid += characters[randomIndex];
    }
    return uid;
}

const getSortedFields = (elementsObject) => {
    if(elementsObject === undefined || elementsObject === null) {
        return [];
    }
    return Object.entries(elementsObject)
      .sort((a, b) => a[1].order - b[1].order) // Sort by order
      .map(([key, value]) => ({ key, ...value })); // Convert back to array format
  };
  


  const getSortedSignalFields = (elementsObject) => {
    if (!elementsObject) return [];
  
    return Object.entries(elementsObject)
      .sort((a, b) => a[1].value.order - b[1].value.order) // Access order via .value
      .map(([key, value]) => ({ key, ...Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, v]) // Convert signals to raw values
      )}));
  };


  function getElementByID(array, id) {
    return array.find(item => item.value.id === id);
}

function setElementByID(array, id, newValue) {
    let newarr =  array.map((item) => {
        let itemval = item.peek();
        if(itemval.id === id) {
            itemval = {...newValue};
            item.value = {...itemval};
        }
        return item;
    }
    );
    return newarr;
}
  

function sortObjectByOrder(obj) {
    return Object.values(obj).sort((a, b) => a.order - b.order);
  }
  
export {generateRandomName, generateUID, getSortedFields,getSortedSignalFields, getElementByID, setElementByID, sortObjectByOrder};