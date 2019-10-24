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
        {{ generator_object }}
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
      <Container
        :current_generator="current_object"
        :global_generator="generator_object"
      />
    </v-navigation-drawer>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <div :is="get_component"></div>
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
import Integer from './Options/Integer';
import Container from './ListElements/Container';

export default {
  props: {
    source: String
  },
  components: {
    Integer,
    Container
  },
  data: () => ({
    generator_object: {},
    keys: [],
    drawerL: null,
    drawerR: true,
  }),
  computed: {
    current_object() {
      var cur_obj = this.generator_object;
      for (let key of this.keys) {
        cur_obj = cur_obj[key];
      }
      return cur_obj;
    },
    get_component() {
      return this.current_object.element ? this.current_object.element.component : null;
    }
  }
}
</script>
