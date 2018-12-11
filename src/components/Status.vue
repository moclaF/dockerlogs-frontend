<template>
    <div>
        <div style="float: left">
            <el-select v-model="value4" @change="changecluster">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-table
                :data="tableData"
                border
                style="width: 100%"
                height="ht"
                :default-sort="{prop: 'State', order: 'descending'}">
            <el-table-column
                    prop="Id"
                    label="Id"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="Name"
                    label="Name"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="Created"
                    sortable
                    label="Created">
            </el-table-column>
            <el-table-column
                    prop="State"
                    sortable
                    label="State">
            </el-table-column>
            <el-table-column
                    prop="Status"
                    sortable
                    label="Status">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="showlogs(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="showlog">
            <div  >
                <p style="float: left;margin: 0">logs of {{logname}}</p>
                <el-button type="danger" circle size="mini" icon="el-icon-close" style="float: left" @click="clicklog"></el-button>
            </div>
            <el-input
                    resize="none"
                    type="textarea"
                    rows=10
                    :readonly="ro"
            ></el-input>
        </div>
    </div>
</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";

    export default {
        components: {ElButton},
        data() {
            return {
                tableData: [],
                websock: null,
                options: [{
                    value: 'api',
                    label: 'api集群'
                }, {
                    value: 'india',
                    label: '走出印度'
                }, {
                    value: 'async',
                    label: '异步集群'
                }],
                value4: 'api',
                ht: '600',
                la: 'nonedisplay',
                showlog: false,
                ro: true,
                logname: ''
            }
        },
        created() {
            this.initWebSocket();
            console.log(window.innerHeight);
            this.ht=window.innerHeight-153
        },
        destroyed: function () {
            //页面销毁时关闭长连接
            this.websocketclose();
        },
        methods: {
            showlogs(row) {
                this.ht = 400;
                this.showlog = true;
                this.logname = row.Name

            },
            clicklog(){
                this.showlog = false;
                this.ht = 600;
            },
            changecluster(cluster) {
                this.websocketsend(cluster);
            },
            initWebSocket() {
                const wsAddress = 'ws://localhost:8001/echo';
                this.websock = new WebSocket(wsAddress);

                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;

            },
            websocketonopen() {
                console.log("WebSocket连接成功");
            },
            websocketonerror(e) { //错误
                console.log("WebSocket连接发生错误");
            },
            websocketonmessage(e) { //数据接收
                const redata = JSON.parse(e.data);
                this.tableData = redata;
                // console.log(redata);
            },
            websocketclose(e) { //关闭
                console.log("connection closed (" + e.code + ")");
            },
            websocketsend(agentData) {//数据发送
                this.websock.send(agentData);
            },

        }

    }
</script>
<style lang="css" scoped>
    .withlog {
        height: 50px;
    }

    .logsarea {
        width: 100%;
        height: 250px;
        resize: none;
    }

    .nonedisplay {
        display: none;
    }
</style>
