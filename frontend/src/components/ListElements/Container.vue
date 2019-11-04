<template>
    <v-list dense>
        <v-list-item
            v-for="option in availableOptions"
            :key="option.name"
            @click="setSelected(option)"
        >
            <v-list-item-content>
                {{ option.name }}
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
import Integer from '../Options/Integer';
import Float from '../Options/Float';
import String from '../Options/String';
import Graph from '../Options/Graph';

export default {
    props: {
        current_generator: Object,
        global_generator: Object,
    },
    data: () => ({
        options: [
            { name: "Collection" },
            { name: "Integer", component: Integer },
            { name: "Float", component: Float },
            { name: "String", component: String },
            { name: "Graph", component: Graph }
        ]
    }),
    methods: {
        setSelected(option) {
            for (let key of Object.keys(option))
                this.$set(this.current_generator, key, option[key]);
        }
    },
    computed: {
        availableOptions() {
            var result = [];
            for (let o of this.options) {
                if (!this.current_generator.options || this.current_generator.options.includes(o.name))
                    result.push(o);
            }
            return result;
        }
    }
}
</script>
