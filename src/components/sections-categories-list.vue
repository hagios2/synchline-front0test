<template>
    <div class="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
        <ul class="" v-for="category in categories" :key="category._id">
            <li>
                <a class="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline" href="#">- {{category.name}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
      props: ['categories'],
    }
</script>
