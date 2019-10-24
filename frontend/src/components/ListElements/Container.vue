<template>
    <v-list dense>
        <v-list-item
            v-for="option in options"
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
            { name: "Graph" }
        ]
    }),
    methods: {
        setSelected(option) {
            for (let key of Object.keys(option))
                this.$set(this.current_generator, key, option[key]);
        }
    }
}
</script>
