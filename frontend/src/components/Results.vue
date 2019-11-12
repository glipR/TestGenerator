<template>
<v-card width="100%">
    <v-card-title primary-title>
        Results
    </v-card-title>
    <v-container>
        <pre v-if="content.result"><code>{{content.result}}</code></pre>
        <div>{{ content }}</div>
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
