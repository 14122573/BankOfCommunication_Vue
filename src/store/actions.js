export default {
  getTitleList({ commit }) {
    this.$ajax
      .get({
        url: this.$api.GET_PUB_TITLE_MANAGE
      })
      .then(res => {
        if (res.code == '200') {
          commit('SET_HOMESECTION_TITLE', res.data.content)
        }
      })
  }
}