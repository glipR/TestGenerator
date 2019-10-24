<template>
<v-card width="100%">
    <v-card-title primary-title>
        Customise Float
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
                <v-text-field dense label="Precision" v-model="precision" type="number"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</v-card>
</template>

<script>
export default {
    data: () => ({
        lowerBound: 0,
        upperBound: 100,
        precision: 3,
    })
}
</script>
