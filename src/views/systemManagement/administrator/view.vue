<template>
    <a-card :bordered="false">
        <a-row type="flex" slot="title" justify="space-between" align="middle">
            <a-col>
                查看
            </a-col>
            <a-col >
                <a-button type="primary" @click="$router.back();" ghost>返回</a-button>
                <a-button type="primary">权限分配</a-button>
            </a-col>
        </a-row>
        <a-row type="flex" justify="start" >
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="10" class="colLabel">
                        姓名：
                    </a-col>
                    <a-col span="14">
                        1111111
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="10" class="colLabel">
                        账号：
                    </a-col>
                    <a-col span="14">
                        1111111
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="10" class="colLabel">
                        邮箱：
                    </a-col>
                    <a-col span="14">
                        1111111
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="10" class="colLabel">
                        邮编：
                    </a-col>
                    <a-col span="14">
                        1111111
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="10" class="colLabel">
                        注册时间：
                    </a-col>
                    <a-col span="14">
                        1111111
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="10" class="colLabel">
                        单位：
                    </a-col>
                    <a-col span="14">
                        1111111
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="8">
                <a-row type="flex" justify="start" class="colMargin">
                    <a-col span="10" class="colLabel">
                        地址：
                    </a-col>
                    <a-col span="14">
                        1111111
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-card>
</template>
<script>
export default {
  name: 'pendingPermissions-view'
}
</script>
<style scoped>
    .colMargin {
        margin-bottom: 20px;
    }

    .colLabel {
        text-align: right;
    }
</style>

