<script>
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    ...mapGetters(['isModalVisible', 'showButton', 'characterInfo', 'isError']),
},
mounted() {
    this.fetchCharacterInfo();
  },
  methods: {
    ...mapActions(['closeModal', 'fetchCharacterInfo']),
    handleCloseClick() {
      this.closeModal();
    },
  },
  created() {
    this.fetchCharacterInfo();
  }
});
</script>

<template>
  <div class="modal-component">
    <div class="button-box">
      <button class="close-button" @click="handleCloseClick">x</button>
    </div>
    <div v-if="isError" class="error">Unable to load information</div>
    <div v-else>
      <div v-if="characterInfo" class="info">
        <div>
          <span class="info__title">Name:</span>
          {{ characterInfo.name }}
        </div>
        <div>
          <span class="info__title">Height:</span>
          {{ characterInfo.height }}
        </div>
        <div
          v-if="characterInfo.mass !== 'none'
            && characterInfo.mass !== 'unknown'
            && characterInfo.mass !== 'n/a'"
        >
          <span class="info__title">Mass:</span>
          {{ characterInfo.mass }}
        </div>
        <div
          v-if="characterInfo.hair_color !== 'none'
            && characterInfo.hair_color !== 'unknown'
            && characterInfo.hair_color !== 'n/a'"
          >
          <span class="info__title">Hair color:</span>
          {{ characterInfo.hair_color }}
        </div>
        <div>
          <span class="info__title">Skin color:</span>
          {{ characterInfo.skin_color }}
        </div>
        <div>
          <span class="info__title">Eye color:</span>
          {{ characterInfo.eye_color }}
        </div>
        <div
          v-if="characterInfo.birth_year !== 'none'
            && characterInfo.birth_year !== 'unknown'"
        >
          <span class="info__title">Birth year:</span>
          {{ characterInfo.birth_year }}
        </div>
        <div>
          <span class="info__title">Gender:</span>
          {{ characterInfo.gender }}
        </div>
        <div>
          <span class="info__title">Homeworld:</span>
          {{ characterInfo.homeworld }}
        </div>
        <div v-if="!!characterInfo.films.length">
          <div class="info__title">Films:</div>
          <ul class="list">
            <li v-for="film in characterInfo.films" :key="film">
              {{ film }}
            </li>
          </ul>
        </div>
        <div v-if="!!characterInfo.species.length">
          <div class="info__title">Species:</div>
          <ul class="list">
            <li v-for="species in characterInfo.species" :key="species">
              {{ species }}
            </li>
          </ul>
        </div>
        <div v-if="!!characterInfo.vehicles.length">
          <div class="info__title">Vehicles:</div>
          <ul class="list">
            <li v-for="vehicles in characterInfo.vehicles" :key="vehicles">
              {{ vehicles }}
            </li>
          </ul>
        </div>
        <div v-if="!!characterInfo.starships.length">
          <div class="info__title">Starships:</div>
          <ul class="list">
            <li v-for="starships in characterInfo.starships" :key="starships">
              {{ starships }}
            </li>
          </ul>
        </div>
        <div><span class="info__title">Created:</span>
          {{ characterInfo.created }}
        </div>
        <div><span class="info__title">Edited:</span>
          {{ characterInfo.edited }}
        </div>
        <div><span class="info__title">url:</span>
          {{ characterInfo.url }}
        </div>
      </div>
      <div v-else>
        <div class="loader">
          <div class="loader__dot"></div>
          <div class="loader__dot"></div>
          <div class="loader__dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  width: 700px;
  height: 700px;
  border: 1px solid #e4e4e4;
}

.button-box {
  display: flex;
  justify-content: end;

  margin-right: 30px;
}

.close-button {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  color: #656565;

  border: none;
  border-radius: 10px;

  transform: all 0.2s;
  cursor: pointer;

  &:hover {
    filter: opacity(50%);
  }
}

.error {
  position: relative;
  left: 230px;

  font-size: 20px;
  font-weight: 500;
  color: #6e0202;

  width: 300px;
  height: 30px;
}

.info {
  width: 600px;
  height: 600px;
  padding: 10px 50px 30px 50px;

  font-size: 16px;
  font-weight: 400;

  &__title {
    color: #040074;
    font-weight: 500;
  }
}

.list {
  padding-left: 30px;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

  &__dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #000;
    margin: 0 5px;
    animation: loader-anim 1s infinite ease-in-out alternate;
  }
}

@keyframes loader-anim {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.5);
    opacity: 1;
  }
}


</style>