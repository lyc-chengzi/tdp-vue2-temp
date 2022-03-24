<template>
    <div>
        <hello-world />
        <div style="margin: 20px">
            <SchemaFormInput />
            <SchemaFormButton />
        </div>
    </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';

export default {
    name: 'Home',
    data: () => {},
    components: {
        HelloWorld,
    },
};
</script>
