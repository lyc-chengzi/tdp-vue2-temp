<template>
    <v-app class="v-app">
        <div class="viewBcontainer editContainer preview">
            <router-view />
        </div>
    </v-app>
</template>
<script>
export default {
    created() {},
    mounted() {},
};
</script>
<style scoped lang="less">
html,
body {
    margin: 0;
    padding: 0;
    overflow: hidden !important;
}
.editContainer {
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
    flex-direction: column;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
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
