<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert'

export default {
  name: "AddBlogModal.vue",
  props:  ['categories', 'blog'],
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p></p>',
      editorConfig: {},
      showAddPostModal: 'none',
      title: '',
      tags: '',
      category: '',
      publicationDate: '',
      titleErr: false,
      categoryErr: false,
      editorDataErr: false,
    }
  },
  watch: {
    blog(newVal, oldvalue) {
      // eslint-disable-next-line no-console
      console.log('blog', newVal)

      // eslint-disable-next-line no-console
      console.log('blog', oldvalue)

      if (newVal) {
        this.editorData = newVal.body
        this.title = newVal.title
        this.tags = newVal.tags?.toString()
        this.category = newVal.category
        this.publicationDate = newVal.date
      }
    }

  },
  methods: {
    async submit() {
      if (this.category === '' || this.editorData === '<p></p>' || this.title === '') {
        this.titleErr = this.title === ''
        this.editorDataErr = this.editorData === '<p></p>'
        this.categoryErr = this.category === ''
        return
      }
      try {
        const data = {
          title: this.title,
          tag: this.tags.split(','),
          content: this.editorData,
          category: this.category,
          publicationDate: this.publicationDate
        }

        const url = this.blog ? `/blogs/${this.blog.id}` : '/blogs'
        const message = this.blog ? `Post Updated successfully` : 'Added Post successfully'
        const eventName = this.blog ? 'updated-post' : 'add-post'

        let response = null
        if (this.blog) {
         response = await this.axios.put(url, data)
        } else {
          response = await this.axios.post(url, data)
        }

        if (response.status === 200) {
          await swal({
            text: message,
            icon: "success",
            closeOnClickOutside: false,
          });

          this.title = ''
          this.tags = ''
          this.editorData = '<p></p>'
          this.category = ''
          this.publicationDate = ''

          this.$emit(eventName, response)
        }
      } catch (err) {
        await swal({
          text: err.data.error,
          icon: "error",
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
            {{blog ? 'Edit Post' : 'Add Post'}}
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
              <small v-if="titleErr" class="text-red-700">Name is Required </small>
            </div>
            <div class="col-span-2">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags (Ex: Fashion, Tech)</label>
              <input v-model="tags" type="text" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter comma separated tags here" required="">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
              <select v-model="category" id="icategory" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="">Select category</option>
                <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{cat.name}}</option>
              </select>
              <small v-if="categoryErr" class="text-red-700">Category is Required </small>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publication Date</label>
              <input v-model="publicationDate" type="date" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-600 dark:focus:border-primary-500">
            </div>
            <div id="app" class="col-span-2">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
              <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
              <small v-if="editorDataErr" class="text-red-700">Content is Required </small>
            </div>
          </div>
          <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
