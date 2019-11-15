<template>
<v-card width="100%">
    <v-card-title primary-title>
        Customise Graph
    </v-card-title>
    <v-container>
        <v-row>
            <v-col md6 xs12>
                <v-row>
                    <v-col md12 xs12><v-row>
                        <v-col>
                            <v-text-field dense label="Vertices" v-model="graphVertices"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="variableVertices()" color="primary">Variable Vertices</v-btn>
                        </v-col>
                    </v-row></v-col>
                </v-row>
                <v-row>
                    <v-col md12 xs12><v-row>
                        <v-col>
                            <v-text-field dense label="Edges" v-model="graphEdges"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="variableEdges()" color="primary">Variable Edges</v-btn>
                        </v-col>
                    </v-row></v-col>
                </v-row>
                <v-textarea label="Output Format" v-model="formatString"></v-textarea>
                <v-row>
                    <v-col><v-text-field filled label="Vertex Format" v-model="vertexFormat"></v-text-field></v-col>
                    <v-col><v-select
                        :items="separatorOptions"
                        v-model="vertexSeparator"
                        label="Vertex Separator"
                    ></v-select></v-col>
                </v-row>
                <v-row>
                    <v-col><v-text-field filled label="Edge Format" v-model="edgeFormat"></v-text-field></v-col>
                    <v-col><v-select
                        :items="separatorOptions"
                        v-model="edgeSeparator"
                        label="Edge Separator"
                    ></v-select></v-col>
                </v-row>
            </v-col>
            <v-col md6 xs12>
                <v-checkbox label="Tree" v-model="isTree"></v-checkbox>
                <v-row>
                    <v-col>
                        <v-text-field dense label="Components" v-model="graphComponents"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn @click="variableComponents()" color="primary">Variable Components</v-btn>
                    </v-col>
                </v-row>
                <v-expansion-panels accordion multiple>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <v-checkbox label="Weighted Vertices" v-model="isVertexWeighted"></v-checkbox>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Controls
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <v-checkbox label="Weighted Edges" v-model="isEdgeWeighted"></v-checkbox>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Controls
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
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
        graphComponents: 4,
        isVertexWeighted: false,
        isEdgeWeighted: false,
        formatString: "NV NE\nV\nE",
        vertexFormat: "v",
        vertexSeparator: "Space",
        edgeFormat: "v1 v2 w",
        edgeSeparator: "Newline",
        separatorOptions: [
            'Tab',
            'Space',
            'Newline'
        ]
    }),
    created() {
        for (let key of [
            'graphVertices',
            'graphEdges',
            'isTree',
            'graphComponents',
            'isVertexWeighted',
            'isEdgeWeighted',
            'formatString',
            'vertexFormat',
            'vertexSeparator',
            'edgeFormat',
            'edgeSeparator'
        ]) {
            if (this.cur_obj[key] == undefined)
                this.$set(this.cur_obj, key, this[key]);
            else
                this[key] = this.cur_obj[key];
        }
    },
    methods: {
        variableVertices() {
            this.$set(this.cur_obj, 'graphVertices', { element: { name: "Integer", component: Integer, options: ["Integer"] } });
            this.keys.push('graphVertices');
        },
        variableEdges() {
            this.$set(this.cur_obj, 'graphEdges', { element: { name: "Integer", component: Integer, options: ["Integer"] } });
            this.keys.push('graphEdges');
        },
        variableComponents() {
            this.$set(this.cur_obj, 'graphComponents', { element: { name: "Integer", component: Integer, options: ["Integer"] } });
            this.keys.push('graphComponents');
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
            if (this.isTree) {
                this.graphComponents = 1;
                this.graphEdges = "NV - 1";
            }
        },
        graphComponents() {
            this.$set(this.cur_obj, 'graphComponents', this.graphComponents);
        },
        isVertexWeighted() {
            this.$set(this.cur_obj, 'isVertexWeighted', this.isVertexWeighted);
        },
        isEdgeWeighted() {
            this.$set(this.cur_obj, 'isEdgeWeighted', this.isEdgeWeighted);
        },
        formatString() {
            this.$set(this.cur_obj, 'formatString', this.formatString);
        },
        vertexFormat() {
            this.$set(this.cur_obj, 'vertexFormat', this.vertexFormat);
        },
        vertexSeparator() {
            this.$set(this.cur_obj, 'vertexSeparator', this.vertexSeparator);
        },
        edgeFormat() {
            this.$set(this.cur_obj, 'edgeFormat', this.edgeFormat);
        },
        edgeSeparator() {
            this.$set(this.cur_obj, 'edgeSeparator', this.edgeSeparator);
        }
    }
}
</script>
