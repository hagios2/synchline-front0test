<template>
  <div id="app" class="font-roboto bg-gray-100">
    <navbar></navbar>

    <div class="px-6 py-8">
      <div class="flex justify-between container mx-auto">
        <div class="w-full lg:w-8/12">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
<!--            <post-filter></post-filter>-->
            <button @click="showAddPostModal=true" v-show="isAuth" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
              Add Blog Post
            </button>
          </div>

          <!-- Main modal -->
          <AddBlogModal
              :categories="categories"
              v-if="showAddPostModal"
              @hide-modal="showAddPostModal=false"
              @add-post="getBlogPost()"
          />

          <div class="mt-6" v-for="post in posts" :key="post.id">
            <post
                :isAuth="isAuth"
                :data="post"
                :categories="categories"
                @liked-post="getBlogPost"
                @updated-post="getBlogPost"
                @post-deleted="getBlogPost"
            ></post>
          </div>
<!--          <div class="mt-8">-->
<!--            <Pagination></Pagination>-->
<!--          </div>-->
        </div>
        <div class="-mx-8 w-4/12 hidden lg:block">
          <div class="px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">Authors</h1>
            <users-list></users-list>
          </div>
          <div class="mt-10 px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">Categories</h1>
            <Categories :categories="categories"/>
          </div>
          <div class="mt-10 px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
            <recent-post></recent-post>
          </div>
        </div>
      </div>
    </div>

    <simple-footer></simple-footer>
  </div>
</template>

<script>
import Navbar from "@/components/navigation-navbar-simple";
import Post from "@/components/elements-blog-post-article-review";
import UsersList from "@/components/sections-blog-users-list";
import Categories from "@/components/sections-categories-list";
import RecentPost from "@/components/sections-recent-article";
import SimpleFooter from "@/components/navigation-footer-simple-with-icon";
import AddBlogModal from "@/components/AddBlogModal.vue";
import Cookies from "js-cookie";
import moment from "moment";

export default {
  name: 'app',
  components: {
    Navbar,
    // PostFilter,
    Post,
    // Pagination,
    UsersList,
    Categories,
    RecentPost,
    SimpleFooter,
    AddBlogModal
  },
  data() {
    return {
      isAuth: false,
      showAddPostModal: false,
      categories: [],
      posts: [
        {
          id: 1,
          date: "Jun 1, 2020",
          likes: [],
          tag: "Laravel",
          title: "Build Your New Idea with Laravel Freamwork.",
          body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
          image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
          userName: "Alex John"
        },
      ]
    }
  },
  mounted() {
    this.getBlogPost()
    this.getCategories()
    this.isAuth = Cookies.get('authToken') !== undefined

    const channel = this.$pusher.subscribe('synchline-channel');
    channel.bind('new-blog', data => {
          const blog = data
          const formattedData = {
            id: blog._id,
            date: moment(blog.publicationDate).format('MM/DD/YYYY'),
            tag: blog.tags[0],
            title: blog.title,
            body: blog.content,
            likes: blog.likes ?? [],
            category: blog.category,
            comments: blog.comments,
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
            userName: blog?.user?.username,
            user: blog?.user
          }

          this.posts.unshift(formattedData)
    });
  },
  methods: {
    async getCategories() {
      const response = await this.axios.get('/category')
      this.categories = response.data.data.map((category) => {
        return {
          id: category._id,
          name: category.name
        }
      });
    },
    async getBlogPost() {
      const response = await this.axios.get('blogs')
      this.posts = response.data.data.map((blog) => {
        return {
          id: blog._id,
          date: moment(blog.publicationDate).format('MM/DD/YYYY'),
          tag: blog.tags[0],
          title: blog.title,
          body: blog.content,
          likes: blog.likes ?? [],
          category: blog.category,
          comments: blog.comments,
          image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
          userName: blog?.user?.username,
          user: blog?.user
        }
      });
    },
  },
}
</script>

<style>
@import "../assets/css/app.css";

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #2D3748;
}

::-webkit-scrollbar-thumb {
  background: #CBD5E0;
}

::-webkit-scrollbar-thumb:hover {
  background: #2D3748;
}
</style>
