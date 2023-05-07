<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      buttons: [
        { id: 1, value: 'AC', type: 'clear' },
        { id: 2, value: '+/-', type: 'sign' },
        { id: 3, value: '%', type: 'percent' },
        { id: 4, value: '÷', type: 'operator' },
        { id: 5, value: '7', type: 'number' },
        { id: 6, value: '8', type: 'number' },
        { id: 7, value: '9', type: 'number' },
        { id: 8, value: 'x', type: 'operator' },
        { id: 9, value: '4', type: 'number' },
        { id: 10, value: '5', type: 'number' },
        { id: 11, value: '6', type: 'number' },
        { id: 12, value: '-', type: 'operator' },
        { id: 13, value: '1', type: 'number' },
        { id: 14, value: '2', type: 'number' },
        { id: 15, value: '3', type: 'number' },
        { id: 16, value: '+', type: 'operator' },
        { id: 17, value: '0', type: 'zero' },
        { id: 18, value: '.', type: 'number' },
        { id: 19, value: '=', type: 'equal' }
      ]
    };
  },
  computed: {
    ...mapGetters(['currentDisplay'])
  },
  methods: {
    ...mapActions([
      'handleDigitClick',
      'handleOperatorClick',
      'handleSignClick',
      'handlePercentClick',
      'handleEqualClick',
      'handleClearClick'
    ]),
    ...mapMutations(['clearCalculator']),
    nextPage() {
      this.clearCalculator();
      this.$router.push('/character-info');
    },
    onButtonClick(button) {
      switch(button.type) {
        case 'number':
          this.handleDigitClick(button.value);
          break;
        case 'zero':
          this.handleDigitClick(button.value);
          break;
        case 'operator':
          this.handleOperatorClick(button.value);
          break;
        case 'sign':
          this.handleSignClick();
          break;
        case 'percent':
          this.handlePercentClick();
          break;
        case 'equal':
          this.handleEqualClick();
          break;
        case 'clear':
          this.handleClearClick();
          break;
        default:
          console.log('Unknown button');
      }
    }
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="calculator">
      <div class="calculator__top-container">
        <div class="header">
          <span class="header__time">09:41</span>
          <div class="header__status">
            <img
              class="header__status__battery"
              src="../assets/images/battery.png"
              alt="Battery"
            >
          </div>
        </div>
        <div class="value">{{ currentDisplay }}</div>
      </div>

      <div class="calculator__bottom-container">
        <div
          v-for="button in buttons"
          :key="button.id"
          class="button"
          :class="button.type"
          @click="onButtonClick(button)"
        >
          {{ button.value }}
        </div>
      </div>

      <div class="calculator__bottom-line"></div>
    </div>
    
    <div class="button-next-page" @click="nextPage">
    Next page →
    </div>
  </div>
</template>

<style lang="scss">
@import '../style/mixins.scss';

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  padding: 30px;
}

.calculator {
  width: 320px;
  height: 644px;

  border-radius: 50px;
  padding: 20px 20px 40px 20px;

  background: #000;
  color: #fff;

  border: 2px solid #afafaf;
  box-shadow: 0 8px 16px rgba(54, 62, 113, 0.24);

  &__top-container {
    display: flex;
    flex-direction: column;
    height: 230px;
    justify-content: space-between;
  }

  &__bottom-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 10px;
  }

  &__bottom-line {
    position: relative;

    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);

    width: 120px;
    height: 4px;

    border-radius: 4px;
    margin-bottom: 5px;

    background: white;

    @include onMobile {
      width: 110px;
      bottom: -20px;
    }
  }

  @include onMobile {
    width: 310px;
    height: 600px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;

  &__time {
    position: relative;
    left: -8px;

    font-size: 13px;
  }

  &__status {
    position: relative;
    right: -8px;

    &__battery {
      height: 13px;
      width: 72px;
    }
  }
}

.value {
  text-align: right;
  vertical-align: bottom;
  height: 50px;

  font-size: 62px;

  margin-bottom: 35px;
  padding-right: 10px;

  @include onMobile {
    padding-right: 6px;
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  width: 60px;

  background: #333;
  font-size: 28px;
  border-radius: 50%;

  transition: filter 0.3s;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;

  @include onMobile {
    width: 55px;
    height: 55px;
  }
}

.clear {
  font-size: 26px;
}

.button.clear,
.sign,
.percent {
  color: black;
  background: #a5a5a5;
}

.button.operator,
.equal {
  background: #f1a33c;
}

.button.zero {
  border-radius: 55px;
  grid-column: 1 / span 2;
  justify-content: flex-start;
  padding-left: 23px;
  width: 140px;
}

.button:hover {
  filter: brightness(120%);
}

.button-next-page {
  position: absolute;
  bottom: 20px;
  right: 20px;

  color: #9e9e9e;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;

  transform: all 0.2s;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;

  &:hover {
    filter: brightness(120%);
  }

  @include onMobile {
    bottom: 8px;
  }
}
</style>