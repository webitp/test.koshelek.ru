<template>
  <div>
    <div v-if="items.length">
      <v-list>
        <v-list-group
          v-for="item in paginateItems"
          :key="item.id"
          v-model="item.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-action>
              <v-btn
                icon
                :color="item.favourite ? 'indigo' : 'gray'"
                @click="addToFavourite(item)"
              >
                <v-icon>mdi-star</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>#{{ item.id }} {{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.id"
          >
            <v-list-item-content>
              <v-list-item-title>#{{ child.id }} {{ child.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-pagination
        v-model="page"
        :length="Math.ceil(items.length / PAGE_ITEMS)"
      ></v-pagination>
    </div>
    <p v-else>Здесь пока пусто</p>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    PAGE_ITEMS: 10,

    page: 1,
  }),

  computed: {
    paginateItems() {
      const startPos = this.PAGE_ITEMS * (this.page - 1)
      return this.items.slice(startPos, startPos + this.PAGE_ITEMS)
    }
  },

  methods: {
    addToFavourite(payload) {
      this.$store.dispatch('items/addToFavourite', payload)
      this.$emit('update')
    }
  }
}
</script>