<template>
<v-card width="100%">
    <v-card-title primary-title>
        Customise String
    </v-card-title>
    <v-container>
        <v-row>
            <v-col md6 xs12>
                <v-row>
                    <v-col xs6>
                        <v-row>
                            <v-col>
                                <v-text-field dense label="Size" v-model="stringSize" type="number"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-btn @click="VariableSize()" color="primary">Variable size</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col xs6>
                        <v-select
                            :items="charSetOptions"
                            v-model="charSet"
                            label="Character set"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>
            <v-col md6 xs12>
                <v-select
                    :items="constraintOptions"
                    v-model="constraint"
                    label="Constraints"
                    multiple
                ></v-select>
            </v-col>
        </v-row>
    </v-container>
</v-card>
</template>

<script>
import Integer from './Integer';

export default {
    props: {
        cur_obj: Object,
        keys: Array
    },
    data: () => ({
        charSet: 'Lowercase Letters',
        charSetOptions: [
            'ASCII',
            'Unicode',
            'Letters',
            'Uppercase Letters',
            'Lowercase Letters'
        ],
        constraint: [],
        constraintOptions: [
            'Increasing',
            'Decreasing',
            'Unique Chars'
        ],
        stringSize: 8
    }),
    created() {
        if (this.cur_obj.charSet == undefined)
            this.$set(this.cur_obj, 'charSet', this.charSet);
        else
            this.charSet = this.cur_obj.charSet;
        if (this.cur_obj.constraint == undefined)
            this.$set(this.cur_obj, 'constraint', this.constraint);
        else
            this.constraint = this.cur_obj.constraint;
        if (this.cur_obj.stringSize == undefined)
            this.$set(this.cur_obj, 'stringSize', this.stringSize);
        else
            this.stringSize = this.cur_obj.stringSize;
    },
    methods: {
        VariableSize() {
            this.$set(this.cur_obj, 'stringSize', { element: { name: "Integer", component: Integer, options: ["Integer"] } });
            this.keys.push('stringSize');
        }
    },
    watch: {
        charSet() {
            this.$set(this.cur_obj, 'charSet', this.charSet);
        },
        constraint() {
            this.$set(this.cur_obj, 'constraint', this.constraint);
        },
        stringSize() {
            this.$set(this.cur_obj, 'stringSize', this.stringSize);
        },
    }
}
</script>
