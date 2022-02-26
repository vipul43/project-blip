<template>
  <div id="blog">
    <v-container>
      <div v-if="blogs.length">
        <v-row v-for="blog in blogs" :key="blog._id" justify="center">
          <v-col>
            <v-card hover link :to="getBlogLink(blog)">
              <v-card-title>{{ blog.title }}</v-card-title>
              <v-img
                v-if="blog.cover"
                height="200"
                :src="getBlogCover(blog)"
              ></v-img>
              <v-card-text class="pa-4">{{ blog.context }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>No Blogs Yet</div>
    </v-container>
  </div>
</template>

<script>
import { getAllBlogs } from "../api.js";

export default {
  name: "Blog",
  data: () => ({
    blogs: [],
  }),
  methods: {
    getBlogCover(blog) {
      return `https://vipul43.sirv.com/projectblip/blogs/${blog.cover}`;
    },
    getBlogLink(blog) {
      return `/blog/${blog._id}`;
    },
  },
  async mounted() {
    getAllBlogs().then((response) => {
      this.blogs = response.blogs;
    });
  },
  metaInfo() {
    return {
      title: "Blog | Project BLiP",
    };
  },
};
</script>
