<script>
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      invalidValues: [
        'none',
        'unknown',
        'n/a'
      ],
    };
  },
  computed: {
    ...mapGetters([
      'isModalVisible',
      'showButton',
      'characterInfo',
      'isError'
    ]),
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
});
</script>

<template>
  <div class="modal-component">
    <div class="button-box">
      <button class="close-button" @click="handleCloseClick">x</button>
    </div>

    <div v-if="isError" class="error-box">Unable to load information</div>

    <div class="info-box" v-else>
      <div v-if="characterInfo" class="info">
        <div>
          <span class="info__title">Name:</span>
          {{ characterInfo.name }}
        </div>
        <div>
          <span class="info__title">Height:</span>
          {{ characterInfo.height }}
        </div>
        <div v-if="!invalidValues.includes(characterInfo.mass)">
          <span class="info__title">Mass:</span>
          {{ characterInfo.mass }}
        </div>
        <div v-if="!invalidValues.includes(characterInfo.hair_color)">
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
        <div v-if="!invalidValues.includes(characterInfo.birth_year)">
          <span class="info__title">Birth year:</span>
          {{ characterInfo.birth_year }}
        </div>
        <div v-if="!invalidValues.includes(characterInfo.gender)">
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
            <li v-for="specie in characterInfo.species" :key="specie">
              {{ specie }}
            </li>
          </ul>
        </div>
        <div v-if="!!characterInfo.vehicles.length">
          <div class="info__title">Vehicles:</div>
          <ul class="list">
            <li v-for="vehicle in characterInfo.vehicles" :key="vehicle">
              {{ vehicle }}
            </li>
          </ul>
        </div>
        <div v-if="!!characterInfo.starships.length">
          <div class="info__title">Starships:</div>
          <ul class="list">
            <li v-for="starship in characterInfo.starships" :key="starship">
              {{ starship }}
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

      <div v-else class="loader">
        <div class="loader__dot"></div>
        <div class="loader__dot"></div>
        <div class="loader__dot"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../style/mixins.scss';

.modal-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  width: max-content;
  height: max-content;
  border: 1px solid #e4e4e4;

  @include onMobile {
    width: 300px;
    height: max-content;
  }
}

.button-box {
  display: flex;
  justify-content: end;

  margin: 10px 10px 0 0;
}

.close-button {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  color: #656565;
  font-size: 14px;

  border: none;
  border-radius: 10px;

  transform: all 0.2s;
  cursor: pointer;

  &:hover {
    filter: opacity(50%);
  }

  @include onMobile {
    width: 20px;
    height: 20px;

    border-radius: 5px;
    }
  }

.error-box {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  font-weight: 500;
  color: #6e0202;

  width: 700px;
  height: 100px;

  padding-bottom: 30px;

  @include onMobile {
    width: 300px;
    padding-bottom: 20px;
    font-size: 20px;
  }
}

.info-box {
  width: max-content;
}

.info {
  width: max-content;
  height: max-content;
  padding: 10px 50px 30px 50px;

  font-size: 16px;
  font-weight: 400;

  &__title {
    color: #040074;
    font-weight: 600;
  }

  @include onMobile {
    padding: 5px 10px 10px 10px;
    width: 300px;
    height: max-content;
  }
}

.list {
  padding-left: 30px;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 100px;
  padding: 30px 30px 40px 30px;

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