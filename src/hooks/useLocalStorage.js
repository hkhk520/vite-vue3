import { ref, watch } from "vue";

export default function(key, value){
    const localData = ref(value);

    if(value){
        localStorage.setItem(key, JSON.stringify(value))
    }else{
        localData.value = JSON.parse(localStorage.getItem(key))
    }

    watch(localData, (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
    }, {
        immediate: true
    })

    return localData
}