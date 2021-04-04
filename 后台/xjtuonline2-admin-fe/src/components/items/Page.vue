<template>
    <div class="page">
        <div class="container">
        <span v-for="number in count"
        :key="number" :id="number" class="kaka"
        @click="changepage(number)">{{number}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pagenumber: Number,
        count: Number,
    },
    created(){

    },
    data(){
        return {
            lastcheck: 1,
        }
    },
    updated(){
        document.getElementById(1).style.backgroundColor = 'yellow';
    },
    methods: {
        changepage(number) {
            document.getElementById(this.lastcheck).style.backgroundColor = 'lightcyan';
            document.getElementById(number).style.backgroundColor = 'yellow';
            this.lastcheck = number;
            this.pagenumber = number-1;
            this.$emit('changenow');
        }
    }
}
</script>

<style scoped>
.page::-webkit-scrollbar {
  width: 4px;
}
.page::-webkit-scrollbar-thumb {
  background-color:#380079;
}
/* .page::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
} */
.page{
    height: 75px;
    margin-top: 10px;
    margin-left:-5px;
    width: 820px;
    overflow-y: auto;
    text-align: center;
}
span{
    margin-bottom: 5px;
    user-select: none;
    position: relative;
    text-align: center;
    line-height: 30px;
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: lightcyan;
    border: burlywood 1px solid;
    cursor: pointer;
    transition: 0.5s;
}
.kaka:hover{
    transform: rotate(360deg);
    transition: 1s;
}
span+span{
    margin-left: 30px;
}
span+span::before{
    content: '';
    position: absolute;
    top:12px;
    left:-18px;
    background-color: blue;
    width: 8px;
    height: 8px;
    border-radius: 50%;
}
</style>
