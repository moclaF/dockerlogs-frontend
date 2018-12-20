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
                :height="ht"
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
        <div v-if="showlog" style="height: 50%;background-color: #a9a9a9">
            <div>
                <p style="float: left;margin: 0;">logs of {{logname}}</p>
                <el-button type="danger" circle size="mini" icon="el-icon-close" style="float: right;"
                           @click="stoplog"></el-button>
            </div>
            <br>
            <div id="output"
                 style="text-align: left;background-color: black;color: white;width: 99%;height: 200px; overflow-y:auto">
                <div id = "logput"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

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
                value4: 'api',
                logData: '',
                ht: '600',
                la: 'nonedisplay',
                showlog: false,
                ro: true,
                logname: '',
            }
        },
        created() {
            this.initWebSocket();
            console.log(window.innerHeight);
            this.ht = window.innerHeight - 50
        },
        destroyed: function () {
            //页面销毁时关闭长连接
            this.websocketclose();
        },
        methods: {
            showlogs(row) {
                this.removeLogDiv();
                this.ht = 400;
                this.showlog = true;
                this.logname = row.Name;
                this.websocketsend(row.Id)
            },
            stoplog() {
                this.showlog = false;
                this.ht = 600;
                this.endlogpush();
                this.removeLogDiv()
            },
            changecluster(cluster) {
                this.stoplog();
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
                console.log("success");
            },
            websocketonerror(e) { //错误
                console.log("error");
            },
            websocketonmessage(e) { //数据接收
                const redata = JSON.parse(e.data);
                const out = document.getElementById("output");
                if (typeof redata === "object") {
                    this.tableData = redata;
                } else if (typeof redata === "string") {
                    let d = document.createElement("div");
                    d.className = "logtext";
                    d.innerHTML = this.getNowdate() + "   " + redata;
                    out.prepend(d);
                }
                // console.log(redata);


            },
            websocketclose(e) { //关闭
                console.log("connection closed (" + e.code + ")");
            },
            websocketsend(agentData) {//数据发送
                this.websock.send(agentData);
            },
            endlogpush() {
                this.websocketsend("stoplog")
            },
            getNowdate() {
                let date = new Date();
                let seperator1 = "-";
                let seperator2 = ":";
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                let hour = date.getHours(); // 时
                let minutes = date.getMinutes(); // 分
                let seconds = date.getSeconds() //秒
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                let currentdate = year + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + minutes + seperator2 + seconds;
                return currentdate;
            },
            removeLogDiv() {
                let elem = document.getElementById("output");
                console.log(elem);
                while (elem.hasChildNodes())
                {
                    elem.removeChild(elem.firstChild);

                }
            }
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

    .logtext {
        float: left;
        text-align: left;
    }
</style>
