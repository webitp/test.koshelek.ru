<template>
  <v-app>
    <v-navigation-drawer app dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Кошелек.ру
          </v-list-item-title>
          <v-list-item-subtitle>
            Тестовое задание
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in navbar"
          :key="item.title"
          :href="item.href"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    navbar: [
      {
        title: 'Главная',
        icon: 'mdi-view-dashboard',
        href: '/'
      },
      {
        title: 'История',
        icon: 'mdi-view-list',
        href: '/history/all'
      }
    ]
  }),
};
</script>
