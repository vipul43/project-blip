<template>
  <div id="faq">
    <v-container>
      <v-text-field
        v-model="questionSearch"
        label="Search your question"
        outlined
        clearable
      ></v-text-field>
      <v-row justify="center">
        <v-col>
          <v-expansion-panels popout>
            <v-expansion-panel v-for="(faq, i) in displayFaqs" :key="i">
              <v-expansion-panel-header disable-icon-rotate>
                <template v-slot:actions>
                  <v-icon> mdi-lightbulb-on </v-icon>
                </template>
                <div>{{ faq.question }}</div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-html="faq.answer" class="pa-4"></div>
                <div>By {{ faq.by }}</div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getAllFAQs } from "../api.js";

export default {
  name: "FAQ",
  data: () => ({
    questionSearch: null,
    faqs: [],
  }),
  computed: {
    displayFaqs() {
      if (this.questionSearch) {
        return this.faqs.filter((faq) => {
          return (
            faq.question
              .toLowerCase()
              .includes(this.questionSearch.toLowerCase()) ||
            faq.answer.toLowerCase().includes(this.questionSearch.toLowerCase())
          );
        });
      } else {
        return this.faqs;
      }
    },
  },
  async mounted() {
    getAllFAQs()
      .then((response) => {
        this.faqs = response.faqs;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  metaInfo() {
    return {
      title: "FAQ | Project BLiP",
    };
  },
};
</script>
