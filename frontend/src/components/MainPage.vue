<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerR"
      app
      clipped
      right
    >
      <h2 style="text-align: center">Current Configuration</h2>
      <v-list>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawerL = !drawerL"></v-app-bar-nav-icon>
      <v-toolbar-title>Test Generator</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawerR = !drawerR"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawerL"
      app
    >
      <v-list dense>

      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col class="shrink">
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer
      app
    >
      <span>glipR</span>
      <v-spacer></v-spacer>
      <span><v-btn color="success" target="_blank" href="https://github.com/glipR/TestGenerator">View on Github</v-btn></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawerL: null,
    drawerR: true,
  })
}
</script>
