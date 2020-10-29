import {transDate, getDay} from 'utils/'

export default {
    name: 'host',
    data() {
        return {
            //查询条件
            searchParams: {
                name: '',
                clusterId: '',
                envType: '',
                deployType: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                clusterId: '',
                envType: '',
                deployType: '',
                hostId: '',
                hosts: [],
                k8sId: '',
                dockerId: '',
                cossRefBucket: '',
                enable: 1,
                remark: ''
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            hosts: [],
            clusters: [],
            k8ss: [],
            dockers: [],
            cossBuckets: [],
            isEdit: false,

            // 表单规则
            rules: {
                name: [
                    {required: true, message: 'Please Input name', trigger: 'blur' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
                clusterId: [
                    {required: true, message: 'Please Select Cluster', trigger: 'blur' },
                ],
                hostId: [
                    {required: true, message: 'Please Select Host', trigger: 'blur' },
                ],
            },
            loading: false
        }
    },

    activated() {
        this.searchParams.clusterId = this.$route.query.clusterId;
        this.searchParams.envType = this.$route.query.envType;
        this.getData();
    },

    mounted() {
        this.searchParams.clusterId = this.$route.query.clusterId;
        this.searchParams.envType = this.$route.query.envType;
        this.getData();
        this.allHost();
        this.getClusters();
        this.getK8ss();
        this.getDockers();
        this.listBucketsWithProvider();
    },

    methods: {

        onSubmit() {
            this.getData();
        },

        currentChange(i) {
            this.pageNum = i;
            this.getData();
        },

        addData() {
            this.cleanSaveForm();
            this.isEdit = false;
            this.dialogVisible = true;
            this.dialogTitle = 'Add';
            if(this.searchParams.clusterId){
                this.saveForm.clusterId = this.searchParams.clusterId;
            }
            if(this.searchParams.envType){
                this.saveForm.envType = this.searchParams.envType;
            }
            this.onChangeCluster();
        },

        // 获取列表数据
        getData() {
            this.loading = true;
            this.$$api_erm_instanceList({
                data: {
                    name: this.searchParams.name,
                    clusterId: this.searchParams.clusterId,
                    envType: this.searchParams.envType,
                    deployType: this.searchParams.deployType,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    this.loading = false;
                    this.total = data.data.total;
                    this.tableData = data.data.records;
                },
                errFn: () => {
                    this.loading = false;
                }
            })
        },

        cleanSaveForm() {
            this.saveForm = {
                id: '',
                name: '',
                clusterId: '',
                envType: '',
                deployType: '',
                hostId: '',
                hosts: [],
                k8sId: '',
                dockerId: '',
                cossRefBucket: '',
                sshId: '',
                endpoint: '',
                enable: 1,
                remark: ''
            };
        },

        saveData() {
            this.dialogLoading = true;
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.$$api_erm_saveInstance({
                        data: this.saveForm,
                        fn: data => {
                            this.dialogLoading = false;
                            this.dialogVisible = false;
                            this.getData();
                            this.cleanSaveForm();
                        },
                        errFn: () => {
                            this.dialogLoading = false;
                        }
                    });
                }else {
                    this.dialogLoading = false;
                }
            });
        },

        editData(row) {
            if (!row.id) {
                return;
            }
            this.cleanSaveForm();
            this.isEdit = true;
            this.$$api_erm_instanceDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    if(!data.data.hosts){
                        data.data.hosts = [];
                    }
                    this.saveForm = data.data;
                    if(this.saveForm.deployType){
                        this.saveForm.deployType = this.saveForm.deployType.toString();
                    }

                },
            });
            this.dialogVisible = true;
            this.dialogTitle = 'Edit';
        },

        allHost() {
            this.$$api_erm_allHost({
                data: {},
                fn: data => {
                    if(data.data){
                        this.hosts = data.data;
                    }
                },
            });
        },

        onChangeCluster(){
            if(!this.saveForm.clusterId){
                return;
            }
            this.$$api_erm_clusterDetail({
                data: {
                    id: this.saveForm.clusterId,
                },
                fn: data => {
                    if(data.data){
                        this.saveForm.deployType = data.data.deployType;
                    }
                },
            });
        },

        getClusters() {
            this.$$api_erm_clusters({
                data: {},
                fn: data => {
                    if(data.data){
                        this.clusters = data.data.clusters;
                    }
                },
            });
        },

        getK8ss() {
            this.$$api_erm_getK8sForSelect({
                data: {},
                fn: data => {
                    if(data.data){
                        this.k8ss = data.data;
                    }
                },
            });
        },

        getDockers() {
            this.$$api_erm_getDockerForSelect({
                data: {},
                fn: data => {
                    if(data.data){
                        this.dockers = data.data;
                    }
                },
            });
        },




        delData(row) {
            if (!row.id) {
                return;
            }
            this.$confirm('Confirm?', 'warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$$api_erm_delInstance({
                    data: {
                        id: row.id,
                    },
                    fn: data => {
                        this.$message({
                            message: 'Success',
                            type: 'success'
                        });
                        this.getData();
                    },
                })
            }).catch(() => {
                //do nothing
            });
        },

        listBucketsWithProvider(){
            this.$$api_coss_listBucketsWithProvider({
                data: {},
                fn: data => {
                    this.cossBuckets = data.data;
                },
            })
        }



    }
}