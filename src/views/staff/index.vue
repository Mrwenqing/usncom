<template>
  <div class="mt-2">
    <i-queryForm
      ref="queryForm"
      @search="handleQueryForm"
      :formItem="formItem"
      v-model.sync="queryFormParams"
    >
      <template v-slot:query>
        <el-button type="primary" @click="handleQueryForm">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </i-queryForm>

    <i-table
      @page="handlePage"
      @size="handleSize"
      pager
      :total="total"
      :page="page"
      :size="size"
      :tableStyle="tableStyle"
      :data="StaffList"
      :column="column"
    >
      <template v-slot:opteration="scope">
        <el-button
          type="primary"
          size="mini"
          @click="handleOpenDialog(scope.row.id)"
          >编辑</el-button
        >
        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </i-table>

    <i-dialog
      :dialogRules="dialogRules"
      :dialogConfig="dialogConfig"
      labelWidth="120px"
      :dialogFormItem="dialogFormItem"
      :dialogVisible.sync="dialogVisible"
      v-model.sync="dialogForm"
      @submit="handleSubmit"
    >
    </i-dialog>
  </div>
</template>

<script>
import StaffApi from "../../api/staff";
export default {
  name: "supplier",
  components: {
    "i-table": () => import("../../components/baseTable"),
    "i-queryForm": () => import("../../components/queryForm"),
    "i-dialog": () => import("../../components/Dialog"),
  },
  data() {
    return {
      dialogVisible: false,
      page: 1,
      size: 10,
      dialogForm: {
        name: "",
        username: "",
        age: "",
        mobile: "",
		salary:'',
		entryDate:''
      },
      dialogConfig: {
        title: "员工新增",
        width: "500px",
        formWidth: "400",
      },
      dialogRules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
        ],
      },
      dialogFormItem: [
        {
          label: "账号",
          type: "text",
          prop: "username",
        },
        {
          label: "姓名",
          type: "text",
          prop: "name",
        },
        {
          label: "年龄",
          type: "text",
          prop: "age",
        },
        {
          label: "电话",
          type: "text",
          prop: "mobile",
        },
        {
          label: "薪酬",
          type: "text",
          prop: "salary",
        },
        {
          label: "入职时间",
          type: "date",
          prop: "entryDate",
        },
      ],
      queryFormParams: {
        name: "",
        username: "",
      },
      rules: {},
      formItem: [
		{
			type:'input',
			placeholder:'账号',
			prop:'username'
		},
       {
		type:'input',
		placeholder:'姓名',
		prop:'name'
	   },
        {
          type: "slot",
          slot_name: "query",
        }
      ],
      total: 0,
      StaffList: [],
      tableStyle: {
        height: 380,
      },
      column: [
        {
          type: "index",
          label: "序号",
          sequence: true,
          width: "60",
        },
       {
          label: "账号",
          prop: "username",
        },
        {
         
          label: "姓名",
          prop: "name",
        },
        {
         
          label: "年龄",
          prop: "age",
        },
		{
			
			label:'电话',
			prop:'mobile',
		},
		{
		
			label:'薪酬',
			prop:'salary',
		},
		{
			
			label:'入职时间',
			prop:'entryDate',
		},
        {
          label: "操作",
          slot_name: "opteration",
          type: "slot",
        },
      ],
    };
  },
  created() {
    this.getStaffList();
  },
  methods: {
    async getStaffList() {
      try {
        const { rows, total } = await StaffApi.getStaffList(
          this.page,
          this.size,
          this.queryFormParams
        );
        this.total = total;
        this.StaffList = rows;
      } catch (e) {
        //TODO handle the exception
        console.log(e.message);
      }
    },
    handlePage(page) {
      this.page = page;
      this.getStaffList();
    },
    handleSize(size) {
      this.size = size;
      this.getStaffList();
    },
    handleQueryForm() {
      this.page = 1;
      this.getStaffList();
    },
    handleReset() {
      this.$refs["queryForm"].handleResetForm();
    },
    handleOpenDialog(id) {
      this.dialogVisible = true;

      if (typeof id === "number") {
        this.handleFind(id);
        this.dialogConfig.title = "员工编辑";
        return;
      }

      this.dialogConfig.title = "员工新增";
    },
    handleSubmit() {
      if (this.dialogForm.id) {
        this.handleEdit();
      } else {
        this.handleAdd();
      }
    },
    async handleAdd() {
      try {
        const resposne = await StaffApi.addStaff(this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("新增成功");
        this.getStaffList();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleEdit() {
      try {
        const response = await StaffApi.editStaff(
          this.dialogForm.id,
          this.dialogForm
        );
        this.dialogVisible = false;
        this.$message.success("编辑成功");
        this.getStaffList();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleFind(id) {
      try {
        const Staff = await StaffApi.findStaff(id);
        this.dialogForm = Staff;
      } catch (e) {
        console.log(e.message);
      }
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await StaffApi.deleteStaffList(id);
            this.$message.success("删除成功");
            this.getStaffList();
          } catch (e) {
            console.log(e.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
</style>
