<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerR"
      app
      clipped
      right
    >
      <h2 style="text-align: center">Current Configuration</h2>
      <SelectionState :total_generator="generator_object" :selected_keys="keys" />
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
      <v-btn color="success" @click="generate">Generate</v-btn>
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
        <div :is="get_component" :cur_obj="current_object" :keys="keys" v-if="!generated"></div>
        <Results
          :content="generatorResult"
          v-else
        />
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
import Container from './ListElements/Container';
import SelectionState from './SelectionState';
import Results from './Results';
import { generate } from '../generate';
import { serverBus } from '../main';

export default {
  props: {
    source: String
  },
  components: {
    Container,
    SelectionState,
    Results
  },
  data: () => ({
    generator_object: { element: {} },
    keys: [],
    drawerL: null,
    drawerR: true,
    generated: false,
    generatorResult: null
  }),
  computed: {
    current_object() {
      var cur_obj = this.generator_object.element;
      for (let key of this.keys) {
        cur_obj = cur_obj[key].element;
      }
      return cur_obj;
    },
    get_component() {
      return this.current_object ? this.current_object.component : null;
    }
  },
  created() {
    serverBus.$on('setKeys', (keys) => {
      this.keys = keys;
    })
  },
  methods: {
    generate() {
      this.generated = true;
      this.generatorResult = generate(this.generator_object);
    }
  }
}
</script>
