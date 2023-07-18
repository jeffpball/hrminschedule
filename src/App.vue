<script setup>
  import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
  const auth = useAuthenticator();
  import '@aws-amplify/ui-vue/styles.css';
  import Schedule from './components/Schedule.vue';

  const vClickOutside = {
    beforeMount(el, binding, vnode) {
        el.eventSetDrag = function () {
            el.setAttribute('data-dragging', 'yes');
        }
        el.eventClearDrag = function () {
            el.removeAttribute('data-dragging');
        }
        el.eventOnClick = function (event) {
            var dragging = el.getAttribute('data-dragging');
            // Check that the click was outside the el and its children, and wasn't a drag
            if (!(el == event.target || el.contains(event.target)) && !dragging) {
                // call method provided in attribute value
                binding.value(event);
            }
        };
        document.addEventListener('touchstart', el.eventClearDrag);
        document.addEventListener('touchmove', el.eventSetDrag);
        document.addEventListener('click', el.eventOnClick);
        document.addEventListener('touchend', el.eventOnClick);
    },
    unmounted(el) {
        document.removeEventListener('touchstart', el.eventClearDrag);
        document.removeEventListener('touchmove', el.eventSetDrag);
        document.removeEventListener('click', el.eventOnClick);
        document.removeEventListener('touchend', el.eventOnClick);
        el.removeAttribute('data-dragging');
    }
  };

</script>

<template>
  <div class="main-body" :class="{ authbackground: signintoggle && auth.route != 'authenticated'}">

    <div :class="{ header: auth.route !== 'authenticated' }">
      <button class="home-signin-button" v-if="auth.route !== 'authenticated'" v-on:click="toggleSignin()">
        <span class="fw-600" v-if="signintoggle">Home</span>
        <span class="fw-600" v-else>Sign in</span>
      </button>
    </div>

      <div style="display:none" :class="{ togglezindexabove: signintoggle && auth.route !== 'authenticated', displaySignout: auth.route === 'authenticated' }" >

        <authenticator>
          <template v-slot="{ signOut }">
            <div class="header">
              <!-- <h1>Account: {{ user.attributes.email }}</h1> -->
              <button @click="signOut(); setSignInToggleFalse();">Sign Out</button>
            </div>
          </template>
        </authenticator>

      </div>
     

      <!-- <Schedule v-if="!signintoggle" :authenticated="auth.route"></Schedule> -->

      <Schedule :authenticated="auth.route" :signintoggle="signintoggle"></Schedule>

  </div>
 
  <div class="footer">
    <p>Email jeffpball@gmail.com with feedback</p>
  </div>

</template>


<script>
  export default {
    name: 'Landing',
    data() {
      return {
        signintoggle: false
      };
    },
    methods: {
      toggleSignin(){
          this.signintoggle = !this.signintoggle;
      },
      setSignInToggleFalse() {
          this.signintoggle = false;
      }
    }
  };
</script>