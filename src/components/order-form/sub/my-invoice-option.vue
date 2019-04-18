<template>
	<div class="main">
		<van-cell title="开票方式" :label="invoice_desc" is-link @click="show = true"/>
		<van-popup v-model="show" position="bottom" @open="iniIndex">
			<van-nav-bar
				right-text="收起"
				@click-right="show = false"
				title="开票方式选择"
			/>
			<div class="invoice-body">
				<p class="title">发票类型</p>
				<div class="switch_body">
					<span :class="['row-item',i===idl_switch_index.invoice_type_index ? 'xz':'']"
								v-for="(item,i) in invoice_list"
								:key="i"
								@click="invoiceTypeSwitch(i)">{{item.name}}</span>
				</div>
				<div v-for="(item,i) in invoice_list" :key="i" v-show="idl_switch_index.invoice_type_index === i">
					<p class="title" v-if="item.list.length > 0">发票抬头</p>
					<div class="switch_body">
						<span :class="['row-item',i2===idl_switch_index.invoice_head_index[i] ? 'xz':'']"
									@click="invoiceHeadSwitch(i,i2)"
									v-for="(item2,i2) in item.list"
									:key="i2">{{item2.name}}</span>
					</div>
					<p class="title" v-if="item.list.length > 0">发票信息</p>
					<div class="form-box" v-for="(item2,i2) in item.list" :key="i2" v-show="idl_switch_index.invoice_head_index[i] === i2">
						<van-field v-if="item2.form.indexOf('invoice_phone')!== -1" v-model="invoice_phone" placeholder="请输入手机号" label="手机号"/>
						<van-field v-if="item2.form.indexOf('invoice_qymc')!== -1" v-model="invoice_qymc" placeholder="请输入企业名称" label="企业名称"/>
						<van-field v-if="item2.form.indexOf('invoice_nsrsbh')!== -1" v-model="invoice_nsrsbh" placeholder="请输入纳税人识别号" label="税号"/>
						<van-field v-if="item2.form.indexOf('invoice_kpdz')!== -1" v-model="invoice_kpdz" placeholder="请输入开票地址" label="开票地址"/>
						<van-field v-if="item2.form.indexOf('invoice_zj')!== -1" v-model="invoice_zj" placeholder="请输入如:0510-80336198 座机号" label="座机号"/>
						<van-field v-if="item2.form.indexOf('invoice_khh')!== -1" v-model="invoice_khh" placeholder="请输入开户行名称" label="开户行"/>
						<van-field v-if="item2.form.indexOf('invoice_yhzh')!== -1" v-model="invoice_yhzh" placeholder="请输入银行账号" label="银行账号"/>
					</div>
				</div>
			</div>
			<van-button type="danger" size="large"  @click="preserveInvoice"> 确 认 </van-button>
		</van-popup>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                invoice_desc:"",
                idl_switch_index:{},
                switch_index:{},
                show:false,
                invoice_phone:'',
                invoice_qymc:'',
                invoice_nsrsbh:'',
                invoice_kpdz:'',
                invoice_zj:'',
                invoice_khh:'',
                invoice_yhzh:'',
                invoice_list:[{
                    name:'不开票',
										list:[]
								},{
                    name:'电子发票',
										list:[{
                        name:'个人',
												form:'invoice_phone'
										},{
                        name:'企业',
                        form:'invoice_phone,invoice_qymc,invoice_nsrsbh'
										}]
								},{
                    name:'专票',
                    list:[{
                        name:'企业',
                        form:'invoice_qymc,invoice_nsrsbh,invoice_kpdz,invoice_zj,invoice_khh,invoice_yhzh'
										}]
								}]
						};
        },
        computed:{
            /*idl_switch_index:{
                get:function () {
                    var result = [];
                    result["invoice_type_index"] = 0;
                    result["invoice_head_index"] = [];
                    this.invoice_list.forEach((item,i) => {
                        this.$set(result["invoice_head_index"],i,0);
                    });
                    return result;
                },
                set:function () {

                }
            },
            switch_index:{
                get:function () {
                    var result = [];
                    result["invoice_type_index"] = 0;
                    result["invoice_head_index"] = [];
                    this.invoice_list.forEach((item,i) => {
                        this.$set(result["invoice_head_index"],i,0);
                    });
                    return result;
                },
                set:function (msg) {
                    console.log(msg);
                }
            },*/
        },
        created() {
            this.invoice_desc =this.invoice_list[0].name;
            if(this.invoice_list[0].list.length > 0){
                this.invoice_desc += '-' + this.invoice_list[0].list[0].name;
            }
            this.invoice_desc =this.invoice_list[0].name;
						if(this.invoice_list[0].list.length > 0){
								this.invoice_desc += '-' + this.invoice_list[0].list[0].name;
						}
						this.idl_switch_index.invoice_type_index= 0;
						this.idl_switch_index.invoice_head_index = [];
						this.invoice_list.forEach((item,i) => {
                this.idl_switch_index.invoice_head_index[i] = 0;
						});
            this.switch_index.invoice_type_index= 0;
            this.switch_index.invoice_head_index = [];
            this.invoice_list.forEach((item,i) => {
                this.switch_index.invoice_head_index[i] = 0;
            });
            this.$forceUpdate();
        },
        methods: {
            iniIndex(){
                this.idl_switch_index = JSON.parse(JSON.stringify(this.switch_index));
                this.$forceUpdate();
						},
            preserveInvoice(){
                this.$dialog.confirm({
										title:'开票信息确认',
                    message: '请确认您的开票信息是否完整正确，避免后续发票无效，谢谢!'
								}).then(() => {
                    let data = {};
                    this.switch_index = JSON.parse(JSON.stringify(this.idl_switch_index));
                    this.switch_index = this.idl_switch_index;
                    data.invoice_type = this.invoice_list[this.switch_index.invoice_type_index].name;
                    if(this.invoice_list[this.switch_index.invoice_type_index].list.length > 0){
                        data.invoice_head = this.invoice_list[this.switch_index.invoice_type_index].
                            list[this.switch_index.invoice_head_index[this.switch_index.invoice_type_index]].name;
                    }else {
                        data.invoice_head = "";
                    }

                    data.invoice_phone=this.invoice_phone;
                    data.invoice_qymc=this.invoice_qymc;
                    data.invoice_nsrsbh=this.invoice_nsrsbh;
                    data.invoice_kpdz=this.invoice_kpdz;
                    data.invoice_zj=this.invoice_zj;
                    data.invoice_khh=this.invoice_khh;
                    data.invoice_yhzh=this.invoice_yhzh;
                    if(data.invoice_type !== ''){
                        this.invoice_desc = data.invoice_type + '-' + data.invoice_head;
                    }else {
                        this.invoice_desc = data.invoice_type;
                    }
                    this.show = false;
                    this.$store.commit("setInvoiceInfo",data);
                    this.$forceUpdate();
                }).catch(() => {
                   return false;
                });

						},
            invoiceTypeSwitch(index){
                this.idl_switch_index.invoice_type_index = index;
                this.$forceUpdate();
            },
            invoiceHeadSwitch(index1,index2){
                this.idl_switch_index.invoice_head_index[index1] = index2;
                this.$forceUpdate();
						}
				},
    };
</script>

<style lang="scss" scoped>
	.main{
		.invoice-body{
			width: 100%;
			height: 450px;
			padding: 10px;
			overflow-y: auto;
			.title{
				font-size: 14px;
				margin-top: 10px;
			}
			.switch_body{
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;
				.row-item{
					height: 28px;
					line-height: 28px;
					font-size: 14px;
					margin-top: 5px;
					border-radius: 50px;
					margin-left: 20px;
					justify-content: flex-start;
					background-color: rgba(0,0,0,.1);
					padding-left: 20px;
					padding-right: 20px;
					box-sizing: border-box;
					border: 1PX solid rgba(0,0,0,0);
					transition: all ease 0.3s;
				}
				.xz{
					border: 1PX solid $main-color0;
					background-color: $main-color1;
					color: $main-color0;
				}
			}
			.form-box{
				height: 200px;
			}

		}
	}
</style>