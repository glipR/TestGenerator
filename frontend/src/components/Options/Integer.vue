<template>
<v-card width="100%">
    <v-card-title primary-title>
        Customise Integer
    </v-card-title>
    <v-container>
        <v-row>
            <v-col md6 xs12>
                <v-row>
                    <v-col>
                        <v-text-field dense v-model="lowerBound" type="number" hide-details single-line solo></v-text-field>
                    </v-col>
                    <v-col>
                        <vue-mathjax formula="$$\leq x \leq$$"></vue-mathjax>
                    </v-col>
                    <v-col>
                        <v-text-field dense v-model="upperBound" type="number" hide-details single-line solo></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col md6 xs12>
                <v-checkbox label="Prime" v-model="isPrime"></v-checkbox>
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
        lowerBound: 0,
        upperBound: 1000,
        isPrime: false
    }),
    created() {
        this.$set(this.cur_obj, 'lowerBound', this.lowerBound);
        this.$set(this.cur_obj, 'upperBound', this.upperBound);
        this.$set(this.cur_obj, 'isPrime', this.isPrime);
    },
    watch: {
        lowerBound() {
            this.$set(this.cur_obj, 'lowerBound', this.lowerBound);
        },
        upperBound() {
            this.$set(this.cur_obj, 'upperBound', this.upperBound);
        },
        isPrime() {
            this.$set(this.cur_obj, 'isPrime', this.isPrime);
        }
    }
}
</script>
