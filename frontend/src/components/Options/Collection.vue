<template>
<v-card width="100%">
    <v-card-title primary-title>
        Customise Collection
    </v-card-title>
    <v-container>
        <v-row>
            <v-col><v-checkbox label="Customise individual elements" v-model="individualElements"></v-checkbox></v-col>
        </v-row>
        <div v-if="individualElements">
            Customise particulars
            <v-row>
                Hard part.
            </v-row>
        </div>
        <div v-else>
            <v-row>
                <v-col md6 xs12>
                    <v-row>
                        <v-col>
                            <v-text-field dense label="Number of Elements" v-model="numElements"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="numElements()" color="primary">Variable Elements</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col md6 xs12>
                    Element Type
                    <v-radio-group v-model="elementTypeFake" @change="SetElement()">
                        <v-radio
                        v-for="option in options"
                        :key="option.name"
                        :label="option.name"
                        :value="option.name"
                        ></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
        </div>
    </v-container>
</v-card>
</template>

<script>
import Integer from '../Options/Integer';
import Float from '../Options/Float';
import String from '../Options/String';
import Graph from '../Options/Graph';
import Collection from '../Options/Collection';

export default {
    props: {
        cur_obj: Object,
        options: {
            type: Array,
            default: () => [
                { name: "Collection", component: Collection },
                { name: "Integer", component: Integer },
                { name: "Float", component: Float },
                { name: "String", component: String },
                { name: "Graph", component: Graph }
            ]
        },
        keys: Array
    },
    data: () => ({
        individualElements: false,
        numElements: 10,
        elementType: null,
        elementTypeFake: null
    }),
    created() {
        if (this.cur_obj.individualElements == undefined)
            this.$set(this.cur_obj, 'individualElements', this.individualElements);
        else
            this.individualElements = this.cur_obj.individualElements;
        if (this.cur_obj.elementType == undefined)
            this.$set(this.cur_obj, 'elementType', this.elementType);
        else
            this.elementType = this.cur_obj.elementType;
        if (this.cur_obj.elementTypeFake == undefined)
            this.$set(this.cur_obj, 'elementTypeFake', this.elementTypeFake);
        else
            this.elementTypeFake = this.cur_obj.elementTypeFake;
        if (this.cur_obj.numElements == undefined)
            this.$set(this.cur_obj, 'numElements', this.numElements);
        else
            this.numElements = this.cur_obj.numElements;
    },
    watch: {
        individualElements() {
            this.$set(this.cur_obj, 'individualElements', this.individualElements);
        },
        numElements() {
            this.$set(this.cur_obj, 'numElements', this.numElements);
        },
        elementType() {
            this.$set(this.cur_obj, 'elementType', this.elementType);
        },
        elementTypeFake() {
            this.$set(this.cur_obj, 'elementTypeFake', this.elementTypeFake);
        }
    },
    methods: {
        VariableElements() {
            this.$set(this.cur_obj, 'numElements', { element: { name: "Integer", component: Integer, options: ["Integer"] } });
            this.keys.push('numElements');
        },
        SetElement() {
            for (let option of this.options) {
                if (option.name == this.elementTypeFake) {
                    this.$set(this.cur_obj, 'elementTypeFake', option.name);
                    this.$set(this.cur_obj, 'elementType', { element: option });
                    this.keys.push('elementType');
                    break;
                }
            }
        }
    }
}
</script>
