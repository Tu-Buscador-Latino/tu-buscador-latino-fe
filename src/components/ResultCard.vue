<template>
    <div class="bg-gray-50	my-3 mx-5 rounded-md hover:bg-gray-200 px-3 py-3">
        <div class="flex flex-row justify-between mb-2">
            <h3 class="text-xl font-bold text-blue-600">{{ result.title }}</h3>
            <p class="text-sm font-semibold">Page Id: {{ result.pageid }}</p>
        </div>
        <div>
            <p>{{ result.snippet }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: "ResultCard",
    props: ["result"],
}
</script>