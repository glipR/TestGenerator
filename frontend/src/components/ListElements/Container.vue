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
            { name: "String" },
            { name: "Graph" }
        ]
    }),
    methods: {
        setSelected(option) {
            this.$set(this.current_generator, 'element', option);
        }
    }
}
</script>
