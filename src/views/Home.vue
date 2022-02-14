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
import HelloWorld from '../components/HelloWorld';

export default {
    name: 'Home',

    components: {
        HelloWorld,
    },
};
</script>
