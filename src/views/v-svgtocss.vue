<template>
  <div class="v-svgtocss">
    <h1>SVG to CSS</h1>
    <p>
      Minimizes a SVG using
      <a href="https://github.com/svg/svgo" target="_blank">SVGO</a> and
      converts it to a url encoded CSS string.
    </p>
    <CSvgtocss />
  </div>
</template>

<script>
import CSvgtocss from "@/components/c-svgtocss/c-svgtocss.vue";

export default {
  name: "v-svgtocss",
  components: {
    CSvgtocss: CSvgtocss,
  },
};
</script>
