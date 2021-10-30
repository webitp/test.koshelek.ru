<template>
  <v-container>
    <h1>Главная</h1>
    <v-row class="mt-3">
      <v-col width="50%">
        <v-card>
          <v-card-text>
            <v-tabs>
              <v-tab>Все предметы</v-tab>
              <v-tab @click="redirect('all')">История</v-tab>
              <v-tab @click="redirect('add')">История добавлений</v-tab>
              <v-tab @click="redirect('remove')">История удалений</v-tab>
            </v-tabs>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-col cols="6">
        <v-card>
          <v-card-title>Предметы</v-card-title>
          <v-card-subtitle>
            <v-text-field v-model.trim="search" placeholder="Search" />
          </v-card-subtitle>
          <v-card-text>
            <ItemsList :items="searchItems" @update="onUpdateData()" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Избранное</v-card-title>
          <v-card-text>
            <ItemsList :items="favourites" @update="onUpdateData()" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemsList from '@/components/items/List.vue'

import searchService from '@/services/search/items'

export default {
  components: {
    ItemsList
  },

  data: () => ({
    search: '',

    list: [],
    favourites: []
  }),

  async beforeCreate() {
    await this.$store.dispatch('items/update');
  },

  async created() {
    await this.$store.dispatch('items/update');
    this.onUpdateData();
  },

  methods: {
    redirect(type) {
      this.$router.push({ name: 'History', params: { param: type } })
    },

    searchCondition(item) {
      return item.name.toLowerCase().split(this.search.toLowerCase()).length - 1
    },

    onUpdateData() {
      this.list = this.$store.getters['items/list']().filter((e) => e && !e.favourite);
      this.favourites = this.$store.getters['items/list']().filter((e) => e && e.favourite);
    }
  },

  computed: {
    searchItems() {
      const items = searchService.search(this.search, this.list)
      if (this.search.length)
        return searchService.sort(items)
      return items
    }
  }
}
</script>

