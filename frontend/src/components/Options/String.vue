<template>
<v-card width="100%">
    <v-card-title primary-title>
        Customise String
    </v-card-title>
    <v-container>
        <v-row>
            <v-col md6 xs12>
                <v-select
                    :items="charSetOptions"
                    v-model="charSet"
                    label="Character set"
                ></v-select>
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
export default {
    props: {
        cur_obj: Object
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
        ]
    }),
    created() {
        this.$set(this.cur_obj, 'charSet', this.charSet);
        this.$set(this.cur_obj, 'constraint', this.constraint);
    },
    watch: {
        charSet() {
            this.$set(this.cur_obj, 'charSet', this.charSet);
        },
        constraint() {
            this.$set(this.cur_obj, 'constraint', this.constraint);
        }
    }
}
</script>
