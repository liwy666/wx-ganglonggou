<template>
	<div id="app">
		<keep-alive>
			<router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view class="router-view" v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
    export default {
        created() {
			this.loginCount();
        },
        methods: {
            loginCount() {
                let user_token = this.$store.getters.getUserToken;
                if (user_token) {
                    this.$post('user_login_count',{user_token:this.$store.getters.getUserToken});
                }
            }
        },
    };
</script>
<style lang="scss">
	* {
		padding: 0;
		margin: 0;
		border: 0;
	}

	html {
	}

	body {
		background-color: rgb(248, 248, 248);
	}

	.name2-enter {
		//opacity: 0;
		transform: translateX(100%);
	}

	.name2-leave-to {
		//opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}

	.name1-enter-active,
	.name1-leave-active {
		transition: all 0.3s ease;
	}

</style>
