<template>
<v-card width="100%">
    <v-card-title primary-title>
        Customise Graph
    </v-card-title>
    <v-container>
        <v-row>
            <v-col md6 xs12>
                <v-row>
                    <v-row>
                        <v-col>
                            <v-text-field dense label="Vertices" v-model="graphVertices" type="number"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="variableVertices()" color="primary">Variable Vertices</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field dense label="Edges" v-model="graphEdges" type="number"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="variableEdges()" color="primary">Variable Edges</v-btn>
                        </v-col>
                    </v-row>
                </v-row>
            </v-col>
            <v-col md6 xs12>
                <v-checkbox label="Tree" v-model="isTree"></v-checkbox>
                <v-checkbox label="Connected" v-model="isConnected"></v-checkbox>
                <v-checkbox label="Weighted Vertices" v-model="isVertexWeighted"></v-checkbox>
                <v-checkbox label="Weighted Edges" v-model="isEdgeWeighted"></v-checkbox>
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
        graphVertices: 5,
        graphEdges: 7,
        isTree: false,
        isConnected: true,
        isVertexWeighted: false,
        isEdgeWeighted: false
    }),
    created() {
        if (this.cur_obj.graphVertices == undefined)
            this.$set(this.cur_obj, 'graphVertices', this.graphVertices);
        else
            this.graphVertices = this.cur_obj.graphVertices;
        if (this.cur_obj.graphEdges == undefined)
            this.$set(this.cur_obj, 'graphEdges', this.graphEdges);
        else
            this.graphEdges = this.cur_obj.graphEdges;
        if (this.cur_obj.isTree == undefined)
            this.$set(this.cur_obj, 'isTree', this.isTree);
        else
            this.isTree = this.cur_obj.isTree;
        if (this.cur_obj.isConnected == undefined)
            this.$set(this.cur_obj, 'isConnected', this.isConnected);
        else
            this.isConnected = this.cur_obj.isConnected;
        if (this.cur_obj.isVertexWeighted == undefined)
            this.$set(this.cur_obj, 'isVertexWeighted', this.isVertexWeighted);
        else
            this.isVertexWeighted = this.cur_obj.isVertexWeighted;
        if (this.cur_obj.isEdgeWeighted == undefined)
            this.$set(this.cur_obj, 'isEdgeWeighted', this.isEdgeWeighted);
        else
            this.isEdgeWeighted = this.cur_obj.isEdgeWeighted;
    },
    methods: {
        variableVertices() {
            this.$set(this.cur_obj, 'graphVertices', { element: { name: "Integer", component: Integer, options: ["Integer"] } });
            this.keys.push('graphVertices');
        },
        variableEdges() {
            this.$set(this.cur_obj, 'graphEdges', { element: { name: "Integer", component: Integer, options: ["Integer"] } });
            this.keys.push('graphEdges');
        }
    },
    watch: {
        graphVertices() {
            this.$set(this.cur_obj, 'graphVertices', this.graphVertices);
        },
        graphEdges() {
            this.$set(this.cur_obj, 'graphEdges', this.graphEdges);
        },
        isTree() {
            this.$set(this.cur_obj, 'isTree', this.isTree);
        },
        isConnected() {
            this.$set(this.cur_obj, 'isConnected', this.isConnected);
        },
        isVertexWeighted() {
            this.$set(this.cur_obj, 'isVertexWeighted', this.isVertexWeighted);
        },
        isEdgeWeighted() {
            this.$set(this.cur_obj, 'isEdgeWeighted', this.isEdgeWeighted);
        }
    }
}
</script>
