<template>
<v-card width="100%">
    <v-card-title primary-title>
        Customise Integer
    </v-card-title>
    <v-container>
        <v-row>
            <v-col md6 xs12>
                <v-select
                    :items="charSetOptions"
                    :value="charSet"
                    label="Character set"
                ></v-select>
            </v-col>
            <v-col md6 xs12>
                <v-select
                    :items="constraintOptions"
                    :value="constraint"
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
    })
}
</script>
