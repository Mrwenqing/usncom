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
      :data="GoodsList"
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
import GoodsApi from "../../api/goods";
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
        code: "",
        spec: "",
        retailPrice: "",
        purchasePrice: "",
        storageNum: "",
        supplierName: "",
      },
      dialogConfig: {
        title: "商品新增",
        width: "500px",
        formWidth: "400",
      },
      dialogRules: {
        name: [
          {
            required: true,
            message: "商品不能为空",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "商品编码不能为空",
            trigger: "blur",
          },
        ],
        retailPrice: [
          {
            required: true,
            message: "零售价不能为空",
            trigger: "blur",
          },
        ],
      },
      dialogFormItem: [
        {
          label: "商品名称",
          type: "input",
          prop: "name",
        },
        {
          label: "商品编码",
          type: "input",
          prop: "code",
        },
        {
          label: "商品规格",
          type: "input",
          prop: "spec",
        },
        {
          label: "零售价",
          type: "input",
          prop: "retailPrice",
        },
        {
          label: "进货价",
          type: "input",
          prop: "purchasePrice",
        },
        {
          label: "库存数量",
          type: "input",
          prop: "storageNum",
        },
        {
          label: "供应商",
          type: "input",
          prop: "supplierName",
        },
      ],
      queryFormParams: {
        name: "",
        code: "",
        supplierName: "",
      },
      rules: {},
      formItem: [
        {
          type: "input",
          placeholder: "商品名称",
          prop: "name",
        },
        {
          type: "input",
          placeholder: "商品编号",
          prop: "coed",
        },
        {
          type: "input",
          placeholder: "供应商",
          prop: "supplierName",
        },
        {
          type: "slot",
          slot_name: "query",
        },
      ],
      total: 0,
      GoodsList: [],
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
          label: "商品名称",
          prop: "name",
        },
        {
          label: "商品编码",
          prop: "code",
        },
        {
          label: "商品规格",
          prop: "spec",
        },
        {
          label: "零售价",
          prop: "retailPrice",
        },
        {
          label: "进货价",
          prop: "purchasePrice",
        },
        {
          label: "库存数量",
          prop: "storageNum",
        },
        {
          label: "供应商",
          prop: "supplierName",
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
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      try {
        const { rows, count } = await GoodsApi.getGoodsList(
          this.page,
          this.size,
          this.queryFormParams
        );
        this.total = count;
        this.GoodsList = rows;
      } catch (e) {
        //TODO handle the exception
        console.log(e.message);
      }
    },
    handlePage(page) {
      this.page = page;
      this.getGoodsList();
    },
    handleSize(size) {
      this.size = size;
      this.getGoodsList();
    },
    handleQueryForm() {
      this.page = 1;
      this.getGoodsList();
    },
    handleReset() {
      this.$refs["queryForm"].handleResetForm();
    },
    handleOpenDialog(id) {
      this.dialogVisible = true;

      if (typeof id === "number") {
        this.handleFind(id);
        this.dialogConfig.title = "商品编辑";
        return;
      }

      this.dialogConfig.title = "商品新增";
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
        const resposne = await GoodsApi.addGoods(this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("新增成功");
        this.getGoodsList();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleEdit() {
      try {
        const response = await GoodsApi.editGoods(
          this.dialogForm.id,
          this.dialogForm
        );
        this.dialogVisible = false;
        this.$message.success("编辑成功");
        this.getGoodsList();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleFind(id) {
      try {
        const Goods = await GoodsApi.findGoods(id);
        this.dialogForm = Goods;
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
           	this.page = 1
						this.handleReset()
            const response = await GoodsApi.deleteGoodsList(id);
            this.$message.success("删除成功");
            this.getGoodsList();
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
