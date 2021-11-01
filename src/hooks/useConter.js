import { ref } from "vue";

export default function(){
    let useConterDatas = ref({
        name: "hooks - useConter",
        age: 18
    })
    
    let clickHooks = () => {
        useConterDatas.value.name = "kaikai -- hooks";
        useConterDatas.value.age = 520
    }
    
    return { useConterDatas, clickHooks }

}