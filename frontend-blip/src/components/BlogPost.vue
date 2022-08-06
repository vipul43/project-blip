<!-- TODO: LATER -->
<!-- <template>
  <div id="blog-post">
    <v-container>
      <h1 class="pb-2">{{ blog.title }}</h1>
      <h5 class="pb-6">{{ blog.context }}</h5>
      <v-divider></v-divider>
      <div class="pa-4" v-html="blog.content"></div>
    </v-container>
  </div>
</template>

<script>
import { getBlog } from "../api.js";

export default {
  name: "BlogPost",
  props: ["blogId"],
  data: () => ({
    blog: "",
  }),
  async mounted() {
    getBlog(this.blogId).then((response) => {
      this.blog = response.blog;
    });
  },
};
</script> -->
