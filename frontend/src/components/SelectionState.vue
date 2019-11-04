<template>
    <v-list dense>
        <v-list-item
            v-for="(obj, index) in getObjectsWithIndentation"
            :key="index"
            @click="setCurrent(obj)"
            :class="{ 'selected': selected(obj) }"
        >
            <v-list-item-content>
                {{ obj[0].name }}, {{ obj[1] }}, {{ obj[2] }}
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>
<script>
import { serverBus } from '../main';

export default {
    props: {
        total_generator: Object,
        current_generator: Object,
        selected_keys: Array
    },
    methods: {
        indentationsFromObject(object) {
            let results = [[object, 0, []]];
            for (let key of Object.keys(object)) {
                /*eslint no-console: "off"*/
                if (object[key].element) {
                    for (let col of this.indentationsFromObject(object[key].element)) {
                        col[2].push(key);
                        results.push([col[0], col[1]+1, col[2]]);
                    }
                }
            }
            return results;
        },
        setCurrent(object) {
            serverBus.$emit('setKeys', object[2]);
            serverBus.$emit('editEnable');
        },
        selected(object) {
            if (object[2].length != this.selected_keys.length) return false;
            for (let i=0; i<object[2].length; i++) if (object[2][i] != this.selected_keys[i]) return false;
            return true;
        }
    },
    computed: {
        getObjectsWithIndentation() {
            return this.indentationsFromObject(this.total_generator.element);
        }
    }
}
</script>
<style scoped>
.selected {
    background: #00ff0030;
    border-bottom: 3px green solid;
    border-radius: 10px;
}
</style>
