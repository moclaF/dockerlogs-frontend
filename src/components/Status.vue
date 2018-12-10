<template>
    <div><el-select v-model="value4"  placeholder="请选择">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
    <el-table
            :data="tableData"
            border
            style="width: 100%"
            :default-sort = "{prop: 'State', order: 'descending'}">
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
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
    export default {
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
                value4: 'india'
            }
        },
        created() {
            this.initWebSocket()
            // const wsAddress = 'ws://localhost:8001/echo';
            // let ws = new WebSocket(wsAddress)
            // ws.onmessage = function(evt) {
            //     this.tableData = JSON.parse(evt.data)
            //     for(let item in evt.data){
            //         console.log(item);
            //         this.tabelData.push(JSON.parse(item))
            //     }
            // }
        },
        destroyed: function () {
            //页面销毁时关闭长连接
            this.websocketclose();
        },
        methods: {
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
            websocketonmessage(e){ //数据接收
                const redata = JSON.parse(e.data);
                this.tableData = redata;
                console.log(redata);
            },
            websocketclose(e){ //关闭
                console.log("connection closed (" + e.code + ")");
            },
        }

    }
</script>
