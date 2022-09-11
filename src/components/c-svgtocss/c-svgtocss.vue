<template>
  <div class="c-svgtocss">
    <div
      class="c-svgtocss__inputarea"
      :class="{ 'c-svgtocss__inputarea--highlighted': isHighlighted }"
    >
      <div
        class="inputarea"
        @drop="handleDrop"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @dragover="handleDragOver"
      ></div>
      <span>Drag and Drop</span>
      <span class="divider">
        <span>or</span>
      </span>
      <button class="btn btn-primary" @click="paste">
        Paste from Clipboard
      </button>
    </div>
    <div class="c-svgtocss__code" v-if="demoStyle">
      <vue-code-highlight language="css">
        <pre>
.element { 
  {{ demoStyle }}
}</pre
        >
      </vue-code-highlight>
    </div>
    <p class="c-svgtocss__error" v-if="errorMessage">
      {{ errorMessage }}
    </p>
    <div class="c-svgtocss__demo" :style="demoStyle" v-if="svgInput"></div>
  </div>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";
import optimize from "svgo-browser/lib/optimize";

const DATA = () => {
  return {
    svgInput: "",
    errorMessage: null,
    isHighlighted: false,
  };
};

export default {
  name: "c-svgtocss",

  components: {
    VueCodeHighlight,
  },

  data() {
    return DATA();
  },

  computed: {
    demoStyle() {
      return this.svgInput
        ? `background-image: url("data:image/svg+xml,${this.encodeSVG(
            this.svgInput
          )}");`
        : null;
    },
  },

  methods: {
    reset() {
      Object.assign(this.$data, DATA());
    },

    paste() {
      this.reset();

      navigator.clipboard.readText().then((data) => {
        if (!this.isValidSVG(data)) {
          this.errorMessage = "No valid svg found";
          this.svgInput = "";
          return;
        }

        this.svgInput = data;
      });
    },

    encodeSVG(data) {
      return encodeURIComponent(data)
        .replace(/%20/g, " ")
        .replace(/%3D/g, "=")
        .replace(/%3A/g, ":")
        .replace(/%2F/g, "/")
        .replace(/%22/g, "'");
    },

    isValidSVG(string) {
      return string.startsWith("<svg");
    },

    handleDrop(event) {
      event.preventDefault();
      event.stopPropagation();

      if (event.dataTransfer.files.length > 1) {
        this.errorMessage = "Only 1 file allowed.";
        return;
      }

      this.reset();
      const file = event.dataTransfer.files[0];
      const type = file.type;
      const reader = new FileReader();

      if (type !== "image/svg+xml") {
        this.errorMessage = "This seems to be not a valid svg file.";
        return;
      }

      reader.readAsText(file);
      reader.addEventListener(
        "load",
        () => {
          optimize(reader.result).then((data) => {
            this.svgInput = data;
          });
        },
        false
      );
    },

    handleDragEnter(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isHighlighted = true;
    },

    handleDragLeave() {
      this.isHighlighted = false;
    },

    handleDragOver(event) {
      event.preventDefault();
      event.stopPropagation();
    },
  },
};
</script>

<style lang="scss">
@use "sass-bem/bem";
@use "@scss/_imports";

@include bem.component("svgtocss") {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  pre {
    user-select: text;
  }

  @include bem.element("inputarea") {
    position: relative;
    background-color: imports.$cb-dark-1;
    border: 1px dashed imports.$cb-dark-4;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    text-align: center;

    .inputarea {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    @include bem.modifier("highlighted") {
      border-color: imports.$cb-highlight-1;
    }

    .divider {
      display: block;
      width: 100%;
      color: imports.$cb-dark-4;
    }

    .btn {
      position: relative;
      z-index: 2;
    }
  }

  @include bem.element("code") {
    border: 1px solid imports.$cb-dark-4;
    border-radius: 8px;
    color: imports.$cb-dark-4;
    padding: 16px;
    max-width: 100%;
    text-align: left;

    pre.language-css {
      margin-bottom: 0;
    }

    .property {
      color: imports.$cb-highlight-1;
    }

    .url {
      color: imports.$cb-highlight-1;
    }
  }

  @include bem.element("demo") {
    width: 100%;
    height: 100px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}
</style>
