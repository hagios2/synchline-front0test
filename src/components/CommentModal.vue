<script>
import swal from "sweetalert";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";

export default {
  name: "CommentModal",
  computed: {
    moment() {
      return moment
    }
  },
  props: ['blogId'],
  data(){
    return {
      comments: [],
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {},
    }
  },
  mounted() {
    this.getComments()
  },
  methods: {
    async getComments(){
      const blogId = this.blogId
      const response = await this.axios.get(`/blogs/${blogId}/comment`)
      this.comments = response.data.data

      // eslint-disable-next-line no-console
      console.log(response.data.data)
    },
    async submit() {
      const blogId = this.blogId
      const data = {
        comment: this.editorData
      }
      const response = await this.axios.post(`/blogs/${blogId}/comment`, data)

      // // eslint-disable-next-line no-console
      // console.log(response.data.error)

      if (response.status === 200) {
        this.editorData = ''
        await this.getComments()
      } else  {
        await swal({
          text: response.data,
          icon: "error",
          closeOnClickOutside: false,
        });
      }
    }
  }
}
</script>

<template>
  <div id="comment-modal" tabindex="-1" aria-hidden="true" class="insert-0 bg-gray-700 bg-opacity-50 h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-screen">
    <div class="relative p-4 w-full max-w-4xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-[90vh]">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Comments
          </h3>
          <button type="button" @click="$emit('hide-modal')" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->

        <form @submit.prevent="submit">
          <div class="w-full mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
              <label for="comment" class="sr-only">Your comment</label>
              <textarea id="comment" rows="4" v-model="editorData" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
            </div>
            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-300">
              <button type="submit" class="inline-flex items-center py-3 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Post comment
              </button>
              <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                  </svg>
                  <span class="sr-only">Attach file</span>
                </button>
                <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                  </svg>
                  <span class="sr-only">Set location</span>
                </button>
                <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                  </svg>
                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </form>
        <div class="relative w-full overflow-y-scroll bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 h-96">
          <ul>
            <li class="border-b border:gray-100 dark:border-gray-600 py-4" v-for="review in comments" :key="review._id">
              <a href="#" class="flex items-center w-full px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800">
                <img class="w-10 h-10 object-cover rounded-full mx-4"
                     src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="Jese Leos Avatar">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">{{review.user.username}}</span>: {{review.comment}}</p>
                  <span class="text-xs text-blue-600 dark:text-blue-500">{{moment(review.createdAt).format('MM/DD/YYYY H:i:s')}}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
