<template>
    <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
        <div class="flex justify-between items-center">
            <span class="font-light text-gray-600">{{ data.date }}</span>
            <a class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">{{ data.tag }}</a>
        </div>
        <div class="mt-2">
            <a class="text-2xl text-gray-700 font-bold hover:underline" href="#">{{ data.title }}</a>
            <p class="mt-2 text-gray-600">{{ data.body }}</p>
        </div>
        <div class="flex items-center mt-4">
          <div class="flex justify-between w-2.5">
            <div class="">
              <a class="text-blue-500 hover:underline" href="#">Read more</a>
            </div>
            <div  v-show="isAuth">
              <a  @click="showCommentModal=true"  data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="text-blue-500 hover:underline px-3" href="javascript:void(0);">Comment</a>

              <CommentModal
                  :blogId="data.id"
                  v-if="showCommentModal"
                  @hide-modal="showCommentModal=false"
              />
            </div>
            <font-awesome-icon icon="fa-solid fa-house" />
            <div v-show="isAuth">
              <a @click="likePost(data.id)" class="text-blue-500 hover:underline mr-0.25" href="javascript:void(0);">Like &emsp13; {{data.likes.length > 0 ? data.likes.length : ''}}</a>
            </div>
          </div>
          <div>
              <a class="flex items-center" href="#">
                  <img class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" :src="data.image" alt="avatar">
                  <h1 class="text-gray-700 font-bold hover:underline">{{ data.userName }}</h1>
              </a>
          </div>
        </div>
    </div>
</template>

<script>
import CommentModal from "@/components/CommentModal.vue";

export default {
  components: {CommentModal},
      props: ['data', 'isAuth'],
        data(){
          return {
            showCommentModal: false,
          }
        },
        methods: {
          async likePost(postId) {
            const response = await this.axios.post(`/blogs/${postId}/like`)

            if (response.status === 200 ) {
              this.$emit('liked-post')
            }
          }
        }
    }
</script>
