<template>
<v-card width="100%">
    <v-card-title primary-title>
        Results
    </v-card-title>
    <v-container>
        {{ content }}
    </v-container>
</v-card>
</template>

<script>
export default {
    props: {
        content: Object
    },
}
</script>
