<script>
	import { mapMutations } from 'vuex'
	export default {
		onLaunch: async function() {
			try {
				const { data } = await wx.getStorage({
					key: "user"
				})
				this.setUserStatus(data)
			} catch(err) {
				console.log(err);
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations([
				"setUserStatus"
			])
		}
	}
</script>

<style>
	/* color-ui */
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
