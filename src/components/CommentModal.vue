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
      editorData: '<p>Add comment here</p>',
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
      const data = {
        comment: this.editorData
      }
      const response = await this.axios.post('/blogs/:id/comment', data)

      // // eslint-disable-next-line no-console
      // console.log(response.data.error)

      if (response.status === 200) {


        this.editorData = 'Add comment here'

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
            Add New Blog
          </h3>
          <button type="button" @click="$emit('hide-modal')" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5" @submit.prevent="submit">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div id="app" class="col-span-2">
              <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
            </div>
          </div>
          <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            Send
          </button>
        </form>
        <div class="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
          <ul class="-mx-4">
            <li v-for="review in comments" :key="review._id" class="flex items-center">
              <img class="w-10 h-10 object-cover rounded-full mx-4" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar">
              <p>
<!--                <a class="text-gray-700 font-bold mx-1 hover:underline" href="#">{{review.comment}}</a>-->
                <span>{{review.comment}}</span>
                <span class="text-gray-700 text-sm font-light">{{moment(review.createdAt).format('MM/DD/YYYY H:i:s')}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
