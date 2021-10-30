<template>
  <v-container>
    <h1>История</h1>
    <v-row class="mt-3">
      <v-col>
        <v-card>
          <v-card-text>
            <v-tabs v-model="tab">
              <v-tab v-for="(item, index) in tabs" :key="index" @click="redirect(item.name)">{{ item.title }}</v-tab>
            </v-tabs>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-col>
        <v-card>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Действие
                    </th>
                    <th class="text-left">
                      Предмет
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in paginateItems"
                    :key="index"
                  >
                    <td>
                      <v-icon v-if="item.type" color="primary">
                        mdi-plus
                      </v-icon>
                      <v-icon v-else color="red">
                        mdi-delete
                      </v-icon>
                    </td>
                    <td>#{{ item.item.id}} {{ item.item.name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-pagination
              v-if="paginateItems.length"
              v-model="page"
              :length="Math.ceil(history.length / PAGE_ITEMS)"
            ></v-pagination>
            <p v-else class="mt-3 text-center">Здесь пока ничего нет</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    PAGE_ITEMS: 10,

    page: 1,
    tab: 0,

    tabs: [
      {
        name: 'all',
        title: 'История'
      },
      {
        name: 'add',
        title: 'История добавлений'
      },
      {
        name: 'remove',
        title: 'История удалений'
      }
    ]
  }),

  created() {
    const currentTab = this.tabs.filter(e => e.name == this.$route.params.param)[0] || {};
    this.tab = this.tabs.indexOf(currentTab)
  },

  methods: {
    redirect(type) {
      this.$router.push({ name: 'History', params: { param: type } })
    }
  },

  computed: {
    history() {
      const type = this.$route.params.param
      const actions = this.$store.getters['history/actions']()
      if (type == 'add')
        return actions.filter(e => e.type)
      if (type == 'remove')
        return actions.filter(e => !e.type)
      return actions
    },

    paginateItems() {
      const startPos = this.PAGE_ITEMS * (this.page - 1)
      return this.history.slice(startPos, startPos + this.PAGE_ITEMS)
    }
  }
}
</script>
