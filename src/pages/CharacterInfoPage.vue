<script>
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    ...mapGetters(['isModalVisible', 'showButton']),
  },
  methods: {
    ...mapActions(['openModal']),
    handleButtonClick() {
      this.openModal();
    },
    previousPage() {
      this.$router.push('/calculator');
    },
  },
});
</script>

<template>
  <div class="container">
    <div class="button-previous-page" @click="previousPage">
      ← Back
    </div>
    <button
      class="modal-button"
      v-if="showButton"
      @click="handleButtonClick"
    >
    character information
    </button>
      <info-page :class="{ modal: isModalVisible }" v-if="isModalVisible"></info-page>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.button-previous-page {
  position: absolute;
  bottom: 20px;
  left: 20px;

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
}

.modal-button {
  position: relative;
  display: inline-block;
  width: 300px;
  height: 70px;

  background-color: #000;
  border: 0;
  border-radius: 56px;

  font-size: 16px;
  text-transform: uppercase;
  outline: 0;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 16px 21px;
  
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;

  &:before {
    position: absolute;
    top: 0;
    content: "";

    background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
    border-radius: 125px;

    height: 50%;
    left: 4%;
    opacity: 0.5;

    transition: all 0.3s;
    width: 92%;
  }

  &:hover {
    box-shadow: rgba(255, 255, 255, .2) 0 3px 15px inset, rgba(0, 0, 0, .1) 0 3px 5px, rgba(0, 0, 0, .1) 0 10px 13px;
    transform: scale(1.2);
  }
}

.modal {
  width: 300px;
  height:300px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(54, 62, 113, 0.24);

  opacity: 0;
  transform: scale(0.5);
  animation: modalOpen 0.3s forwards;
}

@keyframes modalOpen {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
