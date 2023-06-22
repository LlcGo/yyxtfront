<template>
    <div>
        医院列表
    </div>
</template>

<script>
import {gethospsetList} from '../../api/hospset'
export default {
    data(){
    return{

    }
   },
   created(){
    const data = gethospsetList()
    console.log(data)
   }
}
</script>

<style>

</style>