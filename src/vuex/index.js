import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    userid : '',
};

const mutations = {
    
}

let store = new Vuex.Store({
    state,
    mutations
})

export default store