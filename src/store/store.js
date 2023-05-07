import { createStore } from 'vuex';
import { getInfo } from '../api/info.js';

const store = createStore({
  state: {
    displayValue: '0',
    operator: null,
    waitingForOperand: false,
    storedValue: null,
    isModalVisible: false,
    showButton: true,
    characterInfo: null,
    error: null,
  },
  getters: {
    currentDisplay: state => state.displayValue,
    isModalVisible: state => state.isModalVisible,
    showButton: state => state.showButton,
    characterInfo: state => state.characterInfo,
    isError: state => state.error !== null,
  },
  mutations: {
    updateDisplay(state, value) {
      state.displayValue = value;
    },
    clearDisplay(state) {
      state.displayValue = '0';
      state.operator = null;
      state.waitingForOperand = false;
      state.storedValue = null;
    },
    updateOperator(state, operator) {
      state.operator = operator;
      state.waitingForOperand = true;
      state.storedValue = parseFloat(state.displayValue);
    },
    changeSign(state) {
      state.displayValue = (-1 * parseFloat(state.displayValue)).toString();
    },
    calculatePercent(state) {
      state.displayValue = (parseFloat(state.displayValue) / 100).toString();
    },
    calculateResult(state) {
      const currentValue = parseFloat(state.displayValue);
  
      if (state.operator === '+') {
        state.displayValue = state.storedValue + currentValue;
      }
      
      if (state.operator === '-') {
        state.displayValue = state.storedValue - currentValue;
      }
      
      if (state.operator === 'x') {
        state.displayValue = state.storedValue * currentValue;
      }
      
      if (state.operator === '÷') {
        state.displayValue = state.storedValue / currentValue;
      }
  
      state.displayValue = state.displayValue.toString();
      state.operator = null;
      state.waitingForOperand = false;
      state.storedValue = null;
    },
    setModalVisible(state, visible) {
      state.isModalVisible = visible;
    },
    setShowButton(state, value) {
      state.showButton = value;
    },
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    handleDigitClick({ state, commit }, digit) {
      if (state.waitingForOperand) {
        commit('updateDisplay', digit);
        state.waitingForOperand = false;
      } else {
        if (state.displayValue === '0' && digit !== '.') {
          commit('updateDisplay', digit);
        } else {
          const newDisplayValue = (state.displayValue + digit).slice(0, 7);
          commit('updateDisplay', newDisplayValue);
        }
      }
    },
    handleOperatorClick({ commit }, operator) {
      commit('updateOperator', operator);
    },
    handleSignClick({ state, commit }) {
      const currentValue = parseFloat(state.displayValue);
      commit('updateDisplay', -currentValue);
    },
    handlePercentClick({ state, commit }) {
      const currentValue = parseFloat(state.displayValue);
      commit('updateDisplay', currentValue / 100);
      state.waitingForOperand = true;
    },
    handleEqualClick({ commit }) {
      commit('calculateResult');
    },
    handleClearClick({ commit }) {
      commit('clearDisplay');
    },
    openModal({ commit }) {
      commit('setModalVisible', true);
      commit('setShowButton', false);
    },
    closeModal({ commit }) {
      commit('setModalVisible', false);
      commit('setShowButton', true);
    },
    async fetchCharacterInfo({ commit }) {
      try {
        const randomCharacterId = Math.floor(Math.random() * 82) + 1;
        const response = await getInfo(randomCharacterId);
        const data = response.data;

        commit('setCharacterInfo', data);
      } catch (error) {
        commit('setError', error);
      }
    },
  },
});

export default store;
