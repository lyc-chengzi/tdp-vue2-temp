<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <router-link to="/">Home</router-link>
                <!--inject_template_navbar-->
            </div>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>
<style lang="less" scoped>
.align-center {
    a {
        margin-right: 20px;
        color: #fff;
    }
}
</style>

<script>
export default {
    name: 'App',

    data: () => ({
        //
    }),
};
</script>
