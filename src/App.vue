<template>
    <v-app class="v-app">
        <div class="viewBcontainer editContainer preview">
            <router-view />
        </div>
    </v-app>
</template>
<script>
export default {
    data() {},
    created() {},
    mounted() {},
};
</script>
<style scoped lang="less">
.editContainer {
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
    flex-direction: column;
    margin: 0 auto;
    .header {
        width: 100%;
        display: grid;
        border: 1px solid #ccc;
        margin: 0 auto;
        background: #fafafa;
    }
    .content {
        width: 100%;
        display: flex;
        border: 1px solid #ccc;
        margin: 0 auto;
        background: #fafafa;
        .aside {
            height: 100%;
            display: grid;
            box-sizing: border-box;
        }
        .main {
            flex: 1;
            height: 100%;
            overflow-x: hidden;
            // padding: 0 10px;
            position: relative;
            z-index: 1;
        }
    }
}
</style>
<style lang="less">
.v-app.v-application {
    height: 100%;
}
.mainPreview {
    .rowCont {
        margin: 2px 0;
    }
    .drag-move-box {
        margin-top: 5px;
    }
}
.previewicon {
    padding: 0 5px 0 1px;
}
</style>
