<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert'

export default {
  name: "AddBlogModal.vue",
  props:  ['categories'],
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {},
      showAddPostModal: 'none',
      title: '',
      tags: '',
      category: '',
      publicationDate: ''
    }
  },
  methods: {
    async submit() {
      const data = {
        title: this.title,
        tag: this.tags.split(','),
        content: this.editorData,
        // category: this.category?._id ?? '662f2e85aef4af2d960b3d60',
        publicationDate: this.publicationDate
      }
      const response = await this.axios.post('/blogs', data)

      // // eslint-disable-next-line no-console
      // console.log(response.data.error)

      if (response.status === 200) {
        await swal({
          text: "Added post successfully",
          icon: "success",
          closeOnClickOutside: false,
        });

        this.title = ''
        this.tags = ''
        this.editorData = ''
        this.category = ''
        this.publicationDate = ''

        this.$emit('add-post', response)
      } else  {
        await swal({
          text: response.data,
          icon: "success",
          closeOnClickOutside: false,
        });
      }
    }
  }
}
</script>

<template>
  <div id="crud-modal" tabindex="-1" aria-hidden="true" class="insert-0 bg-gray-700 bg-opacity-50 h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-screen">
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
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input v-model="title" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
              <small class="text-red-700">Name is Required </small>
            </div>
            <div class="col-span-2">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags (Ex: Fashion, Tech)</label>
              <input v-model="tags" type="text" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter comma separated tags here" required="">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
              <select v-model="category" id="icategory" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="">Select category</option>
                <option v-for="category in categories" :key="category._id" :value="category">{{category.name}}</option>
              </select>
              <small class="text-red-700">Category is Required </small>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publication Date</label>
              <input v-model="publicationDate" type="date" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-600 dark:focus:border-primary-500">
            </div>
            <div id="app" class="col-span-2">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
              <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
              <small class="text-red-700">Content is Required </small>
            </div>
          </div>
          <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            Add new product
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
