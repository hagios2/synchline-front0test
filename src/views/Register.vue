<template>
  <div>
    <!--    <navbar-component></navbar-component>-->
    <main>
      <section class="absolute w-full h-full">
        <div
            class="absolute top-0 w-full h-full bg-gray-900"
            style="background-size: 100%; background-repeat: no-repeat;"
            :style="{'background-image': 'url(' + require('../assets/img/register_bg_2.png').default + ')'}"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              >
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">
                      Register with
                    </h6>
                  </div>
                  <div class="btn-wrapper text-center">
                    <button
                        class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style="transition: all 0.15s ease 0s;"
                    >
                      <img
                          alt="..."
                          class="w-5 mr-1"
                          src="../assets/img/github.svg"
                      />Github</button
                    ><button
                      class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                      style="transition: all 0.15s ease 0s;"
                  >
                    <img
                        alt="..."
                        class="w-5 mr-1"
                        src="../assets/img/google.svg"
                    />Google
                  </button>
                  </div>
                  <hr class="mt-6 border-b-1 border-gray-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div class="text-gray-500 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div>
                  <div class="text-center font-bold mb-3" v-show="responseErr!==''">
                    <small class="text-red-600" >{{responseErr}}</small>
                  </div>
                  <form @submit.prevent="login">
                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                      >Username</label
                      ><input
                        v-model="username"
                        type="text"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style="transition: all 0.15s ease 0s;"
                    />
                      <small class="text-red-600" v-show="showUsernameErr">Username is required</small>
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                      >Email</label
                      ><input
                        v-model="email"
                        type="email"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style="transition: all 0.15s ease 0s;"
                    />
                      <small class="text-red-600" v-show="showEmailErr"> Email is required</small>
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                      >Password</label
                      ><input
                        v-model="password"
                        type="password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s;"
                    />
                      <small class="text-red-600" v-show="showPasswordErr"> Password is required</small>
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                      >Confirm Password</label
                      ><input
                        v-model="confirmPassword"
                        type="password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s;"
                    />
                      <small class="text-red-600" v-show="showConPasswordErr">Confirm Password is required</small>
                      <small class="text-red-600" v-show="showMisMatch">Password Mismatch</small>
                    </div>
                    <div class="text-center mt-6">
                      <button
                          class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style="transition: all 0.15s ease 0s;"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                  <div class="flex flex-wrap mt-4 text-center">
                    <div class="w-1/2">
                      <RouterLink to="/login" class="text-gray-600"
                      ><small>Login</small></RouterLink
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import swal from "sweetalert";

export default {
  name: "register-page",
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      showEmailErr: false,
      showUsernameErr: false,
      showConPasswordErr: false,
      showPasswordErr: false,
      showMisMatch: false,
      responseErr: ''
    }
  },
  methods: {
    async login() {
      try {
        if (this.email === '' || this.password === '' || this.confirmPassword === '' || this.password !== this.confirmPassword || this.username === '') {
          this.showEmailErr = this.email === '';
          this.showUsernameErr = this.username === '';
          this.showPasswordErr = this.password === '';
          this.showConPasswordErr = this.confirmPassword === '';
          this.showMisMatch = this.confirmPassword !== this.password;
          return
        }

        const response = await this.axios.post('/auth/signup', {email: this.email, password: this.password, username: this.username})

        this.responseErr = ''
        if (response.status === 200) {
          await this.$router.push('/login')
        }

      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.response)
        if (err.response.status === 422) {
          this.responseErr = err.response.data.error
        } else {
          swal({
            text: 'Something went wrong',
            icon: "error",
            closeOnClickOutside: false,
          }).then(()=> {});
        }
      }
    }
  }
}
</script>
