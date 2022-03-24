<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img :src="require('../assets/fabu.svg')" class="my-3" contain height="200" />
            </v-col>

            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Welcome to TDP</h1>

                <p class="subheading font-weight-regular">
                    For help and collaboration with developers,
                    <br />please join our online
                    <a href="https://tdp-tst.lenovo.com" target="_blank">Discord Community</a>
                    <br />
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'HelloWorld',

    data: () => ({
        ecosystem: [],
        importantLinks: [],
        whatsNext: [],
    }),
};
</script>
