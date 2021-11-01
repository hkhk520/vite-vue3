<template>
  <div>
    <h1>{{ msg }}</h1>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Vite Documentation
      </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>

    <button type="button" @click="increment">
      count is: {{ state.count }} ------ double is: {{ state.double }}
    </button>
    <!-- <p>{{num}}</p> -->
    <p class="text">
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
    <div>{{name}} === {{age}}</div>
    <input type="text" ref="inputDom" value="kaikaikai">
    <p>pulsOne ---> {{pulsOne}}</p>
    <p @click="changeWatchEffectValue">{{watchEffectValue.count}}</p>
    <h1 @click="clickWatch1">clickWatch1</h1>
    <h1 @click="clickWatch2">clickWatch2</h1>
    <h1 @click="clickWatch3">{{watchData3.name}}</h1>
    <h1 @click="clickWatch4">clickWatch4</h1>
    <p @click="changeProvideTitle">{{provideTitle}}</p>

    <!-- 在标签中使用hooks -->
    <p @click="clickHooks">{{useConterDatas.name}} -- {{useConterDatas.age}}</p>
    <p>{{localData}}</p>
    <p @click="kaikai">点我试试看呀</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, reactive, ref, toRef, toRefs, watch, watchEffect, inject, defineEmits } from 'vue';
import css from '../assets/index.css';

// 引入封装好的hooks文件
import {
  useConter,
  useTitle,
  useLocalStorage
} from "../hooks/index"
// 使用这个hooks函数
const { useConterDatas, clickHooks } = useConter();
const titleRef = useTitle("kaikai");

setTimeout(() => {
  titleRef.value = "修改titleRef的值来触发title的变化"
}, 1500);

const localData = useLocalStorage("info",{name: 520});


let provideTitle = inject("provide-title");  // 由于父组件传过来的是ref对象，所以接受的也是ref对象
let changeProvideTitle = () => {
  provideTitle.value = "520";  // 点击子组件可以修改父组件传过来的值，只能通过readonly来禁止修改了
  console.log("provideTitle",provideTitle);
}

// 这里定义的样式变量直接用到style里面去了
const color = "green";
const font = {
  size: "3em"
}

// 这个就是props的写法
defineProps({
  msg: String
})

// 子向父的发射事件的写法
const emit = defineEmits(["update-data"])
const kaikai = () => emit('update-data', {age: 525252})

// ref:num = 520520;

type DState = {
  count: number,
  double: number
}
const state:DState = reactive({
  count: 0,
  double: computed(() => state.count * 2)  // 计算属性的写法
})
function increment(){
  state.count++;
  console.log("state.double ===>",state.double);
}

const numValue = ref(520);
console.log("numValue ===>",numValue.value++);
const state1 = reactive(numValue);
console.log("state1  ==>",state1.value);

const obj = reactive({
  name: "kai",
  age: 520
})

// 把对象解构出来，就可以在标签内直接使用了
let {name,age} = { ...toRefs(obj) };

let inputDom = ref(null);   // 当ref(null)时，可当做获取该dom对象，这就是templateRefs
onMounted(() => {
  console.log("inputDom ===>",inputDom.value);
})

const kaiNum = ref(1);
// let pulsOne = computed(() => numValue.value + 1);   // 这种的计算属性不能修改其value值，因为是一个readonly的限制
let pulsOne = computed({
  get: () => kaiNum.value + 1,  
  set: (val) => kaiNum.value = val  // 这样的计算属性可以修改其计算属性的value值，如：pulsOne.value = Math.random();
});

pulsOne.value = Math.random();

let watchValue = reactive({ count: { count: 0 } });
// 默认只会在监听的值发生变化时才执行第二个参数的回调，第三个对象参数可控制立即立即执行第二个参数回调
watch(() => watchValue.count, (curCount, prevCount) => {
  console.log("打印count的变化值 =>", curCount, prevCount);  // curCount：当前的值，prevCount：变化的前一个值
}, {
  immediate: true, // 是否立即执行第二个参数回调，即立即执行监听
  deep: true  // 是否深拷贝监听，即深度监听
});

setTimeout(() => {
  watchValue.count.count++
},1000);

// watch 第一个参数可以是ref对象
let watchData1 = ref("520");
watch(watchData1, (newValue,oldValue) => {
  console.log("new =>",newValue , "  ---  old =>", oldValue);
})
let clickWatch1 = () => {
  watchData1.value = "love"
}

// watch 第一个参数可以是reactive对象 ,但是监听之后打印出来的 newValue 和 oldValue 都是修改后的proxy对象，即：Proxy {name: "kebo", age: 18}
let watchData2 = reactive({name: "kai", age: 18});
watch(watchData2, (newValue,oldValue) => {
  console.log("new =>",newValue , "  ---  old =>", oldValue);
})
let clickWatch2 = () => {
  watchData2.name = "kebo"
}

// watch 第一个参数可以是函数里面的解构对象 ,监听之后打印出来的 newValue 和 oldValue 就是普通对象，即：{name: "kebo", age: 18}
let watchData3 = reactive({name: "kai", age: 18});
watch(() => ({ ...watchData3 }), (newValue,oldValue) => {  // { return { ...watchData3 } }  相当于  ({ ...watchData3 })
  console.log("new =>",newValue , "  ---  old =>", oldValue);
})
let clickWatch3 = () => {
  watchData3.name = "kebo"
}

// watch 第一个参数可以是一个数组 实现监听多个数据源 [watchData1, watchData2] 把reactive对象解构成普通对象=> [watchData1, () => ({...watchData2})]  
watch([watchData1, () => ({...watchData2})], ([newData1,newData2],[oldData1,oldData2]) => {  // { return { ...watchData3 } }  相当于  ({ ...watchData3 })
  console.log("new =>",newData1,newData2 , "  ---  old =>", oldData1,oldData2);
})
let clickWatch4 = () => {
  watchData1.value = "love";
  watchData2.name = "kebo";
}

// watchEffect的特点：
// 不需要手动传入要监听的依赖值
// 不是lazy初始化执行分析依赖
// 无法获取原始值
// 一些异步操作放里面更加的合适
// watchEffect第三个参数处理副作用的第一个参数
// watchEffect 会自动收集可响应式的依赖，从而监听这些值的变化时，触发watchEffect函数
let watchEffectValue = reactive({ count: 0 });
// 返回值是一个函数，可停止监听
let stop = watchEffect((onInvalidate) => {
  console.log("watchEffectValue ==>",watchEffectValue.count);  // 只要使用到哪个参数，那这个参数就被监听到
  // onInvalidate 函数一般是在执行watchEffect里面其他代码之前被调用触发
  onInvalidate(() => {
    // 清除副作用执行的函数，比如想解除一些事件的绑定，移除一些样式啥的
    console.log("=========== onInvalidate ============");
  });

  // 当立即执行时，会打印出null，由于dom还没挂载
  console.log("inputDom  watchEffect ===>",inputDom.value);
}, {
  // flush: "pre"  // 是默认的值，即立即执行
  flush: "post", // 是等到dom挂载之后再执行,
  // flush: "sync",  // 规定为异步的执行，一般不建议使用
  onTrigger(e){
    // debugger   // 可进行调式
  }
});

let changeWatchEffectValue = () => {
  watchEffectValue.count++;
  if(watchEffectValue.count == 10){
    // watchEffect 的返回值是一个函数，可停止监听
    stop()
  }
}


</script>

<style>
:root{
  --varColor: yellowgreen;
}
a {
  color: var(--varColor);
}
.text{
  color: v-bind(color);
  font-size: v-bind("font.size");
}
</style>
